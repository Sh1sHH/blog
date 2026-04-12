const path = require('path');
const fs = require('fs');

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

const SLUGS = [
  'best-space-saving-gifts-for-small-apartments',
  '3-flawless-layouts-for-narrow-rooms-and-5-real-life-studio-solutions',
  'how-to-create-entryway-in-apartment',
  'how-to-make-candles-at-home-a-beginners-guide',
  'how-to-layout-a-small-apartment-plans-for-studios-narrow-rooms',
  'how-do-you-decorate-a-studio-apartment-studio-apartment-ideas',
  'how-to-choose-the-best-heater-for-a-small-room',
  'small-bathroom-decor-ideas',
];

(async () => {
  const results = [];
  for (const slug of SLUGS) {
    const snap = await db.collection('posts').where('slug', '==', slug).limit(1).get();
    if (snap.empty) {
      results.push({ slug, found: false });
      continue;
    }
    const d = snap.docs[0].data();
    results.push({
      slug,
      found: true,
      title: d.title,
      seoTitle: d.seoTitle,
      description: d.description,
      seoDescription: d.seoDescription,
      keywords: d.keywords,
    });
  }

  results.forEach(r => {
    console.log('\n' + '='.repeat(80));
    console.log('SLUG:', r.slug);
    if (!r.found) { console.log('  NOT FOUND'); return; }
    console.log('TITLE      (' + (r.title || '').length + '):', r.title);
    console.log('SEO TITLE  (' + (r.seoTitle || '').length + '):', r.seoTitle || '(none)');
    console.log('DESC       (' + (r.description || '').length + '):', r.description);
    console.log('SEO DESC   (' + (r.seoDescription || '').length + '):', r.seoDescription || '(none)');
    console.log('KEYWORDS   :', (r.keywords || []).join(', '));
  });

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
