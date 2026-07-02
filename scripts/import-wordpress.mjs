#!/usr/bin/env node

/**
 * Import WordPress XML export to Payload CMS
 * - Parse XML posts
 * - Remove all images from content
 * - Strip class, style, id attributes (keep only semantic HTML)
 * - Set placeholder featured image for all posts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import xml2js from 'xml2js';
import { getPayload } from 'payload';
import config from '../payload.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const PLACEHOLDER_IMAGE_URL = 'https://visvas.vercel.app/og-image.png';

/**
 * Strip non-semantic tags and attributes
 */
function cleanHtml(html) {
  if (!html) return '';

  // Remove all img tags
  html = html.replace(/<img[^>]*>/gi, '');

  // Remove style, class, id attributes from all tags
  html = html.replace(/\s+(style|class|id|data-[a-z-]+)="[^"]*"/gi, '');
  html = html.replace(/\s+(style|class|id|data-[a-z-]+)='[^']*'/gi, '');

  // Remove onclick, onload, etc event handlers
  html = html.replace(/\s+on\w+="[^"]*"/gi, '');

  return html.trim();
}

/**
 * Extract post slug from URL
 */
function extractSlug(link) {
  if (!link) return '';
  const parts = link.split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
}

/**
 * Get existing placeholder media document
 */
async function getPlaceholderImage(payload) {
  try {
    // Find any existing media doc to use as placeholder
    const existing = await payload.find({
      collection: 'media',
      limit: 1,
    });

    if (existing.docs.length > 0) {
      return existing.docs[0].id;
    }

    console.warn('⚠ No media docs found in database');
    return null;
  } catch (error) {
    console.warn('⚠ Could not find placeholder image:', error.message);
    return null;
  }
}

/**
 * Main import function
 */
async function importWordPress() {
  const xmlPath = path.join(__dirname, '../wp/visvas.WordPress.2026-07-02.xml');

  if (!fs.existsSync(xmlPath)) {
    console.error(`✗ WordPress XML file not found at ${xmlPath}`);
    process.exit(1);
  }

  console.log('📥 Importing WordPress posts to Payload CMS...\n');

  try {
    // Initialize Payload
    const payload = await getPayload({ config });

    // Get placeholder image
    console.log('Getting placeholder image...');
    const coverImageId = await getPlaceholderImage(payload);
    if (!coverImageId) {
      console.error('✗ No media docs found. Create at least one image in Payload admin first.');
      process.exit(1);
    }
    console.log(`Using media doc ID: ${coverImageId}\n`);

    // Parse XML
    const parser = new xml2js.Parser();
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
    const parsed = await parser.parseStringPromise(xmlContent);

    const items = parsed.rss.channel[0].item || [];
    console.log(`Found ${items.length} posts in WordPress export\n`);

    // Import each post
    let successCount = 0;
    let skipped = 0;
    for (let i = 0; i < items.length; i++) {
      const post = items[i];
      const isPage = post['wp:post_type']?.[0] === 'page';
      const status = post['wp:status']?.[0];

      // Skip pages and non-published posts
      if (isPage || status === 'draft') {
        skipped++;
        continue;
      }

      try {
        const slug = extractSlug(post.link[0]) || post.title[0].toLowerCase().replace(/\s+/g, '-');
        const publishedAt = post['wp:post_date_gmt'] ? new Date(post['wp:post_date_gmt'][0]) : new Date();

        const postData = {
          title: post.title[0],
          slug,
          excerpt: post['excerpt:encoded']?.[0] || post.title[0].substring(0, 160),
          content: cleanHtml(post['content:encoded']?.[0] || ''),
          author: post['dc:creator']?.[0] || 'Visvas Team',
          coverImage: coverImageId,
          status: 'published',
          publishedAt,
        };

        const created = await payload.create({
          collection: 'posts',
          data: postData,
        });

        console.log(`✓ [${i + 1}/${items.length}] ${created.title}`);
        successCount++;
      } catch (error) {
        console.error(`✗ [${i + 1}/${items.length}] Failed:`, error.message.split('\n')[0]);
      }
    }

    console.log(`\n✅ Import complete: ${successCount} posts created (${skipped} skipped)`);
    process.exit(0);
  } catch (error) {
    console.error('✗ Import failed:', error.message);
    process.exit(1);
  }
}

// Run import
importWordPress();
