# 🔥 Firebase Kurulum Rehberi

Bu proje Firebase Firestore kullanarak blog verilerini yönetir.

## 🚀 Kurulum Adımları

### 1. Firebase Projesi Oluşturun
1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" ile yeni proje oluşturun
3. Proje adını girin (örn: `nishsite-blog`)
4. Google Analytics'i isteğe bağlı olarak etkinleştirin

### 2. Web App Ekleyin
1. Project Overview > "Add app" > Web (</>) seçin
2. App nickname verin (örn: `nishsite-web`)
3. "Register app" butonuna tıklayın
4. Firebase SDK snippet'ini kopyalayın

### 3. Firestore Database Oluşturun
1. Sol menüden "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. "Start in test mode" seçin (daha sonra güvenlik kurallarını ayarlayacağız)
4. Server location seçin (yakın bir location)

### 4. Environment Variables Ayarlayın
`.env.local` dosyası oluşturun ve Firebase config bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firestore Security Rules
Development için geçici kurallar (Production'da değiştirilmeli):

```javascript
// Firestore Rules (Firebase Console > Firestore > Rules)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection - read public, write admin only
    match /posts/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Admin auth eklenene kadar
    }
  }
}
```

## 📊 Database Yapısı

### Posts Collection (`/posts`)
```javascript
{
  id: "auto-generated",
  slug: "string",
  title: "string",
  content: "string",
  description: "string",
  category: "string",
  tags: ["array", "of", "strings"],
  featured: boolean,
  published: boolean,
  createdAt: timestamp,
  updatedAt: timestamp,
  author: "string",
  image: "string",
  
  // SEO Fields
  seoTitle: "string",
  seoDescription: "string",
  keywords: ["array", "of", "strings"],
  
  // Stats
  views: number,
  likes: number
}
```

## 🔒 Güvenlik Notları

### Development (Şu anki durum)
- Test mode'da herkes okuyabilir
- Write işlemleri auth gerektiriyor

### Production (Gelecek)
- Admin authentication eklenmeli
- IP kısıtlamaları yapılabilir
- Rate limiting eklenmeli

## 🛠️ Kullanılabilir Fonksiyonlar

```typescript
import { firestoreDB } from '@/lib/firebase-db';

// Tüm postları getir
const posts = await firestoreDB.getAllPosts();

// Published postları getir
const publishedPosts = await firestoreDB.getPublishedPosts();

// Kategoriye göre postları getir
const categoryPosts = await firestoreDB.getPostsByCategory('Kitchen');

// Post oluştur
const result = await firestoreDB.createPost({
  title: 'Yeni Post',
  content: 'İçerik...',
  // ... diğer alanlar
});

// Post güncelle
const updateResult = await firestoreDB.updatePost('post-slug', {
  title: 'Güncellenmiş Başlık'
});

// Post sil
const deleteResult = await firestoreDB.deletePost('post-slug');
```

## 🚀 Migration (Mevcut Markdown'dan)

Mevcut markdown posts'ları Firebase'e migrate etmek için script hazırlandı.
Gerektiğinde çalıştırabilirsiniz.

## 📈 Analytics & Monitoring

Firebase Console'dan:
- Database usage
- Read/Write operations
- Performance monitoring
- Error tracking

takip edilebilir. 