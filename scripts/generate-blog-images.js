/**
 * Blog Image Generator
 * HTML content dosyalarındaki [IMAGE: ...] marker'larını bulur,
 * Gemini ile görsel üretir, Cloudinary'e yükler, marker'ları <figure> ile değiştirir.
 *
 * Kullanım:
 *   node scripts/generate-blog-images.js              → tüm *-content.html dosyaları
 *   node scripts/generate-blog-images.js <dosya.html> → tek dosya
 */

const { GoogleGenAI } = require('@google/genai');
const cloudinary = require('cloudinary').v2;
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
  api_key:    env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// ─── Base style ───────────────────────────────────────────────────────────────

const BASE_STYLE = 'bright natural daylight, minimal Scandinavian interior photography, white walls, light oak wood accents, clean uncluttered composition, warm neutral tones (cream ivory beige), professional lifestyle photography, no people, no text, no watermarks, photorealistic, high resolution, horizontal 16:9 aspect ratio';

// ─── Gemini Generate ──────────────────────────────────────────────────────────

async function generateImage(description) {
  const prompt = `${description}. ${BASE_STYLE}`;
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-fast-generate-001',
    prompt,
    config: { numberOfImages: 1, aspectRatio: '16:9' },
  });
  if (!response.generatedImages?.length) throw new Error('No image returned');
  return Buffer.from(response.generatedImages[0].image.imageBytes, 'base64');
}

// ─── Cloudinary Upload ────────────────────────────────────────────────────────

function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'blog-images', public_id: publicId, overwrite: true, format: 'webp', quality: 85 },
      (err, result) => (err ? reject(err) : resolve(result))
    ).end(buffer);
  });
}

// ─── Extract IMAGE markers ────────────────────────────────────────────────────
// Supports:
//   [IMAGE: description — search terms: "..."]
//   <!-- [IMAGE: description — search terms: "..."] -->
//   <p>[IMAGE: ...]</p>

function extractMarkers(html) {
  const results = [];
  // Match [IMAGE: ...] with optional HTML comment or p wrapper
  const re = /(?:<!--\s*)?\[IMAGE:\s*([^\]]+?)\](?:\s*-->)?/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const full = m[0];
    const raw = m[1].trim();
    // Extract description (before — or search terms:)
    const descMatch = raw.match(/^(.+?)(?:\s*[—–-]+\s*search terms?:|$)/i);
    const description = descMatch ? descMatch[1].trim() : raw;
    results.push({ full, description });
  }
  // Also match <p>[IMAGE: ...]</p>
  const re2 = /<p>\[IMAGE:\s*([^\]]+?)\]<\/p>/g;
  while ((m = re2.exec(html)) !== null) {
    const full = m[0];
    const raw = m[1].trim();
    const descMatch = raw.match(/^(.+?)(?:\s*[—–-]+\s*search terms?:|$)/i);
    const description = descMatch ? descMatch[1].trim() : raw;
    // Avoid duplicates
    if (!results.find(r => r.full === full)) {
      results.push({ full, description });
    }
  }
  return results;
}

// ─── Slugify ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60)
    .replace(/-+$/, '');
}

// ─── Process single HTML file ─────────────────────────────────────────────────

async function processFile(filePath) {
  const fileName = path.basename(filePath, '-content.html');
  console.log(`\n📄 ${fileName}`);

  let html = fs.readFileSync(filePath, 'utf8');
  const markers = extractMarkers(html);

  if (!markers.length) {
    console.log('   ℹ️  Marker yok, atlandı.');
    return 0;
  }

  console.log(`   🔍 ${markers.length} görsel marker bulundu`);

  let replaced = 0;
  for (let i = 0; i < markers.length; i++) {
    const { full, description } = markers[i];
    const publicId = `${fileName}-img-${i + 1}-${slugify(description).substring(0, 40)}`;

    console.log(`   [${i + 1}/${markers.length}] Üretiliyor: "${description.substring(0, 60)}..."`);

    try {
      const buffer = await generateImage(description);
      const result = await uploadToCloudinary(buffer, publicId);
      const imgUrl = result.secure_url;

      // Build <figure> replacement
      // Alt text: clean description, strip any leaked search terms/keywords artifacts
      const altText = description
        .replace(/\s*[—–-]+\s*(?:search terms?|keywords?)\s*:.*$/i, '')
        .replace(/"/g, '&quot;')
        .replace(/\s+$/, '')
        .substring(0, 200);
      // First image: fetchpriority=high (LCP optimization), rest: loading=lazy
      const loadAttr = i === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
      // width/height: Gemini generates 16:9 images → 1200x675 closest standard
      const figure = `<figure class="blog-image">
  <img src="${imgUrl}" alt="${altText}" width="1200" height="675" ${loadAttr} style="width:100%;height:auto;border-radius:8px;" />
</figure>`;

      html = html.replace(full, figure);
      replaced++;
      console.log(`   ✅ ${imgUrl}`);
    } catch (err) {
      console.error(`   ❌ ${err.message}`);
    }
  }

  if (replaced > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`   💾 Dosya güncellendi (${replaced} görsel eklendi)`);
  }

  return replaced;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const targetFile = process.argv[2];
  const rootDir = path.join(__dirname, '..');

  let files;
  if (targetFile) {
    const p = path.isAbsolute(targetFile) ? targetFile : path.join(rootDir, targetFile);
    if (!fs.existsSync(p)) { console.error(`❌ Dosya bulunamadı: ${p}`); process.exit(1); }
    files = [p];
  } else {
    files = fs.readdirSync(rootDir)
      .filter(f => f.endsWith('-content.html'))
      .map(f => path.join(rootDir, f));
  }

  console.log(`📋 ${files.length} dosya işlenecek`);

  let totalReplaced = 0;
  for (const f of files) {
    totalReplaced += await processFile(f);
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅ Toplam ${totalReplaced} görsel eklendi`);
  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
