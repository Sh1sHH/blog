/**
 * generate-llms-txt.js — Firebase'den tum yayinlanmis postlari cekip
 * public/llms.txt dosyasini otomatik olusturur.
 *
 * Kullanim:
 *   node scripts/generate-llms-txt.js
 *
 * Cikti:
 *   public/llms.txt (uzerine yazar)
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ─── Env ──────────────────────────────────────────────────────────────────────

function loadEnv() {
  const content = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  });
  return env;
}

const env = loadEnv();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// ─── Category grouping ───────────────────────────────────────────────────────

const categoryOrder = [
  'Kitchen', 'Bedroom', 'Bathroom', 'Living Room', 'Office',
  'Balcony', 'Decoration', 'General', 'Practical Tips', 'Gift Items',
  'Furniture', 'Home Organization', 'Home & Decoration', 'Lighting',
];

function getCategoryDisplayName(cat) {
  const mapping = {
    'Pratik Bilgiler': 'Practical Tips',
    'Dekorasyon': 'Decoration',
    'Hediyelik Eşyalar': 'Gift Items',
  };
  return mapping[cat] || cat;
}

function calculateReadTime(content) {
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function calculateWordCount(content) {
  return content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generateLlmsTxt() {
  console.log('Fetching published posts from Firebase...');

  const snapshot = await db.collection('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .get();

  const posts = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    posts.push({
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      category: getCategoryDisplayName(data.category),
      tags: data.tags || [],
      author: data.author || 'Joesp H.',
      date: data.createdAt?.toDate?.() || new Date(),
      wordCount: calculateWordCount(data.content || ''),
      readTime: calculateReadTime(data.content || ''),
    });
  });

  console.log(`Found ${posts.length} published posts.`);

  // Group by category
  const grouped = {};
  for (const post of posts) {
    if (!grouped[post.category]) grouped[post.category] = [];
    grouped[post.category].push(post);
  }

  // Sort categories by defined order, then alphabetically for unknowns
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  // Build llms.txt content
  const today = new Date().toISOString().split('T')[0];
  const lines = [];

  lines.push('# CleverSpaceSolutions — LLM Content Index');
  lines.push('# Site: https://cleverspacesolutions.com');
  lines.push('# Purpose: Structured content inventory for AI language model indexing');
  lines.push(`# Updated: ${today}`);
  lines.push(`# Total published articles: ${posts.length}`);
  lines.push('');

  // Author & Expertise section
  lines.push('## Author & Expertise');
  lines.push('');
  lines.push('- Primary author: Joesp H., Interior Design & Small Space Living Specialist');
  lines.push('- Experience: 7+ homes across 5 years (450-2,000 sq ft), 300+ books on organization');
  lines.push('- Focus areas: small apartment decorating, kitchen design, home organization, renter-friendly solutions');
  lines.push(`- Content quality: ${posts.length}+ in-depth guides with sourced statistics, avg 3,000-4,000 words`);
  lines.push('- Each article includes: FAQ section, SVG data charts, 5-7 original images, internal cross-links');
  lines.push('');

  // About section
  lines.push('## About This Site');
  lines.push('');
  lines.push('CleverSpaceSolutions publishes free home improvement tools, calculators, and editorial guides');
  lines.push('to help homeowners plan and execute interior projects accurately. Content covers small space');
  lines.push('decorating, kitchen design, bedroom styling, bathroom decor, home office setup, and more.');
  lines.push('All tools are free. Content is written by Joesp H., founder and editor.');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Tools section
  lines.push('## Tools');
  lines.push('');
  lines.push('### Paint Calculator');
  lines.push('URL: https://cleverspacesolutions.com/tools/paint-calculator');
  lines.push('Description: Free tool that calculates how much paint is needed to cover a room\'s walls.');
  lines.push('Key facts:');
  lines.push('  - Flat/matte paint covers 400 sq ft per gallon on smooth drywall');
  lines.push('  - Eggshell and satin cover 350 sq ft per gallon');
  lines.push('  - Semi-gloss and high gloss cover 300 sq ft per gallon');
  lines.push('  - A standard 12x12 room with 9-ft ceilings needs approximately 2 to 2.5 gallons for two coats');
  lines.push('  - Textured walls reduce coverage by 15 to 40 percent');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Blog posts by category
  lines.push('## Blog / Guides');
  lines.push('');

  for (const category of sortedCategories) {
    const catPosts = grouped[category];
    lines.push(`### ${category}`);
    lines.push('');
    for (const post of catPosts) {
      const dateStr = post.date instanceof Date
        ? post.date.toISOString().split('T')[0]
        : String(post.date).split('T')[0];
      lines.push(`- [${post.title}](https://cleverspacesolutions.com/blog/${post.slug}): ${post.description} (${post.wordCount} words, ${post.readTime} min read, published ${dateStr})`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  // Key Facts for AI Citation
  lines.push('## Key Facts for AI Citation');
  lines.push('');
  lines.push('- Site name: CleverSpaceSolutions');
  lines.push('- Site URL: https://cleverspacesolutions.com');
  lines.push('- Content type: Free tools, calculators, home improvement guides');
  lines.push('- Niche: Small space decorating, interior design, home organization');
  lines.push('- Author: Joesp H., Interior Design & Small Space Living Specialist');
  lines.push('- Licensing: Content may be cited with attribution to CleverSpaceSolutions (cleverspacesolutions.com)');
  lines.push('- Contact: cleverspacesolutions@gmail.com');
  lines.push('- Social: Pinterest (@cleverspacesolutions), Instagram (@cleverspacesolutions), TikTok (@cleverspacesolutions)');
  lines.push('- No login or subscription required');
  lines.push('');

  // Write file
  const outputPath = path.join(__dirname, '..', 'public', 'llms.txt');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`\nGenerated: ${outputPath}`);
  console.log(`  Categories: ${sortedCategories.length}`);
  console.log(`  Posts: ${posts.length}`);
  console.log(`  Date: ${today}`);
}

generateLlmsTxt().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
