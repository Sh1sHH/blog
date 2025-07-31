import admin from 'firebase-admin';

// Bu kod, sunucunun her başladığında sadece bir kez çalışır.
if (!admin.apps.length) {
  try {
    // .env.local dosyasındaki bilgileri kullanarak Firebase'i başlatır.
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// Diğer dosyalarda kullanmak için admin yetkilerini dışa aktarır.
export const adminAuth = admin.auth();
export const adminDB = admin.firestore();