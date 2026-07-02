#!/usr/bin/env node

/**
 * Fix broken post content (repair HTML strings to Lexical JSON)
 * One-off script to repair the 39 WordPress-imported posts where content
 * was stored as cleaned HTML strings instead of Lexical editor-state objects.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getPayload } from 'payload';
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import { JSDOM } from 'jsdom';
import config from '../payload.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

/**
 * Main repair function
 */
async function fixPostContent() {
  const xmlPath = path.join(__dirname, '../wp/visvas.WordPress.2026-07-02.xml');

  console.log('🔧 Fixing broken post content (HTML → Lexical JSON)...\n');

  try {
    // Initialize Payload
    const payload = await getPayload({ config });

    // Get editor config for HTML → Lexical conversion
    // Posts.content has no custom editor field, uses global default from payload.config.js
    console.log('Preparing editor config...');
    const editorConfig = await editorConfigFactory.default({ config: payload.config, isRoot: false, parentIsLocalized: false });
    console.log('Editor config ready\n');

    // Fetch all posts
    console.log('Fetching all posts...');
    const { docs: posts } = await payload.find({
      collection: 'posts',
      limit: 9999,
    });
    console.log(`Found ${posts.length} posts\n`);

    // Process each post
    let fixedCount = 0;
    let skippedCount = 0;
    let failureCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      // Skip if content is already an object (valid Lexical JSON)
      if (typeof post.content === 'object' && post.content !== null) {
        skippedCount++;
        continue;
      }

      // Content should be a string if broken
      if (typeof post.content !== 'string') {
        console.error(`✗ [${i + 1}/${posts.length}] Unexpected content type:`, typeof post.content);
        failureCount++;
        continue;
      }

      try {
        // Convert HTML string to Lexical JSON
        const html = post.content;
        const lexicalJSON = convertHTMLToLexical({ editorConfig, html, JSDOM });

        // Update post in Payload
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: { content: lexicalJSON },
        });

        console.log(`✓ [${i + 1}/${posts.length}] Fixed: ${post.title}`);
        fixedCount++;
      } catch (error) {
        console.error(`✗ [${i + 1}/${posts.length}] Failed to convert "${post.title}":`, error.message.split('\n')[0]);
        failureCount++;
      }
    }

    console.log(`\n✅ Repair complete: ${fixedCount} fixed, ${skippedCount} already valid, ${failureCount} failed`);
    process.exit(failureCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('✗ Repair failed:', error.message);
    process.exit(1);
  }
}

// Run repair
fixPostContent();
