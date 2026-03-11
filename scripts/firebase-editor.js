/**
 * Firebase Firestore Blog Editor
 * .env.local'dan credentials okur, doğrudan Firestore'a bağlanır
 * Kullanım: node scripts/firebase-editor.js <command> [arg]
 */

const path = require('path');
const fs = require('fs');

// .env.local'ı manuel parse et (dotenv gerekmez)
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });
  return env;
}

const env = loadEnv();

const admin = require('firebase-admin');

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

// ─── Yardımcı Fonksiyonlar ─────────────────────────────────────────────────

async function getPostBySlug(slug) {
  const snapshot = await db.collection('posts')
    .where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() };
}

async function updatePost(docId, fields) {
  await db.collection('posts').doc(docId).update({
    ...fields,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(html) {
  return stripHtml(html).split(' ').filter(w => w.length > 0).length;
}

// ─── Komutlar ──────────────────────────────────────────────────────────────

const commands = {

  // Tüm postları listele
  async list() {
    const snap = await db.collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc').get();
    console.log(`\n📋 ${snap.size} yayınlı post:\n`);
    snap.docs.forEach((d, i) => {
      const data = d.data();
      const wc = wordCount(data.content);
      const flag = wc < 600 ? '🔴' : wc < 1000 ? '🟡' : '✅';
      console.log(`${String(i+1).padStart(2)}. ${flag} ${wc.toString().padStart(4)}w  ${data.slug}`);
    });
    console.log('\n🔴 <600w = İnce içerik   🟡 600-999w = Geliştir   ✅ 1000w+ = İyi');
  },

  // Bir postun içeriğini göster
  async get(slug) {
    if (!slug) return console.log('Kullanım: node firebase-editor.js get <slug>');
    const post = await getPostBySlug(slug);
    if (!post) return console.log('Post bulunamadı:', slug);
    const text = stripHtml(post.content);
    const wc = wordCount(post.content);
    console.log(`\n📄 ${post.title}`);
    console.log(`Kelime: ${wc} | Kategori: ${post.category} | Yayın: ${post.published}`);
    console.log(`\n--- İÇERİK ---\n${text.substring(0, 3000)}${text.length > 3000 ? '\n...(devamı var)' : ''}`);
  },

  // AI sızıntısı tara
  async 'find-ai-leak'() {
    const snap = await db.collection('posts').where('published', '==', true).get();
    const leakPhrases = [
      'The provided analysis',
      'as an AI',
      'as a language model',
      'high competition',
      'search volume',
      'provided analysis indicates',
      'keyword difficulty',
      'I cannot provide',
      'I apologize',
      'Note:',
      '[Insert',
      'TODO:',
      'placeholder',
    ];

    console.log('\n🔍 AI sızıntısı ve kalite sorunları taranıyor...\n');
    let found = 0;

    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const text = stripHtml(data.content);
      for (const phrase of leakPhrases) {
        if (text.toLowerCase().includes(phrase.toLowerCase())) {
          const idx = text.toLowerCase().indexOf(phrase.toLowerCase());
          console.log(`⚠️  "${phrase}" → ${data.slug}`);
          console.log(`   ...${text.substring(Math.max(0, idx-80), idx+150)}...`);
          console.log('');
          found++;
          break;
        }
      }
    }
    if (found === 0) console.log('✅ Sorun bulunamadı.');
    else console.log(`⚠️  ${found} post sorunlu.`);
  },

  // Post içeriğini düzenle — belirli metni bul-değiştir
  async 'fix'(slug) {
    if (!slug) return console.log('Kullanım: node firebase-editor.js fix <slug>');
    const post = await getPostBySlug(slug);
    if (!post) return console.log('Post bulunamadı:', slug);

    let content = post.content;
    const originalLength = content.length;

    // AI leak pattern'larını temizle
    const patterns = [
      { find: /The provided analysis indicates that[^<\.]*[<\.]/gi, replace: '' },
      { find: /\[as an AI[^\]]*\]/gi, replace: '' },
      { find: /Note:\s*This content[^<]*/gi, replace: '' },
      { find: /\[Insert[^\]]*\]/gi, replace: '' },
      { find: /TODO:[^<]*/gi, replace: '' },
    ];

    let changes = 0;
    for (const p of patterns) {
      const before = content;
      content = content.replace(p.find, p.replace);
      if (content !== before) changes++;
    }

    if (changes > 0) {
      await updatePost(post.id, { content });
      console.log(`✅ ${slug}: ${changes} pattern temizlendi (${originalLength} → ${content.length} karakter)`);
    } else {
      console.log(`ℹ️  Otomatik temizlenemedi. İçeriği görmek için: node firebase-editor.js get ${slug}`);
    }
  },

  // İçerik + HTML göster (manuel düzenleme için)
  async 'get-html'(slug) {
    if (!slug) return console.log('Kullanım: node firebase-editor.js get-html <slug>');
    const post = await getPostBySlug(slug);
    if (!post) return console.log('Post bulunamadı:', slug);
    const outFile = path.join(__dirname, `..`, `${slug}-content.html`);
    fs.writeFileSync(outFile, post.content, 'utf8');
    console.log(`✅ HTML içerik kaydedildi: ${outFile}`);
    console.log(`Kelime sayısı: ${wordCount(post.content)}`);
  },

  // HTML dosyasını Firebase'e geri yükle
  async 'upload-html'(slug) {
    if (!slug) return console.log('Kullanım: node firebase-editor.js upload-html <slug>');
    const post = await getPostBySlug(slug);
    if (!post) return console.log('Post bulunamadı:', slug);
    const inFile = path.join(__dirname, '..', `${slug}-content.html`);
    if (!fs.existsSync(inFile)) return console.log('HTML dosyası bulunamadı:', inFile);
    const content = fs.readFileSync(inFile, 'utf8');
    await updatePost(post.id, { content });
    console.log(`✅ ${slug} Firebase'de güncellendi. Kelime: ${wordCount(content)}`);
  },

  // Meta description düzelt (160 karakter limiti)
  async 'fix-meta'(slug) {
    if (!slug) return console.log('Kullanım: node firebase-editor.js fix-meta <slug>');
    const post = await getPostBySlug(slug);
    if (!post) return console.log('Post bulunamadı:', slug);

    let changed = false;
    const updates = {};

    if (post.description && post.description.length > 160) {
      updates.description = post.description.substring(0, 157) + '...';
      console.log(`description: ${post.description.length} → 160 karakter`);
      changed = true;
    }
    if (post.seoDescription && post.seoDescription.length > 160) {
      updates.seoDescription = post.seoDescription.substring(0, 157) + '...';
      console.log(`seoDescription: ${post.seoDescription.length} → 160 karakter`);
      changed = true;
    }

    if (changed) {
      await updatePost(post.id, updates);
      console.log(`✅ ${slug} meta description düzeltildi.`);
    } else {
      console.log(`ℹ️  Meta description zaten ≤160 karakter.`);
    }
  },

  // Tüm postların slug+title+image+category listesi
  async 'list-images'() {
    const snap = await db.collection('posts').where('published', '==', true).orderBy('createdAt', 'desc').get();
    snap.docs.forEach(d => {
      const data = d.data();
      console.log(`${data.slug}|||${data.title}|||${data.image || 'NO_IMAGE'}|||${data.category}`);
    });
  },

  // Tüm postların meta description'larını toplu düzelt
  async 'fix-all-meta'() {
    const snap = await db.collection('posts').where('published', '==', true).get();
    let fixed = 0;
    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const updates = {};
      let changed = false;
      if (data.description && data.description.length > 160) {
        updates.description = data.description.substring(0, 157) + '...';
        changed = true;
      }
      if (data.seoDescription && data.seoDescription.length > 160) {
        updates.seoDescription = data.seoDescription.substring(0, 157) + '...';
        changed = true;
      }
      if (changed) {
        await db.collection('posts').doc(docSnap.id).update({
          ...updates,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`✅ ${data.slug}`);
        fixed++;
      }
    }
    console.log(`\nToplam ${fixed} post meta düzeltildi.`);
  },
};

// ─── Çalıştır ──────────────────────────────────────────────────────────────

const command = process.argv[2];
const arg = process.argv[3];

if (!command || !commands[command]) {
  console.log(`
🔧 Firebase Blog Editor

Komutlar:
  list                  → Tüm postları kelime sayısıyla listele
  get <slug>            → Post içeriğini göster
  get-html <slug>       → HTML içeriği dosyaya kaydet (düzenleme için)
  upload-html <slug>    → Düzenlenmiş HTML'i Firebase'e yükle
  find-ai-leak          → AI sızıntısı ve kalite sorunlarını tara
  fix <slug>            → AI sızıntısını otomatik temizle
  fix-meta <slug>       → Meta description'ı 160 karaktere indir
  fix-all-meta          → Tüm postların meta'sını toplu düzelt

Örnekler:
  node scripts/firebase-editor.js list
  node scripts/firebase-editor.js find-ai-leak
  node scripts/firebase-editor.js get the-art-of-studio-living-guide
  node scripts/firebase-editor.js get-html how-to-make-small-kitchen-functional
  `);
} else {
  commands[command](arg).then(() => process.exit(0)).catch(err => {
    console.error('Hata:', err.message);
    process.exit(1);
  });
}

// Geçici komut - list-images
async function listImages() {
  const snap = await db.collection('posts').where('published', '==', true).orderBy('createdAt', 'desc').get();
  snap.docs.forEach(d => {
    const data = d.data();
    console.log(`${data.slug}|||${data.title}|||${data.image || 'NO_IMAGE'}|||${data.category}`);
  });
}
