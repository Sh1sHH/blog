/**
 * Clean leftover blog rewrite markers from *-content.html files
 * Then upload each fixed file back to Firebase.
 *
 * Usage: node scripts/clean-content-markers.js
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

// ─── Clean markers ────────────────────────────────────────────────────────────

function cleanMarkers(html) {
  let out = html;

  // 1. Remove HTML comment internal-link markers
  out = out.replace(/<!--\s*\[INTERNAL-LINK:[^\]]*\]\s*-->/gi, '');

  // 2. Convert [INTERNAL-LINK: anchor text → /blog/slug] to real links
  out = out.replace(/\[INTERNAL-LINK:\s*([^→\]]+?)\s*→\s*(\/[^\]]+?)\s*\]/gi, (_, anchor, href) => {
    return `<a href="${href.trim()}">${anchor.trim()}</a>`;
  });

  // 3. Remove [CHART: ...] lines (inside <p> or standalone)
  out = out.replace(/<p>\[CHART:[^\]]*\]<\/p>/gi, '');
  out = out.replace(/\[CHART:[^\]]*\]/gi, '');

  // 4. Remove info-gain marker prefixes but keep the content
  //    Handles: [ORIGINAL DATA], [ORIGINAL DATA]:, <!-- [ORIGINAL DATA] --> etc.
  const infoPrefixes = ['ORIGINAL DATA', 'PERSONAL EXPERIENCE', 'UNIQUE INSIGHT'];
  for (const prefix of infoPrefixes) {
    // Inside <p>[PREFIX]: text</p> or <p>[PREFIX] text</p>
    out = out.replace(new RegExp(`\\[${prefix}\\]:?\\s*`, 'gi'), '');
    // HTML comment version <!-- [PREFIX] -->
    out = out.replace(new RegExp(`<!--\\s*\\[${prefix}\\]\\s*-->`, 'gi'), '');
  }

  // 5. Clean up leftover empty <p></p> or <p> </p>
  out = out.replace(/<p>\s*<\/p>/gi, '');

  // 6. Clean up multiple blank lines
  out = out.replace(/\n{3,}/g, '\n\n');

  return out.trim();
}

// ─── Firebase helpers ─────────────────────────────────────────────────────────

async function getPostBySlug(slug) {
  const snap = await db.collection('posts').where('slug', '==', slug).limit(1).get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function updatePost(docId, content) {
  await db.collection('posts').doc(docId).update({
    content,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

function wordCount(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(w => w).length;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const rootDir = path.join(__dirname, '..');
  const files = fs.readdirSync(rootDir).filter(f => f.endsWith('-content.html'));

  console.log(`📋 ${files.length} dosya işlenecek\n`);

  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = file.replace('-content.html', '');
    const filePath = path.join(rootDir, file);
    const original = fs.readFileSync(filePath, 'utf8');
    const cleaned = cleanMarkers(original);

    if (cleaned === original) {
      console.log(`⏭️  ${slug} — marker yok`);
      skipped++;
      continue;
    }

    // Save cleaned file
    fs.writeFileSync(filePath, cleaned, 'utf8');

    // Upload to Firebase
    const post = await getPostBySlug(slug);
    if (!post) {
      console.log(`⚠️  ${slug} — Firebase'de bulunamadı, dosya temizlendi ama upload edilmedi`);
      fixed++;
      continue;
    }

    await updatePost(post.id, cleaned);
    console.log(`✅ ${slug} — temizlendi & Firebase güncellendi (${wordCount(cleaned)} kelime)`);
    fixed++;
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅ Düzeltilen: ${fixed}  ⏭️  Atlanan: ${skipped}`);
  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
