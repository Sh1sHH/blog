const path = require('path');
const fs = require('fs');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim();
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

const UPDATES = [
  {
    slug: 'best-space-saving-gifts-for-small-apartments',
    seoTitle: '30 Best Space-Saving Gifts for Small Apartments (2026)',
    seoDescription: 'Shopping for someone in a small space? 30 space-saving gifts for apartments, dorms, and tiny homes — tech, storage, and furniture picks for 2026.',
  },
  {
    slug: '3-flawless-layouts-for-narrow-rooms-and-5-real-life-studio-solutions',
    seoTitle: 'Narrow Room Layouts: 3 Living Room + 5 Studio Plans',
    seoDescription: 'Narrow living room or long studio? 3 fail-proof layouts plus 5 real-life studio solutions to arrange furniture without wasting square footage.',
  },
  {
    slug: 'how-to-create-entryway-in-apartment',
    seoTitle: 'No-Foyer Apartment Entryway: 5 Renter-Friendly Setups',
    seoDescription: '5 damage-free apartment entryway setups for rentals with no foyer. Console tables, floating shelves, bench-and-hooks, and bookshelf mudrooms.',
    description: '5 renter-friendly entryway setups for apartments with no foyer. Console tables, floating shelves, bench-and-hooks, bookshelf mudrooms, and rug-defined entries from $5 to $100.',
  },
  {
    slug: 'how-to-make-candles-at-home-a-beginners-guide',
    seoTitle: 'How to Make Scented Candles at Home: Easy Beginner Guide',
    seoDescription: 'Easy DIY candle tutorial for beginners. Learn how to make scented soy candles at home with step-by-step instructions, materials list, and safety tips.',
  },
  {
    slug: 'how-to-layout-a-small-apartment-plans-for-studios-narrow-rooms',
    seoTitle: 'Small Apartment Layout Ideas: 8 Floor Plans (2026)',
    seoDescription: '8 small apartment floor plans for studios, narrow rooms, and 1-bedroom layouts. Expert furniture placement tips to maximize every square foot.',
  },
  {
    slug: 'how-do-you-decorate-a-studio-apartment-studio-apartment-ideas',
    seoTitle: '20 Studio Apartment Ideas: Decor, Layout and Storage',
    seoDescription: '20 inspired studio apartment ideas for decor, layout, and storage. Real examples and tips to make your small space feel bigger and more organized.',
  },
  {
    slug: 'how-to-choose-the-best-heater-for-a-small-room',
    seoTitle: "Best Space Heater for Small Rooms (2026 Buyer's Guide)",
    seoDescription: 'Find the best space heater for small rooms in 2026. Ceramic vs. infrared vs. oil-filled compared on safety, cost, and energy use. Top picks inside.',
  },
  {
    slug: 'small-bathroom-decor-ideas',
    seoTitle: '10+ Small Bathroom Decor Ideas for Tiny Spaces (2026)',
    seoDescription: '10+ small bathroom decor ideas proven to make tiny spaces feel bigger. Smart storage, paint tricks, lighting, and layout tips for 2026 renovations.',
  },
];

function validate(u) {
  const errs = [];
  if (!u.seoTitle) errs.push('missing seoTitle');
  else if (u.seoTitle.length > 60) errs.push('seoTitle too long: ' + u.seoTitle.length);
  if (!u.seoDescription) errs.push('missing seoDescription');
  else if (u.seoDescription.length > 160) errs.push('seoDescription too long: ' + u.seoDescription.length);
  return errs;
}

(async () => {
  // Pre-validate all
  let hasErrors = false;
  UPDATES.forEach(u => {
    const errs = validate(u);
    if (errs.length) {
      console.error('VALIDATION FAIL:', u.slug, errs);
      hasErrors = true;
    }
  });
  if (hasErrors) { process.exit(1); }

  // Apply
  for (const u of UPDATES) {
    const snap = await db.collection('posts').where('slug', '==', u.slug).limit(1).get();
    if (snap.empty) {
      console.log('SKIP (not found):', u.slug);
      continue;
    }
    const doc = snap.docs[0];
    const updateFields = {
      seoTitle: u.seoTitle,
      seoDescription: u.seoDescription,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    if (u.description) updateFields.description = u.description;

    await db.collection('posts').doc(doc.id).update(updateFields);
    console.log('✓', u.slug, '(title:', u.seoTitle.length + 'c, desc:', u.seoDescription.length + 'c)');
  }

  console.log('\nDone.', UPDATES.length, 'posts updated.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
