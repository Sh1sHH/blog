# Blog Otomasyon Akışı — CleverSpaceSolutions

Her yeni blog yazısı için sırayla uygula.

---

## Adım 1: Yazıyı Yaz

```bash
# /blog-write skill'ini çağır (Claude'a söyle):
/blog-write
```

**Çıktı:** `{slug}-content.html` (proje kök dizininde)

Yazı kuralları (`references/site-rules.md`):
- 1. şahıs anlatım ("I've found", "in my experience")
- Em-dash yok (`—` veya `--` sıfır olmalı)
- Clean HTML çıktı (frontmatter yok, markdown yok)
- Görseller `[IMAGE: açıklama — keywords: "terimler"]` marker ile
- İç linkler gerçek `/blog/` URL'leriyle
- AI cümleleri yok (dive into, game-changer, seamlessly...)

---

## Adım 2: Blog Görsellerini Üret

```bash
node scripts/generate-blog-images.js {slug}-content.html
```

**Ne yapar:** `[IMAGE:]` markerlarını Gemini AI ile üretir, Cloudinary'e yükler, HTML'i günceller.

**Çıktı:** Dosyadaki `[IMAGE:]` markerları `<figure><img src="cloudinary-url"></figure>` ile değişir.

---

## Adım 3: Firebase'e Yükle (Yeni Post)

```bash
node scripts/create-post.js {slug} \
  --title "Post başlığı" \
  --description "Meta description — 120-160 karakter" \
  --category "Decoration" \
  --tags "tag1,tag2,tag3" \
  --keywords "keyword1,keyword2,keyword3"
```

**Kategoriler:** General, Decoration, Practical Tips, Kitchen, Bathroom, Living Room, Bedroom, Office, Balcony, Gift Items

**Opsiyonel flagler:**
- `--seo-title "..."` → ayrı SEO başlığı (yoksa title kullanılır)
- `--seo-desc "..."` → ayrı SEO açıklaması (yoksa description kullanılır)
- `--image "https://..."` → kapak görseli (yoksa içerikten otomatik alır)
- `--author "..."` → yazar (varsayılan: Joesp H.)
- `--draft` → yayınlamadan taslak kaydet

**Mevcut postu güncellemek için:**
```bash
node scripts/firebase-editor.js upload-html {slug}
```

---

## Adım 4: Pinterest Pin Oluştur

```bash
node scripts/generate-pins.js {slug}
```

**Ne yapar:** Gemini AI ile 1000×1500 pin görseli üretir, Cloudinary'e yükler, Firebase'i günceller.

---

## Adım 2.5: Görsel SEO Düzeltmeleri (generate sonrası)

`generate-blog-images.js` çalıştıktan sonra HTML dosyasında şunları kontrol et:

### İlk görsel — LCP optimizasyonu
```html
<!-- YANLIŞ (lazy ilk görsel LCP'yi kötüleştirir) -->
<img src="..." loading="lazy" ... />

<!-- DOĞRU -->
<img src="..." fetchpriority="high" ... />
```

### Tüm görseller — width/height ve tam alt text
```html
<!-- YANLIŞ (CLS riski + truncated alt) -->
<img src="..." alt="Compact armchair, tall narrow bookshelf filled with " loading="lazy" style="width:100%;height:auto;" />

<!-- DOĞRU -->
<img src="..." alt="Compact armchair beside a tall narrow bookshelf in a cozy reading corner" width="1200" height="800" loading="lazy" style="width:100%;height:auto;" />
```

**Kurallar:**
- İlk `<img>`: `loading="lazy"` kaldır, `fetchpriority="high"` ekle
- Tüm `<img>`: `width="1200" height="800"` ekle (generate script 16:9 üretiyor)
- Alt text: tam cümle olmalı, kesilmemeli (generate-blog-images.js bazen 125 karakter ile keser — kontrol et)

> **Not:** `generate-blog-images.js` scripti bu düzeltmeleri otomatik yapacak şekilde güncellenebilir.

---

## Adım 3.5: create-post.js SEO parametreleri

### --title (seoTitle) kuralları
- **Maksimum 60 karakter** (Google ~600px = ~60 char keser)
- H1 başlığından farklı, daha kısa ve keyword-önce yazılabilir
- Örnek: `"Cozy Reading Nook in a Small Apartment: A Simple Setup Guide"` (60 char)

### --description kuralları
- **150-160 karakter** (132 altı kısa, 165 üstü kesilir)
- 1 istatistik içermeli
- Örnek: `"Create a cozy reading nook in a small apartment with no spare room. A chair, lamp, and shelf is all it takes — reading 6 min cuts stress 68%."` (155 char)

---

## Tam Örnek

```bash
# Adım 2
node scripts/generate-blog-images.js cozy-reading-nook-small-apartment-content.html

# Adım 3
node scripts/create-post.js cozy-reading-nook-small-apartment \
  --title "How to Create a Cozy Reading Nook in a Small Apartment" \
  --description "Learn how to build a cozy reading nook in any small apartment with just a corner, chair, and lamp. No spare room needed." \
  --category "Decoration" \
  --tags "reading nook,small apartment,interior design" \
  --keywords "reading nook small apartment,cozy reading corner,apartment reading nook"

# Adım 4
node scripts/generate-pins.js cozy-reading-nook-small-apartment
```

---

## Mevcut Kuyruk

Bkz: `BLOG-QUEUE.md`

---

## Yardımcı Scriptler

| Script | Kullanım |
|--------|----------|
| `generate-blog-images.js` | HTML dosyasındaki [IMAGE:] markerlarını işle |
| `create-post.js` | Yeni post oluştur (tüm SEO alanlarıyla) |
| `firebase-editor.js upload-html` | Mevcut postu güncelle |
| `generate-pins.js` | Pinterest pin thumbnail üret |
| `scan-markers.js` | Firebase'deki tüm postlarda kalan marker tara |
| `clean-content-markers.js` | Kalan markerları temizle ve Firebase'e yükle |
