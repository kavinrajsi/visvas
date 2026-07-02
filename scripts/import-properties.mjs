#!/usr/bin/env node

/**
 * Import WordPress property XML export to Payload CMS projects
 * - Parse property post-type items and attachments from XML
 * - Download images from WordPress, upload to R2
 * - Match/create amenities from property_feature categories
 * - Enrich existing projects or create new ones with: geo-coords, floor plans, images, amenities, video URL
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import xml2js from 'xml2js';
import { getPayload } from 'payload';
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import { JSDOM } from 'jsdom';
import config from '../payload.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Hardcoded mapping of WordPress property titles/slugs to Payload project slugs
const TITLE_TO_PROJECT_SLUG = {
  'supraja-ready-for-possession': 'supraja',
  'supraja-villa-1-5-bhk': 'supraja',
  'virat-2bhk-apartments-vilangudi-madurai': 'virat',
  'virat-3bhk-apartments-vilangudi-madurai': 'virat',
  'aprameya-2-bhk-villa-for-sale-in-madurai': 'aprameya',
  'vibhava-h-block-apartments-for-sale-in-ponmeni': 'vibhava',
  'aparna-1-bhk-apartment-thuvarimaan-madurai': 'aparna---1bhk',
  'aparna-2-bhk-apartments-for-sale-in-madurai': 'aparna---2bhk',
  'aparna-studio-apartments-for-sale-in-madurai': null, // Create new project
  'madhyapuri-3-bhk-apartments-for-sale-in-madurai': 'madhyapuri',
  'ajita-premium-3-bhk-villa-for-sale-in-madurai': 'ajita',
  'ajita-premium-4-bhk-villa-for-sale-in-madurai': 'ajita',
  'agrini-enclave-ready-to-move': 'agrini',
  'visvas-vasudhara-ready-to-move-villas-and-flats': 'vasudhara',
  'vajra-ready-to-live-apartments-madurai': 'vajra',
  'vaaruni-enclave': 'vaaruni-enclave',
  'ajita-thuvarimaan': 'ajita-phase-ii',
  'ajita-phase-ii': 'ajita-phase-ii',
  'vidhatri-ponmeni': 'vidhatri',
  'amita': 'amita',
  'ajita-phase-i-extension-b-block': 'ajita-phase-i-extension---b-block',
};

/**
 * Extract text from PHP serialized string: s:N:"key";s:N:"value";
 */
function extractSerializedText(serialized, key) {
  const pattern = new RegExp(`s:\\d+:"${key}";s:(\\d+):"([^"]*)"`);
  const match = serialized.match(pattern);
  return match ? match[2] : null;
}

/**
 * Parse PHP serialized floor_plans into array
 */
function parseFloorPlans(serialized) {
  if (!serialized) return [];

  const plans = [];
  // Match each array element: a:6:{...} where 6 is field count
  const itemPattern = /i:\d+;a:\d+:\{([^}]*)\}/g;
  let itemMatch;

  while ((itemMatch = itemPattern.exec(serialized)) !== null) {
    const fields = itemMatch[1];

    const title = extractSerializedText(fields, 'fave_plan_title');
    const rooms = extractSerializedText(fields, 'fave_plan_rooms');
    const bathrooms = extractSerializedText(fields, 'fave_plan_bathrooms');
    const size = extractSerializedText(fields, 'fave_plan_size');
    const description = extractSerializedText(fields, 'fave_plan_description');
    const imageUrl = extractSerializedText(fields, 'fave_plan_image');

    if (title && imageUrl) {
      plans.push({
        title,
        rooms: rooms ? parseInt(rooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        size,
        description,
        imageUrl,
      });
    }
  }

  return plans;
}

/**
 * Get meta value from parsed postmeta array
 */
function getMeta(postmeta, key) {
  if (!postmeta || !Array.isArray(postmeta)) return null;

  for (const meta of postmeta) {
    const metaKey = meta['wp:meta_key']?.[0];
    const metaValue = meta['wp:meta_value']?.[0];

    if (metaKey === key) {
      return metaValue;
    }
  }

  return null;
}

/**
 * Get categories from parsed category array
 */
function getCategories(categories) {
  const result = {};

  if (!categories || !Array.isArray(categories)) return result;

  for (const cat of categories) {
    const domain = cat.$.domain;
    const label = cat._;

    if (domain && label) {
      if (!result[domain]) result[domain] = [];
      result[domain].push(label);
    }
  }

  return result;
}

/**
 * Parse price: strip commas and currency
 */
function parsePrice(priceStr) {
  if (!priceStr) return null;
  const cleaned = priceStr.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned) : null;
}

/**
 * Download image from URL and return Buffer
 */
async function downloadImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.arrayBuffer();
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
    return null;
  }
}

/**
 * Get MIME type from URL
 */
function getMimeType(url) {
  if (url.includes('.png')) return 'image/png';
  if (url.includes('.jpg') || url.includes('.jpeg')) return 'image/jpeg';
  if (url.includes('.gif')) return 'image/gif';
  if (url.includes('.webp')) return 'image/webp';
  return 'image/jpeg';
}

/**
 * Extract filename from URL
 */
function getFilename(url) {
  return url.split('/').pop().split('?')[0];
}

/**
 * Upload image to Payload media
 */
async function uploadImage(payload, url, alt = '') {
  try {
    const buffer = await downloadImage(url);
    if (!buffer) return null;

    const filename = getFilename(url);
    const mimetype = getMimeType(url);

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: Buffer.from(buffer),
        mimetype,
        name: filename,
        size: buffer.byteLength,
      },
    });

    return media.id;
  } catch (err) {
    console.error(`Upload failed for ${url}:`, err.message.split('\n')[0]);
    return null;
  }
}

/**
 * Find or create amenity
 */
async function getOrCreateAmenity(payload, label, existingAmenities) {
  // Normalize: lowercase, trim whitespace, remove special chars
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, ' ');

  const normalizedLabel = normalize(label);

  // Check existing amenities
  for (const amenity of existingAmenities) {
    if (normalize(amenity.name) === normalizedLabel) {
      return amenity.id;
    }
  }

  // Create new amenity
  try {
    const created = await payload.create({
      collection: 'amenities',
      data: { name: label },
    });
    console.log(`    → Created amenity: ${label}`);
    return created.id;
  } catch (err) {
    console.error(`Failed to create amenity "${label}":`, err.message.split('\n')[0]);
    return null;
  }
}

/**
 * Main import function
 */
async function importProperties() {
  const xmlPath = path.join(__dirname, '../wp/propery.xml');

  if (!fs.existsSync(xmlPath)) {
    console.error(`✗ Property XML file not found at ${xmlPath}`);
    process.exit(1);
  }

  console.log('📦 Importing property data from WordPress XML...\n');

  try {
    const payload = await getPayload({ config });

    // Get editor config for HTML → Lexical conversion
    console.log('Preparing editor config...');
    const editorConfig = await editorConfigFactory.default({
      config: payload.config,
      isRoot: false,
      parentIsLocalized: false,
    });

    // Load existing projects and amenities
    console.log('Loading existing projects and amenities...');
    const { docs: projects } = await payload.find({
      collection: 'projects',
      limit: 9999,
    });
    const projectMap = new Map(projects.map((p) => [p.slug, p]));

    const { docs: amenities } = await payload.find({
      collection: 'amenities',
      limit: 9999,
    });
    console.log(`Found ${projects.length} projects, ${amenities.length} amenities\n`);

    // Parse XML
    console.log('Parsing WordPress XML export...');
    const parser = new xml2js.Parser();
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
    const parsed = await parser.parseStringPromise(xmlContent);

    const items = parsed.rss.channel[0].item || [];

    // Separate properties and attachments
    let properties = items.filter((it) => it['wp:post_type']?.[0] === 'property');
    const attachments = items.filter((it) => it['wp:post_type']?.[0] === 'attachment');

    // Build attachment map: id → guid URL
    const attachmentMap = new Map();
    for (const att of attachments) {
      const id = att['wp:post_id']?.[0];
      const guid = att.guid?.[0];
      if (id && guid) attachmentMap.set(id, guid);
    }

    console.log(`Found ${properties.length} properties, ${attachments.length} attachments\n`);

    // Process each property
    let updatedCount = 0;
    let createdCount = 0;
    let failedCount = 0;

    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      const slug = prop['wp:post_name']?.[0];
      const title = prop.title?.[0];
      const targetSlug = TITLE_TO_PROJECT_SLUG[slug];

      console.log(`[${i + 1}/${properties.length}] ${title}`);

      if (targetSlug === undefined) {
        console.log(`  ⚠ Mapping not found for ${slug}`);
        failedCount++;
        continue;
      }

      try {
        // Extract property data
        const postmeta = prop['wp:postmeta'];
        const price = parsePrice(getMeta(postmeta, 'fave_property_price'));
        const bedrooms = getMeta(postmeta, 'fave_property_bedrooms');
        const bathrooms = getMeta(postmeta, 'fave_property_bathrooms');
        const size = getMeta(postmeta, 'fave_property_size');
        const sizePrefix = getMeta(postmeta, 'fave_property_size_prefix') || 'Sq Ft';
        const address = getMeta(postmeta, 'fave_property_address');
        const mapAddress = getMeta(postmeta, 'fave_property_map_address');
        const latitude = parseFloat(getMeta(postmeta, 'houzez_geolocation_lat')) || null;
        const longitude = parseFloat(getMeta(postmeta, 'houzez_geolocation_long')) || null;
        const thumbnailId = getMeta(postmeta, '_thumbnail_id');
        const videoUrl = getMeta(postmeta, 'fave_video_url');
        const floorPlansStr = getMeta(postmeta, 'floor_plans');
        const description = prop['content:encoded']?.[0];
        const categories = getCategories(prop.category);

        // Parse floor plans
        const floorPlans = parseFloorPlans(floorPlansStr);

        // Map status
        const statusMap = {
          'Completed': 'completed',
          'Ongoing Project': 'under_construction',
          'For Sale': 'ready_to_move',
        };
        const status = statusMap[categories['property_status']?.[0]] || 'ready_to_move';

        // Map project type
        const typeMap = {
          'Apartment': 'apartment',
          'Villa': 'villa',
          'Studio': 'studio',
          'Land': 'plotted',
        };
        const projectType = typeMap[categories['property_type']?.find((t) => t !== 'Residential')] ||
          'apartment';

        // Extract BHK types
        const bhkTypes = new Set();
        if (bedrooms) {
          const bdCount = parseInt(bedrooms);
          if (bdCount === 0) bhkTypes.add('studio');
          else if (bdCount <= 5) bhkTypes.add(`${bdCount}bhk`);
        }
        if (projectType === 'villa') bhkTypes.add('villa');

        // Match/create amenities
        const amenityIds = [];
        if (categories['property_feature']) {
          for (const feature of categories['property_feature']) {
            const amenityId = await getOrCreateAmenity(payload, feature, amenities);
            if (amenityId) amenityIds.push(amenityId);
          }
        }

        // Upload cover/gallery images
        let coverImageId = null;
        const imageIds = [];

        if (thumbnailId && attachmentMap.has(thumbnailId)) {
          const url = attachmentMap.get(thumbnailId);
          coverImageId = await uploadImage(payload, url, `${title} - Thumbnail`);
          if (coverImageId) imageIds.push(coverImageId);
        }

        // Upload floor plan images
        for (const plan of floorPlans) {
          if (plan.imageUrl) {
            const planImageId = await uploadImage(payload, plan.imageUrl, `${title} - ${plan.title}`);
            if (planImageId) {
              plan.planMediaId = planImageId;
              imageIds.push(planImageId);
            }
          }
        }

        if (targetSlug) {
          // Update existing project
          const project = projectMap.get(targetSlug);
          if (!project) {
            console.log(`  ⚠ Target project slug not found: ${targetSlug}`);
            failedCount++;
            continue;
          }

          const updateData = {
            priceRangeStartFrom: price,
            status,
            projectType,
            bhkTypes: Array.from(bhkTypes),
            locationAddress: address || mapAddress,
            latitude,
            longitude,
          };

          if (videoUrl) updateData.videoUrl = videoUrl;

          // Merge amenities (union with existing)
          const existingAmenityIds = (project.amenities || []).map((a) => (typeof a === 'object' ? a.id : a));
          updateData.amenities = [...new Set([...existingAmenityIds, ...amenityIds])];

          // Merge BHK types (union)
          const existingBhkTypes = project.bhkTypes || [];
          updateData.bhkTypes = [...new Set([...existingBhkTypes, ...Array.from(bhkTypes)])];

          // Add new images to gallery
          if (imageIds.length > 0) {
            const existingImages = project.images || [];
            const existingFilenames = existingImages
              .map((img) => (typeof img === 'object' ? img.image?.filename : null))
              .filter(Boolean);

            const newImages = [];
            for (const imgId of imageIds) {
              const media = await payload.findByID({ collection: 'media', id: imgId });
              if (media && !existingFilenames.includes(media.filename)) {
                newImages.push({ image: imgId });
              }
            }

            if (newImages.length > 0) {
              updateData.images = [...existingImages, ...newImages];
            }
          }

          // Add new floor plans
          if (floorPlans.length > 0) {
            const existingPlans = project.floorPlans || [];
            const newPlans = floorPlans
              .filter((fp) => fp.planMediaId)
              .map((fp) => ({
                plan: fp.planMediaId,
                label: fp.title,
                rooms: fp.rooms,
                bathrooms: fp.bathrooms,
                size: fp.size,
              }));

            if (newPlans.length > 0) {
              updateData.floorPlans = [...existingPlans, ...newPlans];
            }
          }

          await payload.update({
            collection: 'projects',
            id: project.id,
            data: updateData,
          });

          console.log(`  ✓ Updated: ${project.name}`);
          updatedCount++;
        } else {
          // Create new project (Aparna - Studio)
          if (!coverImageId) {
            console.log(`  ⚠ No cover image available, skipping creation`);
            failedCount++;
            continue;
          }

          // Convert description HTML to Lexical
          let lexicalDesc = null;
          if (description) {
            try {
              lexicalDesc = convertHTMLToLexical({
                editorConfig,
                html: description,
                JSDOM,
              });
            } catch (err) {
              console.log(`  ⚠ Failed to convert description HTML`);
            }
          }

          const newProject = await payload.create({
            collection: 'projects',
            data: {
              name: title,
              location: address || 'Madurai',
              projectType,
              status,
              coverImage: coverImageId,
              bhkTypes: Array.from(bhkTypes),
              priceRangeStartFrom: price,
              amenities: amenityIds,
              locationAddress: address || mapAddress,
              latitude,
              longitude,
              videoUrl: videoUrl || undefined,
              description: lexicalDesc,
              images: imageIds.slice(1).map((id) => ({ image: id })), // Skip first (cover)
              floorPlans: floorPlans
                .filter((fp) => fp.planMediaId)
                .map((fp) => ({
                  plan: fp.planMediaId,
                  label: fp.title,
                  rooms: fp.rooms,
                  bathrooms: fp.bathrooms,
                  size: fp.size,
                })),
            },
          });

          console.log(`  ✓ Created: ${newProject.name}`);
          createdCount++;
        }
      } catch (err) {
        console.error(`  ✗ Error:`, err.message.split('\n')[0]);
        failedCount++;
      }
    }

    console.log(`\n✅ Import complete: ${updatedCount} updated, ${createdCount} created, ${failedCount} failed`);
    process.exit(failedCount > 0 ? 1 : 0);
  } catch (err) {
    console.error('✗ Fatal error:', err.message);
    process.exit(1);
  }
}

importProperties();
