/**
 * create-post.js — Firebase'de yeni blog postu oluştur
 *
 * Kullanım:
 *   node scripts/create-post.js <slug> [seçenekler]
 *
 * Seçenekler:
 *   --title "..."           Post başlığı (zorunlu)
 *   --description "..."     Meta description, 120-160 karakter (zorunlu)
 *   --category "..."        Kategori (varsayılan: Decoration)
 *   --tags "a,b,c"          Virgülle ayrılmış etiketler
 *   --keywords "a,b,c"      SEO anahtar kelimeleri
 *   --seo-title "..."       SEO başlığı (varsayılan: title)
 *   --seo-desc "..."        SEO açıklaması (varsayılan: description)
 *   --image "..."           Kapak görseli URL (otomatik tespit edilir)
 *   --author "..."          Yazar adı (varsayılan: Joesp H.)
 *   --draft                 Yayınlamadan taslak olarak kaydet
 *
 * Örnek:
 *   node scripts/create-post.js cozy-reading-nook-small-apartment \
 *     --title "How to Create a Cozy Reading Nook in a Small Apartment" \
 *     --description "Learn how to create a cozy reading nook in a small apartment..." \
 *     --category "Decoration" \
 *     --tags "reading nook,small apartment,interior design" \
 *     --keywords "reading nook small apartment,cozy reading corner,apartment reading nook"
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

// ─── Arg parser ───────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      args._.push(argv[i]);
    }
  }
  return args;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function wordCount(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(w => w).length;
}

function extractFirstImage(html) {
  const m = html.match(/src="(https?:\/\/[^"]+\.(webp|jpg|jpeg|png)[^"]*)"/i);
  return m ? m[1] : null;
}

function readTime(html) {
  return Math.max(1, Math.ceil(wordCount(html) / 200));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const slug = args._[0];

  if (!slug) {
    console.error('❌ Slug gerekli: node scripts/create-post.js <slug> [seçenekler]');
    process.exit(1);
  }

  // Content HTML dosyasını oku
  const contentFile = path.join(__dirname, '..', `${slug}-content.html`);
  if (!fs.existsSync(contentFile)) {
    console.error(`❌ Dosya bulunamadı: ${slug}-content.html`);
    process.exit(1);
  }

  const content = fs.readFileSync(contentFile, 'utf8');
  console.log(`📄 İçerik okundu: ${wordCount(content)} kelime`);

  // Zorunlu alanları kontrol et
  const title = args['title'];
  if (!title) {
    console.error('❌ --title gerekli');
    process.exit(1);
  }

  const description = args['description'];
  if (!description) {
    console.error('❌ --description gerekli (120-160 karakter)');
    process.exit(1);
  }

  if (description.length < 100 || description.length > 170) {
    console.warn(`⚠️  Description ${description.length} karakter (ideal: 120-160)`);
  }

  // Opsiyonel alanlar
  const category   = args['category'] || 'Decoration';
  const tags       = args['tags']     ? args['tags'].split(',').map(t => t.trim()) : [];
  const keywords   = args['keywords'] ? args['keywords'].split(',').map(k => k.trim()) : [];
  const seoTitle   = args['seo-title']  || title;
  const seoDesc    = args['seo-desc']   || description;
  const author     = args['author']     || 'Joesp H.';
  const published  = !args['draft'];

  // Görsel: önce arg, sonra içerikten otomatik tespit
  let image = args['image'] || null;
  if (!image) {
    image = extractFirstImage(content);
    if (image) console.log(`🖼️  Kapak görseli otomatik tespit edildi: ${image.substring(0, 80)}...`);
    else image = '/images/blog/default.jpg';
  }

  // Slug çakışma kontrolü
  const existing = await db.collection('posts').where('slug', '==', slug).limit(1).get();
  if (!existing.empty) {
    console.error(`❌ Bu slug zaten var: ${slug}`);
    console.log('   Güncellemek için: node scripts/firebase-editor.js upload-html ' + slug);
    process.exit(1);
  }

  // Post verisi
  const postData = {
    slug,
    title,
    content,
    description,
    category,
    tags,
    featured: false,
    published,
    author,
    image,
    seoTitle,
    seoDescription: seoDesc,
    keywords,
    views: 0,
    likes: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  // Özet göster
  console.log('\n📋 Post bilgileri:');
  console.log(`   Slug       : ${slug}`);
  console.log(`   Title      : ${title}`);
  console.log(`   Category   : ${category}`);
  console.log(`   Tags       : ${tags.join(', ') || '(yok)'}`);
  console.log(`   Keywords   : ${keywords.join(', ') || '(yok)'}`);
  console.log(`   Description: ${description.length} karakter`);
  console.log(`   SEO Title  : ${seoTitle.length} karakter`);
  console.log(`   Image      : ${image.substring(0, 70)}`);
  console.log(`   Published  : ${published ? '✅ Yayında' : '📝 Taslak'}`);
  console.log(`   Read time  : ~${readTime(content)} dakika\n`);

  // Firebase'e yaz
  const docRef = await db.collection('posts').add(postData);
  console.log(`✅ Post oluşturuldu!`);
  console.log(`   Firebase ID : ${docRef.id}`);
  console.log(`   URL         : /blog/${slug}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
