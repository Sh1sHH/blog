# CleverSpaceSolutions Admin Authentication Kurulumu

Bu dosya CleverSpaceSolutions admin paneli için Firebase Authentication kurulum talimatlarını içerir.

## Firebase Console Ayarları

### 1. Authentication'ı Etkinleştir

1. [Firebase Console](https://console.firebase.google.com/) açın
2. `cleverspacesolutions` projesini seçin
3. Sol menüden **Authentication** seçin
4. **Get started** butonuna tıklayın

### 2. Email/Password Provider'ı Etkinleştir

1. Authentication sayfasında **Sign-in method** sekmesine geçin
2. **Email/Password** satırına tıklayın
3. **Enable** toggle'ını açın
4. **Save** butonuna tıklayın

### 3. Admin Kullanıcıları Oluştur

#### Yöntem 1: Firebase Console'dan Manuel Oluşturma
1. **Users** sekmesine geçin
2. **Add user** butonuna tıklayın
3. Admin email adresini girin: `admin@cleverspacesolutions.com`
4. Güçlü bir şifre oluşturun
5. **Add user** butonuna tıklayın

#### Yöntem 2: Kod ile Oluşturma (Test Amaçlı)
```javascript
// Bu kodu sadece bir kez çalıştırın ve sonra silin
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';

const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'admin@cleverspacesolutions.com', 
      'GüçlüŞifre123!'
    );
    console.log('Admin kullanıcı oluşturuldu:', userCredential.user.email);
  } catch (error) {
    console.error('Hata:', error);
  }
};
```

## Güvenlik Ayarları

### Admin Email Listesi
`lib/auth.ts` dosyasında admin email listesi tanımlı:

```typescript
const ADMIN_EMAILS = [
  'admin@cleverspacesolutions.com',
  'nish@cleverspacesolutions.com',
  // Yeni admin emailler buraya eklenebilir
];
```

### Yeni Admin Ekleme
1. `lib/auth.ts` dosyasını açın
2. `ADMIN_EMAILS` dizisine yeni email ekleyin
3. Firebase Console'dan o email ile kullanıcı oluşturun

## Kullanım

### Admin Girişi
- URL: `http://localhost:3000/admin/login`
- Sadece `ADMIN_EMAILS` listesindeki emailler giriş yapabilir
- Başarılı girişten sonra `/admin` sayfasına yönlendirilir

### Çıkış Yapma
- Admin header'daki kullanıcı menüsünden "Çıkış Yap" seçeneği
- Otomatik olarak login sayfasına yönlendirilir

### Güvenlik Özellikleri
- ✅ Sadece yetkili emailler giriş yapabilir
- ✅ Giriş durumu tarayıcıda korunur (localStorage)
- ✅ Tüm admin sayfaları authentication guard ile korunur
- ✅ Otomatik yönlendirme (giriş yapmayan kullanıcılar)
- ✅ Güvenli çıkış işlemi

## Hata Giderme

### "auth/invalid-api-key" Hatası
- `.env.local` dosyasının doğru yapılandırıldığından emin olun
- Firebase config değerlerini kontrol edin

### "Yetki Yok" Hatası
- Email adresinin `ADMIN_EMAILS` listesinde olduğundan emin olun
- Firebase Console'da kullanıcının oluşturulduğunu kontrol edin

### Sayfa Yüklenmeme
- `npm run dev` ile development server'ın çalıştığından emin olun
- Browser console'da JavaScript hatalarını kontrol edin

## Geliştirim Notları

- Authentication state React Context ile yönetiliyor
- Tüm admin komponenetleri 'use client' directive kullanıyor
- Firebase Auth persistence localStorage'a ayarlanmış
- Router ile otomatik yönlendirme aktif 