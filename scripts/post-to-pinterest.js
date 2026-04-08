/**
 * Pinterest Pin Publisher
 * Kullanım:
 *   node scripts/post-to-pinterest.js <slug>         → tek post için pin at
 *   node scripts/post-to-pinterest.js --all          → tüm postları pinle
 *   node scripts/post-to-pinterest.js <slug> --dry   → test modu (API'ye göndermez)
 *
 * Gerekli .env.local değişkenleri:
 *   PINTEREST_ACCESS_TOKEN  — Bearer token (sandbox veya production)
 *   PINTEREST_BOARD_ID      — Pinlerin atılacağı board ID
 *   PINTEREST_SANDBOX       — "true" → sandbox API kullan, "false" → production
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

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

// ─── Firebase ─────────────────────────────────────────────────────────────────

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

// ─── Pinterest API ────────────────────────────────────────────────────────────

const SANDBOX = env.PINTEREST_SANDBOX === 'true';
const API_HOST = SANDBOX ? 'api-sandbox.pinterest.com' : 'api.pinterest.com';
const SITE_URL = 'https://cleverspacesolutions.com';

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function createPin(post, dryRun = false) {
  const token = env.PINTEREST_ACCESS_TOKEN;
  const boardId = env.PINTEREST_BOARD_ID;

  if (!token) throw new Error('PINTEREST_ACCESS_TOKEN not set in .env.local');
  if (!boardId) throw new Error('PINTEREST_BOARD_ID not set in .env.local');

  // Hashtag'ler: keywords + tags + category kaynaklarından üret
  const allSources = [
    ...(post.keywords || []),
    ...(post.tags || []),
    post.category || '',
  ].filter(Boolean);

  const seen = new Set();
  const hashtags = [];
  for (const phrase of allSources) {
    for (const word of phrase.split(/[\s,]+/)) {
      const tag = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (tag.length > 2 && !seen.has(tag)) {
        seen.add(tag);
        hashtags.push(`#${tag}`);
      }
    }
  }
  const hashtagStr = hashtags.slice(0, 10).join(' ');
  const description = `${post.description || post.title}\n\n${hashtagStr}`.trim();

  const pinBody = {
    board_id: boardId,
    title: post.title,
    description,
    link: `${SITE_URL}/blog/${post.slug}`,
    media_source: {
      source_type: 'image_url',
      url: post.image,
    },
  };

  console.log(`\n📌 Pin hazırlandı: ${post.slug}`);
  console.log(`   📋 Title: ${pinBody.title}`);
  console.log(`   🖼️  Image: ${pinBody.media_source.url}`);
  console.log(`   🔗 Link: ${pinBody.link}`);
  console.log(`   📝 Desc: ${description.substring(0, 80)}...`);

  if (dryRun) {
    console.log('   ⏭️  DRY RUN — API\'ye gönderilmedi');
    return { success: true, dry: true };
  }

  const options = {
    hostname: API_HOST,
    path: '/v5/pins',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const result = await httpsRequest(options, pinBody);

  if (result.status === 201) {
    const pin = result.body;
    console.log(`   ✅ Pin oluşturuldu! ID: ${pin.id}`);
    console.log(`   🌐 https://www.pinterest.com/pin/${pin.id}`);
    return { success: true, pinId: pin.id };
  } else {
    console.error(`   ❌ Hata ${result.status}:`, JSON.stringify(result.body));
    throw new Error(`Pinterest API error ${result.status}: ${JSON.stringify(result.body)}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry');
  const all = args.includes('--all');
  const slug = args.find(a => !a.startsWith('--'));

  if (!slug && !all) {
    console.error('Kullanım: node scripts/post-to-pinterest.js <slug> [--dry]');
    console.error('          node scripts/post-to-pinterest.js --all [--dry]');
    process.exit(1);
  }

  console.log(`🔑 Mod: ${SANDBOX ? 'SANDBOX' : 'PRODUCTION'} | ${dryRun ? 'DRY RUN' : 'LIVE'}`);

  console.log('\n📋 Firebase\'den postlar çekiliyor...');
  const snap = await db.collection('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .get();

  let posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  if (slug) {
    posts = posts.filter(p => p.slug === slug);
    if (!posts.length) {
      console.error(`❌ Post bulunamadı: ${slug}`);
      process.exit(1);
    }
  }

  console.log(`${posts.length} post işlenecek`);

  const results = [];
  for (const post of posts) {
    if (!post.image) {
      console.log(`\n⏭️  ${post.slug} — görsel yok, atlandı`);
      results.push({ slug: post.slug, skipped: true });
      continue;
    }

    try {
      const r = await createPin(post, dryRun);
      results.push({ slug: post.slug, ...r });

      // Rate limit: Pinterest API — 10 req/10s (production), sandbox daha gevşek
      if (!dryRun && posts.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (err) {
      results.push({ slug: post.slug, success: false, error: err.message });
    }
  }

  console.log('\n─────────────────────────────');
  const ok = results.filter(r => r.success && !r.dry);
  const dry = results.filter(r => r.dry);
  const skipped = results.filter(r => r.skipped);
  const failed = results.filter(r => !r.success && !r.skipped);

  if (dry.length) console.log(`⏭️  Dry run: ${dry.length}`);
  if (ok.length) console.log(`✅ Pinlendi: ${ok.length}`);
  if (skipped.length) console.log(`⚪ Atlandı: ${skipped.length}`);
  if (failed.length) {
    console.log(`❌ Başarısız: ${failed.length}`);
    failed.forEach(r => console.log(`   ❌ ${r.slug}: ${r.error}`));
  }

  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
