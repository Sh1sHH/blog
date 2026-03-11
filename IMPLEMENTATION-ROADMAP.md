# Uygulama Yol Haritası — CleverSpaceSolutions
**Birincil Hedef:** AdSense onayı → Organik trafik büyümesi

---

## HAFTA 1-2: AdSense İçin Kritik Düzeltmeler

### Görev 1: Contact Sayfası Oluştur (2 saat)
**Neden:** AdSense için zorunlu. Olmadan kesinlikle onaylanmazsın.

Oluşturulacak: `/app/contact/page.tsx`
İçerik:
- İletişim formu (isim, email, mesaj)
- Gmail adresi: cleverspacesolutions@gmail.com
- "We typically respond within 24-48 hours"
- Footer ve navigation'a link ekle

### Görev 2: Kırmızı Postları Genişlet (4 saat/post)

**Post 1:** `how-to-make-small-kitchen-functional` (512w → 1200w)
Eklenecek bölümler:
- The 3 Zones Every Small Kitchen Needs (200w)
- 10 Functional Storage Solutions Under $30 (300w)
- Layout Mistakes That Waste Space (200w)
- Before & After: Real Kitchen Transformations (200w)
- FAQ: Top 5 Small Kitchen Questions (150w)

**Post 2:** `small-bathroom-decor-ideas` (587w → 1200w)
Eklenecek bölümler:
- The Small Bathroom Design Principles (200w)
- Storage Solutions That Actually Work (250w)
- Color and Light Tricks for Tiny Bathrooms (200w)
- Budget Makeover Under $100 (200w)
- FAQ: Small Bathroom Questions (150w)

### Görev 3: Sarı Postları Genişlet (öncelik sırası)

1. `how-to-make-small-kitchen-functional` 512w → 1200w (kritik)
2. `small-bathroom-decor-ideas` 587w → 1200w (kritik)
3. `stylish-small-kitchen-ideas` 635w → 1000w
4. `how-to-decorate-one-bedroom-apartment` 651w → 1000w
5. `rugs-for-small-rooms` 687w → 1000w
6. `how-to-host-party-small-outdoor-space` 792w → 1000w
7. `how-to-decorate-windowless-room` 831w → 1000w
8. `small-balcony-garden-ideas` 877w → 1000w
9. `desk-organization-productivity-tips` 910w → 1000w
10. `how-to-decorate-studio-apartment` → 301 yönlendirme

### Görev 4: İlk Ad Unit'leri Yerleştir

Blog post sayfasına (`app/blog/[slug]/page.tsx`) 3 reklam alanı:
1. **Featured image altı** (header sonrası, içerik öncesi)
2. **İçerik ortası** (makale %40-50 noktasında)
3. **İçerik sonu** (tags öncesi)

---

## HAFTA 3-4: Cannibalization ve İç Bağlantı

### 301 Redirect Planı

Next.js `next.config.js`'e eklenecek:
```js
async redirects() {
  return [
    { source: '/blog/how-to-decorate-studio-apartment', destination: '/blog/how-to-decorate-a-studio-apartment-an-experts-guide', permanent: true },
    { source: '/blog/small-bathroom-decor-ideas', destination: '/blog/how-can-you-decorate-a-small-bathroom-14-expert-ideas', permanent: true },
    { source: '/blog/how-to-make-small-kitchen-functional', destination: '/blog/how-to-design-small-kitchen', permanent: true }, // merge sonrası
    { source: '/blog/stylish-small-kitchen-ideas', destination: '/blog/how-to-decorate-small-kitchen', permanent: true }, // merge sonrası
  ]
}
```

### İç Bağlantı Ekleme (firebase-editor ile)

`get-html` ile her postu çek, link ekle, `upload-html` ile yükle:

| Kaynak Post | Hedef Post | Anchor Text |
|-------------|------------|-------------|
| tiny-home-phenomenon-guide | tiny-home-shed-conversion-guide | "convert a shed into a tiny home" |
| how-to-make-small-home-functional | how-to-decorate-small-home-guide | "decorating a small home" |
| jute-rugs-guide | rugs-for-small-rooms | "choosing rugs for small rooms" |
| outdoor-lighting-ideas-garden-balcony | small-balcony-garden-ideas | "balcony garden ideas" |
| how-to-decorate-small-bedroom-guide | small-bedroom-design-guide | "small bedroom design" |
| how-to-design-small-kitchen | best-table-for-small-kitchen | "best table for a small kitchen" |
| how-to-choose-mini-fridge | how-to-design-small-kitchen | "small kitchen design" |
| how-much-paint-do-i-need-a-definitive-guide | tools/paint-calculator | "use our paint calculator" |
| jute-rugs-guide | rugs-for-small-rooms | "small room rug guide" |
| how-to-host-party-small-outdoor-space | small-balcony-garden-ideas | "balcony garden setup" |

---

## AY 2-3: Yeni İçerik ve Pillar Sayfalar

### Pillar Post Listesi (Yaz)

1. **"The Complete Guide to Studio Apartment Living"** (3000w)
   - Slug: `/blog/complete-studio-apartment-guide`
   - Consolidates all studio content
   - Hub post olacak

2. **"Small Kitchen Organization: The Definitive Guide"** (3000w)
   - Slug: `/blog/small-kitchen-organization-guide`
   - Tüm mutfak içeriklerine hub

3. **"Small Space Living: Room-by-Room Guide"** (4000w)
   - Slug: `/blog/small-space-living-guide`
   - Ana pillar — tüm kategorilere bağlanır

### Yeni Post Fikirleri (Ay 2-3)

| # | Başlık | Hedef Keyword | Kelime | Kategori |
|---|--------|---------------|--------|----------|
| 1 | Small Bedroom Storage Ideas: 15 Space-Saving Solutions | small bedroom storage ideas | 1500w | Bedroom |
| 2 | How to Organize a 400 sq ft Apartment | organize small apartment | 1500w | General |
| 3 | Best Furniture for Studio Apartments in 2025 | furniture for studio apartments | 2000w | General |
| 4 | Small Kitchen Storage Ideas That Actually Work | small kitchen storage | 1500w | Kitchen |
| 5 | How to Make a Small Apartment Look Bigger | make apartment look bigger | 1500w | Decoration |
| 6 | Studio Apartment on a Budget: $500 Makeover Guide | studio apartment budget | 2000w | General |
| 7 | Small Closet Organization Ideas | small closet organization | 1500w | Practical Tips |
| 8 | How to Choose the Right Sofa for a Small Living Room | sofa for small living room | 1500w | Living Room |
| 9 | Vertical Storage Ideas for Small Spaces | vertical storage ideas | 1200w | Practical Tips |
| 10 | How to Decorate a Small Nursery on a Budget | small nursery ideas | 1500w | General |

---

## AY 4-6: Otomasyon ve Büyüme

### Sosyal Medya Otomasyonu (Make.com)

**Akış:** Firebase yeni post → Make.com webhook → Pinterest Pin oluştur

Kurulum:
1. Make.com ücretsiz hesap aç
2. Firebase Firestore trigger: yeni post eklendiğinde
3. Pinterest board'a otomatik pin oluştur
4. Instagram için Canva template API bağla

### Zamanlanmış Yayın (Admin Panel)

Admin panele `scheduledAt` alanı ekle:
- Post `publishedAt` gelecek tarih ise `published: false`
- Vercel Cron her saat çalışır, `scheduledAt <= now` olan postları yayınlar

### Sitemap Google Ping

Her yeni post yayınlandığında:
```
GET https://www.google.com/ping?sitemap=https://cleverspacesolutions.com/sitemap.xml
```
API route ile otomatik çalıştır.

---

## AY 7-12: Otorite Oluşturma

### Link Building
- Home decor blog roundup'larına katılım
- Pinterest Idea Pins (SEO değeri var)
- Reddit r/malelivingspace, r/femalelivingspace, r/InteriorDesign'da değer katan cevaplar
- Apartment Therapy, The Spruce'a guest post pitching

### İçerik Genişletme
- Video thumbnail optimizasyonu (YouTube → blog embed)
- Her pillar posta infografik ekle
- "2026 Small Space Trends" gibi yıllık roundup postlar

### Gelir Çeşitlendirmesi
- AdSense (birincil)
- Amazon Associates (home organization ürünleri)
- IKEA affiliate program
- Wayfair, Target affiliate

---

## Öncelik Özeti

| Öncelik | Görev | Süre | Etki |
|---------|-------|------|------|
| 🔴 Kritik | Contact sayfası | 2 saat | AdSense |
| 🔴 Kritik | 2 kısa postu genişlet | 8 saat | AdSense |
| 🔴 Kritik | Ad unit yerleştir | 1 saat | AdSense |
| 🟠 Yüksek | 10 sarı postu genişlet | 20 saat | Kalite |
| 🟠 Yüksek | İç bağlantı ekle | 5 saat | SEO |
| 🟡 Orta | 301 redirect'ler | 1 saat | Cannibalization |
| 🟡 Orta | 3 pillar post yaz | 15 saat | Trafik |
| 🟢 Normal | Make.com otomasyon | 3 saat | Sosyal |
| 🟢 Normal | Scheduled publish | 4 saat | Verimlilik |
