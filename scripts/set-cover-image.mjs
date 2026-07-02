#!/usr/bin/env node

/**
 * Set cover image to og-image.png for all blog posts
 */

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getPayload } from 'payload';
import config from '../payload.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function setPostCoverImage() {
  console.log('🖼 Setting cover image to og-image.png for all posts...\n');

  try {
    // Initialize Payload
    const payload = await getPayload({ config });

    // Find og-image.png media doc
    console.log('Looking for og-image.png...');
    const { docs: mediaDocs } = await payload.find({
      collection: 'media',
      where: {
        filename: { equals: 'og-image.png' }
      },
      limit: 1,
    });

    if (mediaDocs.length === 0) {
      console.error('✗ og-image.png media doc not found');
      process.exit(1);
    }

    const mediaId = mediaDocs[0].id;
    console.log(`Found og-image.png (media id: ${mediaId})\n`);

    // Fetch all posts
    console.log('Fetching all posts...');
    const { docs: posts } = await payload.find({
      collection: 'posts',
      limit: 9999,
    });
    console.log(`Found ${posts.length} posts\n`);

    // Update each post
    let updatedCount = 0;
    let alreadySetCount = 0;
    let failureCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      // Check if already set to correct image
      if (post.coverImage && post.coverImage.id === mediaId) {
        alreadySetCount++;
        continue;
      }

      try {
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: { coverImage: mediaId },
        });

        console.log(`✓ [${i + 1}/${posts.length}] ${post.title}`);
        updatedCount++;
      } catch (error) {
        console.error(`✗ [${i + 1}/${posts.length}] Failed to update "${post.title}":`, error.message.split('\n')[0]);
        failureCount++;
      }
    }

    console.log(`\n✅ Complete: ${updatedCount} updated, ${alreadySetCount} already set, ${failureCount} failed`);
    process.exit(failureCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('✗ Failed:', error.message);
    process.exit(1);
  }
}

// Run
setPostCoverImage();
