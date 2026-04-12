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

(async () => {
  const oldSlug = 'How-to-make-candles-at-home-a-beginners-guide';
  const newSlug = 'how-to-make-candles-at-home-a-beginners-guide';

  const snap = await db.collection('posts').where('slug', '==', oldSlug).limit(1).get();
  if (snap.empty) {
    console.log('Not found:', oldSlug);
    process.exit(1);
  }

  const doc = snap.docs[0];
  console.log('Found doc id:', doc.id);
  console.log('Current slug:', doc.data().slug);

  await db.collection('posts').doc(doc.id).update({
    slug: newSlug,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log('Updated slug to:', newSlug);
  process.exit(0);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
