# CleverSpaceSolutions — Project Instructions

## Pillar & Cluster Mimarisi (SEO Temel)

Site, topical authority için **8 pillar** etrafında organize edilmiştir. Her yeni yazı tam olarak bir pillar'a bağlanmak zorundadır.

**Pillar'lar:**
1. `small-kitchen` → pillar post: `stylish-small-kitchen-ideas`
2. `studio-apartment` → pillar post: `how-to-decorate-studio-apartment`
3. `small-living-room` → pillar post: `how-to-furnish-small-living-room`
4. `small-bedroom` → pillar post: `small-bedroom-design-guide`
5. `small-bathroom` → pillar post: `small-bathroom-decor-ideas`
6. `small-balcony` → pillar post: `small-balcony-garden-ideas`
7. `home-office` → pillar post: `desk-organization-productivity-tips`
8. `tiny-house` → pillar post: `tiny-home-phenomenon-guide`

**Veri katmanı:**
- `data/pillar-map.json` — tüm postların pillar/cluster/supporting atamaları
- `lib/pillars.ts` — helper fonksiyonlar
- `components/blog/PillarRelated.tsx` — her blog sayfasının altında otomatik olarak pillar/kardeş postları render eder (SSG'de çalışır, sıfır runtime maliyet)

**Yeni yazı yazarken ZORUNLU kurallar:**
1. Yeni yazı hangi pillar'a ait karar ver. Pillar post'a içerikte **en az 1 inline link** ver (natural anchor text ile, ilk 3 paragrafın içinde olmalı — SEO ağırlığı en yüksek).
2. Aynı cluster'dan 2-3 kardeş postuna inline link ver (yine natural anchor).
3. Yazı oluşturulup Firebase'e yüklendikten sonra **`data/pillar-map.json`'a yeni slug'ı ekle** (role: "cluster", doğru pillar key'i ile).
4. PillarRelated component otomatik render edeceği için manuel "related posts" bölümü ekleme.

**Pillar post'u expand ederken:**
- Pillar post'ları 2500w+ olmak zorunda. Expand ederken cluster kardeşlerine 3-5 inline link ver — pillar'dan cluster'a link akışı SEO için önemli.

**Zayıf pillar'lar (öncelikle beslenmeli):**
- `small-living-room`: 1 post (sadece pillar), acil cluster yazıları gerek
- `home-office`: 2 post
- `small-bathroom`: 2 post
- `small-balcony`: 3 post

## Blog Yazma Otomasyonu (Adım Adım)

Yeni blog yazısı oluşturma akışı:

1. **BLOG-QUEUE.md'den sıradaki konuyu al** — Durum "⏳ Bekliyor" olan ilk yazıyı seç
2. **`/blog write` ile içerik oluştur** — HTML formatında, site-rules.md kurallarına uygun:
   - Birinci şahıs (I, we, in my experience)
   - Em-dash yasak (— ve -- kullanma)
   - Gerçek kaynaklı istatistikler (tier 1-3 sources)
   - `[IMAGE: description — search terms: "..."]` marker'ları (5-7 adet)
   - TL;DR blockquote, SVG chart, FAQ bölümü
   - Internal linkler gerçek `/blog/slug` URL'lere çözülmüş olmalı
   - Hedef: 3000-4000 kelime
3. **Dosyayı kaydet** — `{slug}-content.html` olarak proje kök dizinine
4. **Kalite kontrolü yap:**
   - `—` ve `--` araması (0 sonuç olmalı, IMAGE marker'lar hariç)
   - `[INTERNAL-LINK:` araması (0 sonuç olmalı, hepsi çözülmüş)
   - Internal link sayısı (5-10 arası)
   - IMAGE marker sayısı (5-7)
   - Kelime sayısı (3000-4000)
   - **SVG chart'larda boş satır olmamalı** — `<svg>` ile `</svg>` arasında hiçbir boş satır (`\n\n`) bulunmamalı. `lib/blog.ts` içeriği `marked()` üzerinden geçiriyor ve boş satır marked'ın HTML bloğunu kapattığını zannetmesine yol açıyor; bunun sonucunda `<rect>`/`<text>` element'leri parçalanıp chart bozuluyor (bkz. kitchen-backsplash bug, 2026-04-12). Yorum satırları (`<!-- -->`) sorun değil, ama yorumun öncesinde/sonrasında boş satır bırakma.
5. **Görselleri üret** — `node scripts/generate-blog-images.js {slug}-content.html`
   - Gemini AI ile görsel üretir, Cloudinary'e yükler
   - IMAGE marker'ları `<figure>` tag'leriyle değiştirir
6. **Firebase'e yükle** — `node scripts/create-post.js {slug} --title "..." --description "..." --category "..." --tags "..." --keywords "..." --seo-title "..." --seo-desc "..."`
   - Description: 120-160 karakter
   - SEO title: 60-65 karakter
   - Kapak görseli otomatik tespit edilir (content'teki ilk img)
7. **Pinterest pin (kapak görseli) üret** — `node scripts/generate-pins.js {slug}`
   - Gemini ile 9:16 dikey görsel üretir
   - 1000x1500 pin template'i oluşturur (gold border, başlık overlay, site URL)
   - Cloudinary'e `pinterest-pins/pin_{slug}` olarak yükler
   - Firebase'deki `image` alanını günceller (bu kapak görseli olur)
8. **Pinterest API ile pin at** — `node scripts/post-to-pinterest.js {slug}`
   - Sandbox: `PINTEREST_SANDBOX=true` (.env.local'da)
   - Production: `PINTEREST_SANDBOX=false`, gerçek board ID ve production token gerekli
   - Pin: Cloudinary'deki pin görseli + blog URL + description + hashtag'ler
9. **BLOG-QUEUE.md güncelle** — Durumu "✅ Yazıldı" olarak değiştir
10. **`data/pillar-map.json`'a yeni post'u ekle** — Doğru pillar'ı seç, role: "cluster" (nadir durumda "supporting"). Pillar guidance için yukarıdaki "Pillar & Cluster Mimarisi" bölümüne bak. Eklemeyi unutursan PillarRelated component yazıyı cluster'a bağlayamaz ve SEO kazancı kaybolur.
11. **Bu dosyaya (CLAUDE.md) yapılanları kaydet** — Aşağıdaki log bölümüne ekle

## Yapılan İşlemler Logu

### 2026-04-11 — Blog #9: kitchen-backsplash-ideas-small-kitchen
- **Konu:** Kitchen Backsplash Ideas for Small Kitchens: Budget-Friendly Designs That Pop
- **Adımlar:**
  1. BLOG-QUEUE.md'den #9 seçildi (cluster verisine dayalı yeni sıra, 40K+ volume)
  2. blog-researcher agent ile 15 istatistik araştırıldı (Houzz 2026, NKBA 2026, Zonda 2025, Angi, Fixr, Census/iPropertyManagement, NAHB, RentCafe, DataIntelo, Stickwoll/HomeGuide)
  3. ~3,467 kelimelik HTML içerik yazıldı (9 H2 bölüm, 12 backsplash fikri, 5 FAQ, 2 SVG chart, 7 IMAGE marker, 9 unique internal link)
  4. Kalite kontrolü geçti (em-dash: 0, çözülmemiş link: 0, IMAGE: 7, internal link: 10)
  5. `generate-blog-images.js` ile 7 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: 7rpzNEQhp7ITZpFxgrve)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1775903958/pinterest-pins/pin_kitchen-backsplash-ideas-small-kitchen.webp
  8. `generate-llms-txt.js` ile llms.txt güncellendi (54 post)
  9. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/kitchen-backsplash-ideas-small-kitchen
- **Durum:** Yayında (Pinterest pin bekliyor)

### 2026-04-07 — Blog #7: multifunctional-furniture-small-apartment
- **Konu:** The Best Multifunctional Furniture for Small Apartments in 2026
- **Adımlar:**
  1. BLOG-QUEUE.md'den #7 seçildi
  2. blog-researcher agent ile 15 istatistik araştırıldı (GMInsights, RentCafe, U.S. Census Bureau, Future Market Insights, Business Research Insights, Robert Half, IMARC Group, Pixie Survey, StorageCafe/SSA, UCLA/Saxbe&Repetti, NAHB, IKEA/Ingka Group, Pinterest Spring Trend Report 2026, iPropertyManagement)
  3. ~4040 kelimelik HTML içerik yazıldı (10 H2 bölüm, 5 FAQ, 2 SVG chart, 7 IMAGE marker, 8 unique internal link)
  4. Kalite kontrolü geçti (em-dash: 0, çözülmemiş link: 0, IMAGE: 7, internal link: 10 instance/8 unique)
  5. `generate-blog-images.js` ile 7 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: sQHH8o8PaNNjyuHQ9wXi)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1775534901/pinterest-pins/pin_multifunctional-furniture-small-apartment.webp
  8. `post-to-pinterest.js` Pinterest API 401 auth hatası (token expired, manuel post gerekli)
  9. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/multifunctional-furniture-small-apartment
- **Durum:** Yayında (Pinterest pin bekliyor)

### 2026-03-21 — Blog #5: small-closet-organization-ideas
- **Konu:** Small Closet Organization Ideas That Actually Work in 2026
- **Adımlar:**
  1. BLOG-QUEUE.md'den #5 seçildi
  2. blog-researcher agent ile 15 istatistik araştırıldı (NAPO, Mordor Intelligence, Business Research Company, ClosetMaid, Pixie Survey, U.S. Census Bureau, RentCafe, Future Market Insights, UCLA/Saxbe&Repetti, Decluttr/NAPO, StorageCafe/SSA, NAHB, Strategic Market Research, Pinterest Predicts, Rawshot.ai)
  3. ~3841 kelimelik HTML içerik yazıldı (10 H2 bölüm, 5 FAQ, 2 SVG chart, 7 IMAGE marker, 9 unique internal link)
  4. Kalite kontrolü geçti (em-dash: 0, çözülmemiş link: 0, IMAGE: 7, internal link: 12 instance/9 unique)
  5. `generate-blog-images.js` ile 7 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: z5oYB8XpHPAHgd7mmV4T)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1774114334/pinterest-pins/pin_small-closet-organization-ideas.webp
  8. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/small-closet-organization-ideas
- **Durum:** Yayında

### 2026-03-19 — Blog #4: how-to-create-entryway-in-apartment
- **Konu:** How to Create a Stylish Entryway When Your Apartment Doesn't Have One
- **Adımlar:**
  1. BLOG-QUEUE.md'den #4 seçildi
  2. blog-researcher agent ile 15 istatistik araştırıldı (RentCafe, Harvard JCHS, iPropertyManagement, Rently, NAR, UCLA/Saxbe&Repetti, Pixie Survey, Redfin, Business Research Company, Mordor Intelligence, Business Research Insights, NAHB, Pinterest Predicts, KURU Footwear)
  3. ~4228 kelimelik HTML içerik yazıldı (5 setup, 10 H2 bölüm, 5 FAQ, 2 SVG chart, 7 IMAGE marker, 11 internal link)
  4. Kalite kontrolü geçti (em-dash: 0, çözülmemiş link: 0, IMAGE: 7, internal link: 11)
  5. `generate-blog-images.js` ile 7 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: lCjfYCbhqcXE5KSqFoVt)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1773886904/pinterest-pins/pin_how-to-create-entryway-in-apartment.webp
  8. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/how-to-create-entryway-in-apartment
- **Durum:** Yayında

### 2026-03-17 — Blog #3: renter-friendly-wall-decor
- **Konu:** 30 Renter-Friendly Wall Decor Ideas for Small Apartments (No Holes, No Damage)
- **Adımlar:**
  1. BLOG-QUEUE.md'den #3 seçildi
  2. blog-researcher agent ile 12 istatistik araştırıldı (Zillow, Lemonade, Rently, Allied Market Research, Data Horizon, Fortune Business Insights, Harvard JCHS, Redfin, iPropertyManagement)
  3. 3563 kelimelik HTML içerik yazıldı (30 fikir, 8 H2 bölüm, 5 FAQ, 2 SVG chart, 6 IMAGE marker, 11 internal link)
  4. Kalite kontrolü geçti (em-dash: 0, çözülmemiş link: 0)
  5. `generate-blog-images.js` ile 6 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: Dh60p19o3fOiPNk3Zp0l)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1773758700/pinterest-pins/pin_renter-friendly-wall-decor.webp
  8. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/renter-friendly-wall-decor
- **Durum:** Yayında

### 2026-03-24 — Blog #6: biophilic-design-small-apartment
- **Konu:** Biophilic Design for Small Apartments: How to Create a Living Green Corner
- **Adımlar:**
  1. BLOG-QUEUE.md'den #6 seçildi
  2. blog-researcher agent ile 14 istatistik araştırıldı (PMC/PLoS ONE, Scientific Reports, Drexel University, Mordor Intelligence, iPropertyManagement, RentCafe, NGA, Gitnux, UF IFAS Extension, Monstera Plant Resource, Green Oasis, Pinterest Predicts 2026)
  3. ~4046 kelimelik HTML içerik yazıldı (10 H2 bölüm, 5 FAQ, 2 SVG chart, 5 IMAGE marker, 8 unique internal link, 7 Pexels görseli)
  4. Kalite kontrolü geçti (em-dash sadece IMAGE marker'larda, çözülmemiş link: 0, IMAGE: 5, internal link: 8 unique)
  5. `generate-blog-images.js` ile 5 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: bxZ7BCsrcCOiRLuRxzWP)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1774315268/pinterest-pins/pin_biophilic-design-small-apartment.webp
  8. `post-to-pinterest.js` ile Pinterest Sandbox API'ye pin atıldı (ID: 1014787728554214207)
  9. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/biophilic-design-small-apartment
- **Durum:** Yayında
- **Pinterest Pin:** 1014787728554214207 (Sandbox)

### 2026-04-08 — Blog #8: apartment-lighting-no-overhead-light
- **Konu:** How to Light an Apartment with No Overhead Lighting (Room-by-Room Guide)
- **Adımlar:**
  1. BLOG-QUEUE.md'den #8 seçildi (yeni eklenen konular arasından ilk)
  2. blog-researcher agent ile 12 istatistik araştırıldı (NEC 210.70(A), APA, PMC/Harvard, EIA RECS 2024, DOE, IES/Super Bright LEDs, Parks Associates, GM Insights)
  3. ~3837 kelimelik HTML içerik yazıldı (9 H2 bölüm, 5 FAQ, 2 SVG chart, 6 IMAGE marker, 9 internal link)
  4. Kalite kontrolü geçti (em-dash: 0, çözülmemiş link: 0, IMAGE: 6, internal link: 9)
  5. `generate-blog-images.js` ile 6 görsel üretildi ve Cloudinary'e yüklendi
  6. `create-post.js` ile Firebase'e yüklendi (ID: QmOHXp25Pvc2pe2GlUsm)
  7. `generate-pins.js` ile Pinterest pin kapak görseli üretildi ve Firebase `image` alanı güncellendi
     - URL: https://res.cloudinary.com/dvmvs8s9t/image/upload/v1775664972/pinterest-pins/pin_apartment-lighting-no-overhead-light.webp
  8. BLOG-QUEUE.md durumu "✅ Yazıldı" olarak güncellendi
- **URL:** /blog/apartment-lighting-no-overhead-light
- **Durum:** Yayında (Pinterest pin bekliyor)

### 2026-03-15 — Blog #2: color-drenching-small-spaces
- Daha önce yazıldı (bu log'dan önce)

### 2026-03-13 — Blog #1: cozy-reading-nook-small-apartment
- Daha önce yazıldı (bu log'dan önce)
