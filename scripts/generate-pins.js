/**
 * Pinterest Pin Generator
 * Kullanım:
 *   node scripts/generate-pins.js                  → tüm postları işle
 *   node scripts/generate-pins.js <slug>            → tek post test
 *
 * Görsel klasörü: scripts/pin-images/<slug>.jpg (veya .png, .webp)
 * Çıktı: Cloudinary'e yükler + Firebase'de image URL'ini günceller
 */

const { createCanvas, loadImage } = require('canvas');
const { GoogleGenAI } = require('@google/genai');
const cloudinary = require('cloudinary').v2;
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ─── Env ──────────────────────────────────────────────────────────────────────

function loadEnv() {
  const content = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim();
  });
  return env;
}
const env = loadEnv();

// ─── SDK Init ─────────────────────────────────────────────────────────────────

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

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
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// ─── Gemini Image Generation ──────────────────────────────────────────────────

const BASE_STYLE = 'bright natural daylight, minimal Scandinavian interior photography, white walls, light oak wood accents, clean uncluttered composition, warm neutral tones (cream ivory beige), professional lifestyle photography, no people, no text, no watermarks, photorealistic, high resolution, vertical 2:3 aspect ratio';

const CATEGORY_SCENE = {
  'Kitchen': 'beautiful styled small kitchen interior',
  'Bedroom': 'cozy minimalist small bedroom interior',
  'Bathroom': 'elegant small bathroom with spa feel',
  'Living Room': 'bright airy small living room with sofa',
  'Balcony': 'small outdoor balcony with plants and seating',
  'Office': 'clean productive home office desk setup',
  'Decoration': 'beautifully decorated minimal living room',
  'Gift Items': 'curated home decor items styled on shelf',
  'Practical Tips': 'organized functional interior with smart storage',
  'General': 'bright Scandinavian interior room',
  'Hediyelik Eşyalar': 'curated home decor items styled on shelf',
  'Pratik Bilgiler': 'organized functional interior with smart storage',
  'Dekorasyon': 'beautifully decorated minimal living room',
};

async function generateImageWithGemini(post) {
  const scene = CATEGORY_SCENE[post.category] || 'bright minimal interior room';
  const titleHint = post.title.replace(/[^a-zA-Z0-9 ]/g, ' ').substring(0, 60).trim();
  const prompt = `${scene}, inspired by: ${titleHint}. Wide angle shot showing full room. ${BASE_STYLE}`;

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-fast-generate-001',
    prompt,
    config: { numberOfImages: 1, aspectRatio: '9:16' },
  });

  if (!response.generatedImages?.length) throw new Error('No image returned');
  return Buffer.from(response.generatedImages[0].image.imageBytes, 'base64');
}

// ─── Template Constants ───────────────────────────────────────────────────────

const W = 1000;
const H = 1500;
const BORDER = 8;
const GOLD = '#C9A84C';
const CREAM = '#F7F3EC';
const DARK = '#111111';

const CATEGORY_LABELS = {
  'Kitchen': 'KITCHEN IDEAS',
  'Bedroom': 'BEDROOM DESIGN',
  'Bathroom': 'BATHROOM DECOR',
  'Living Room': 'LIVING ROOM',
  'Balcony': 'OUTDOOR IDEAS',
  'Office': 'HOME OFFICE',
  'Decoration': 'DECORATION IDEAS',
  'Gift Items': 'GIFT GUIDE',
  'Practical Tips': 'PRACTICAL TIPS',
  'General': 'INTERIOR DESIGN',
  'Hediyelik Eşyalar': 'GIFT GUIDE',
  'Pratik Bilgiler': 'PRACTICAL TIPS',
  'Dekorasyon': 'DECORATION IDEAS',
};

// ─── Text Helpers ─────────────────────────────────────────────────────────────

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

// ─── Pin Builder ──────────────────────────────────────────────────────────────

async function buildPin(post, imageBuffer) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // 1. Gold border background
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, W, H);

  // 2. Full background image (cover-fit inside border)
  const img = await loadImage(imageBuffer);
  const innerX = BORDER;
  const innerY = BORDER;
  const innerW = W - BORDER * 2;
  const innerH = H - BORDER * 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(innerX, innerY, innerW, innerH);
  ctx.clip();

  const scale = Math.max(innerW / img.width, innerH / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const drawX = innerX + (innerW - drawW) / 2;
  const drawY = innerY + (innerH - drawH) / 2;
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  ctx.restore();

  // 3. Dark gradient overlay (bottom half → text readability)
  const gradStart = H * 0.42;
  const grad = ctx.createLinearGradient(0, gradStart, 0, H - BORDER);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.35, 'rgba(0,0,0,0.55)');
  grad.addColorStop(1, 'rgba(0,0,0,0.90)');
  ctx.fillStyle = grad;
  ctx.fillRect(BORDER, BORDER, innerW, innerH);

  // Parse title: extract number + suffix (e.g. "10 Designer Ideas") and base title
  const titleRaw = post.title.replace(/\?$/, '').trim();
  const numberMatch = titleRaw.match(/\b(\d+)\s+([A-Za-z ]{2,30}?)(?:\s*$|(?=\s*[:\-–—]))/);
  let badgeText = null;
  let baseTitle = titleRaw.toUpperCase();

  if (numberMatch) {
    badgeText = `${numberMatch[1]} ${numberMatch[2].trim().toUpperCase()}`;
    // Remove the number+suffix from title for main display
    baseTitle = titleRaw.replace(numberMatch[0], '').replace(/[:\-–—]\s*$/, '').trim().toUpperCase();
    if (baseTitle.length < 10) baseTitle = titleRaw.toUpperCase(); // fallback if too short
  }

  // 4a. Top-center badge (only if number found)
  if (badgeText) {
    ctx.font = 'bold 50px Arial, sans-serif';
    const badgeTextW = ctx.measureText(badgeText).width;
    const badgePadX = 36;
    const badgePadY = 18;
    const badgeW = badgeTextW + badgePadX * 2;
    const badgeH = 30 + badgePadY * 2;
    const badgeX = (W - badgeW) / 2;
    const badgeY = Math.round(H * 0.50);

    // Shadow/glow behind badge
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(badgeX + 3, badgeY + 3, badgeW, badgeH);

    // Badge background — cream
    ctx.fillStyle = CREAM;
    ctx.fillRect(badgeX, badgeY, badgeW, badgeH);

    // Gold bottom accent on badge
    ctx.fillStyle = GOLD;
    ctx.fillRect(badgeX, badgeY + badgeH - 4, badgeW, 4);

    // Badge text
    ctx.fillStyle = DARK;
    ctx.font = 'bold 50px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, W / 2, badgeY + badgeH / 2 - 2);
  }

  // 4b. Bottom cream text box
  const boxW = innerW - 60;
  const boxX = BORDER + 30;
  const label = CATEGORY_LABELS[post.category] || 'INTERIOR DESIGN';

  ctx.font = 'bold 38px Georgia, serif';
  const titleLines = wrapText(ctx, baseTitle, boxW - 60);
  const lineH = 50;
  const titleBlockH = titleLines.length * lineH;
  const boxH = 44 + 16 + titleBlockH + 30;
  const boxY = Math.round(H * 0.58);

  // Box background
  ctx.fillStyle = CREAM;
  ctx.fillRect(boxX, boxY, boxW, boxH);

  // Gold top accent line
  ctx.fillStyle = GOLD;
  ctx.fillRect(boxX, boxY, boxW, 4);

  // Category label
  ctx.fillStyle = '#888888';
  ctx.font = '500 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, W / 2, boxY + 28);

  // Title lines
  ctx.fillStyle = DARK;
  ctx.font = 'bold 38px Georgia, serif';
  const titleStartY = boxY + 44 + 14;
  titleLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, titleStartY + i * lineH);
  });

  // 5. Bottom bar
  const barY = H - BORDER - 72;
  ctx.fillStyle = DARK;
  ctx.fillRect(BORDER, barY, innerW, 72);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('cleverspacesolutions.com', W / 2, barY + 36);

  return canvas.toBuffer('image/png');
}

// ─── Cloudinary Upload ────────────────────────────────────────────────────────

function uploadToCloudinary(buffer, slug) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'pinterest-pins', public_id: `pin_${slug}`, overwrite: true, format: 'webp', quality: 90 },
      (err, result) => (err ? reject(err) : resolve(result))
    ).end(buffer);
  });
}

// ─── Firebase Update ──────────────────────────────────────────────────────────

async function updateFirebase(slug, imageUrl) {
  const snap = await db.collection('posts').where('slug', '==', slug).limit(1).get();
  if (snap.empty) throw new Error(`Post not found: ${slug}`);
  await db.collection('posts').doc(snap.docs[0].id).update({
    image: imageUrl,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

// ─── Find Local Image ─────────────────────────────────────────────────────────

function findLocalImage(slug) {
  const dir = path.join(__dirname, 'pin-images');
  if (!fs.existsSync(dir)) return null;
  const exts = ['.jpg', '.jpeg', '.png', '.webp'];
  for (const ext of exts) {
    const p = path.join(dir, `${slug}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ─── Process Post ─────────────────────────────────────────────────────────────

async function processPost(post) {
  console.log(`\n📌 ${post.slug}`);

  const imgPath = findLocalImage(post.slug);

  try {
    let imageBuffer;
    if (imgPath) {
      console.log(`   📂 Using local: ${path.basename(imgPath)}`);
      imageBuffer = fs.readFileSync(imgPath);
    } else {
      console.log('   🤖 Generating with Gemini...');
      imageBuffer = await generateImageWithGemini(post);
    }

    console.log('   🖼️  Building pin...');
    const pinBuffer = await buildPin(post, imageBuffer);

    console.log('   ☁️  Uploading to Cloudinary...');
    const result = await uploadToCloudinary(pinBuffer, post.slug);

    console.log('   🔥 Updating Firebase...');
    await updateFirebase(post.slug, result.secure_url);

    console.log(`   ✅ ${result.secure_url}`);
    return { slug: post.slug, url: result.secure_url, success: true };

  } catch (err) {
    console.error(`   ❌ ${err.message}`);
    return { slug: post.slug, error: err.message, success: false };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const targetSlug = process.argv[2];

  console.log('📋 Fetching posts from Firebase...');
  const snap = await db.collection('posts').where('published', '==', true)
    .orderBy('createdAt', 'desc').get();

  let posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  if (targetSlug) {
    posts = posts.filter(p => p.slug === targetSlug);
    if (!posts.length) { console.error(`❌ Not found: ${targetSlug}`); process.exit(1); }
    console.log(`🎯 Single: ${targetSlug}`);
  } else {
    console.log(`Found ${posts.length} posts`);
  }

  // Ensure output dir exists
  const imgDir = path.join(__dirname, 'pin-images');
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

  const results = [];
  for (const post of posts) {
    const r = await processPost(post);
    results.push(r);
  }

  console.log('\n─────────────────────────────');
  const ok = results.filter(r => r.success);
  const skipped = results.filter(r => r.skipped);
  const failed = results.filter(r => !r.success && !r.skipped);
  console.log(`✅ Done: ${ok.length}  ⏭️  Skipped: ${skipped.length}  ❌ Failed: ${failed.length}`);
  if (failed.length) failed.forEach(r => console.log(`   ❌ ${r.slug}: ${r.error}`));

  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
