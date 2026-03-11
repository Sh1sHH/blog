# CleverSpaceSolutions — SEO Strategy
**Site:** https://cleverspacesolutions.com
**Niche:** Small space organization, studio apartment & home decor
**Audit Skoru:** 41/100 → Hedef: 75/100 (6 ay)
**Birincil Hedef:** Google AdSense onayı → Organik trafik büyümesi

---

## 1. Mevcut Durum

| Metrik | Durum |
|--------|-------|
| Toplam post | 45 |
| 1000w+ (iyi) | 33 |
| 600-999w (geliştir) | 10 |
| <600w (kritik) | 2 |
| AI sızıntısı | ✅ Temizlendi |
| Meta description | ✅ Düzeltildi (33 post) |
| Contact sayfası | ❌ Yok |
| Author page | ❌ Yok |
| İç bağlantı | ❌ Tamamen bozuk |
| Ad unit | ❌ Script var, unit yok |

---

## 2. Hedef Kitle Personaları

### Persona 1: "Küçük Daire Kiracısı"
- 22-35 yaş, şehirde yaşayan kiracı
- 30-60m² studio veya 1+1 daire
- Bütçe: Sınırlı ($50-300 dekor bütçesi)
- Arama niyeti: Pratik, ucuz çözümler
- Platform: Pinterest, Google, TikTok

### Persona 2: "Yeni Ev Sahibi"
- 28-45 yaş, ilk evine taşınan
- Küçük ama kalıcı çözümler arıyor
- Bütçe: Orta ($300-1000)
- Arama niyeti: Uzun vadeli organizasyon
- Platform: Google, YouTube

### Persona 3: "Öğrenci / Yurt Sahibi"
- 18-24 yaş, ilk kez bağımsız yaşam
- Minimum mobilya, maximum işlevsellik
- Arama niyeti: Hızlı, kolay çözümler
- Platform: Pinterest, TikTok, Google

---

## 3. Keyword Stratejisi

### Pillar Keywords (Ana Konu Kümeleri)

#### Cluster 1: Studio Apartment
| Keyword | Aylık Arama | Mevcut Post | Durum |
|---------|-------------|-------------|-------|
| how to decorate a studio apartment | 40.000+ | 5 post | Cannibalized |
| studio apartment ideas | 30.000+ | — | Pillar gerekli |
| studio apartment layout ideas | 10.000+ | 1 post | Güçlendir |
| studio apartment storage ideas | 8.000+ | — | Yaz |
| studio apartment on a budget | 6.000+ | — | Yaz |

#### Cluster 2: Small Kitchen
| Keyword | Aylık Arama | Mevcut Post | Durum |
|---------|-------------|-------------|-------|
| small kitchen ideas | 60.000+ | 6 post | Cannibalized |
| small kitchen organization | 20.000+ | — | Pillar gerekli |
| small kitchen storage ideas | 12.000+ | — | Yaz |
| how to make a small kitchen look bigger | 8.000+ | — | Yaz |
| kitchen organization on a budget | 5.000+ | — | Yaz |

#### Cluster 3: Small Bedroom
| Keyword | Aylık Arama | Mevcut Post | Durum |
|---------|-------------|-------------|-------|
| small bedroom ideas | 50.000+ | 2 post | Genişlet |
| small bedroom storage ideas | 15.000+ | — | Yaz |
| small bedroom layout ideas | 10.000+ | — | Yaz |
| bedroom organization tips | 8.000+ | — | Yaz |

#### Cluster 4: Small Bathroom
| Keyword | Aylık Arama | Mevcut Post | Durum |
|---------|-------------|-------------|-------|
| small bathroom ideas | 45.000+ | 2 post | Pillar + redirect |
| small bathroom storage ideas | 18.000+ | — | Yaz |
| small bathroom decor | 12.000+ | — | Redirect mevcut |

#### Cluster 5: Balcony & Outdoor
| Keyword | Aylık Arama | Mevcut Post | Durum |
|---------|-------------|-------------|-------|
| small balcony ideas | 25.000+ | 3 post | Pillar gerekli |
| balcony garden ideas | 15.000+ | 1 post | Genişlet |
| apartment balcony decor | 8.000+ | — | Yaz |

#### Cluster 6: Home Organization
| Keyword | Aylık Arama | Mevcut Post | Durum |
|---------|-------------|-------------|-------|
| home organization tips | 30.000+ | — | Yaz (pillar) |
| small home organization | 10.000+ | 1 post | Genişlet |
| apartment organization ideas | 8.000+ | — | Yaz |

---

## 4. E-E-A-T İyileştirme Planı

### Mevcut Sorunlar
- Profil fotoğrafı → logo kullanılıyor (güven sorunu)
- Author page yok
- Credentials belirsiz
- Sosyal medya profilleri siteyle bağlantılı değil

### Yapılacaklar

#### About Sayfası Güçlendirme
- Gerçek bir insan fotoğrafı ekle (en azından profesyonel görünen bir stok fotoğraf)
- "7 yıl ev organizasyonu deneyimi" gibi somut credential ekle
- Pinterest/Instagram profilini ekle ve birbirine bağla
- Basın kiti veya "Featured In" bölümü ekle

#### Author Page Oluştur `/about/joesp-h`
Schema markup ile:
```json
{
  "@type": "Person",
  "name": "Joesp H.",
  "url": "https://cleverspacesolutions.com/about",
  "sameAs": ["https://pinterest.com/cleverspacesolutions"],
  "jobTitle": "Home Organization Expert",
  "knowsAbout": ["home organization", "small space decor", "interior design"]
}
```

#### Editorial Standards Sayfası `/about/editorial-policy`
- İçerik nasıl yazılıyor?
- Ürün önerileri nasıl seçiliyor?
- Affiliate disclosure politikası
- Güncelleme politikası

---

## 5. İç Bağlantı Stratejisi

### Mevcut Sorun
Tüm postlar sidebar'da aynı 3 studio apartment postuna bağlıyor.
Hiçbir postta gövde içi (in-content) bağlantı yok.

### Hub-and-Spoke Modeli

#### Hub: Studio Apartment Pillar Post
`/blog/how-to-decorate-a-studio-apartment-an-experts-guide`
← Spoke linkler:
- studio-apartment-hack-10-cloffice-wfh-nook-ideas-that-save-space
- 3-flawless-layouts-for-narrow-rooms-and-5-real-life-studio-solutions
- how-to-decorate-studio-apartment (→ redirect edilecek)
- how-to-layout-a-small-apartment-plans-for-studios-narrow-rooms

#### Hub: Small Kitchen Pillar Post
`/blog/how-to-design-small-kitchen`
← Spoke linkler:
- how-to-decorate-small-kitchen
- how-to-make-small-kitchen-functional
- tiny-kitchen-design-guide
- stylish-small-kitchen-ideas
- best-table-for-small-kitchen
- 2025-decorating-tips-for-small-kitchens

#### Hub: Small Bedroom Pillar Post
`/blog/how-to-decorate-small-bedroom-guide`
← Spoke linkler:
- small-bedroom-design-guide
- (yeni post: small bedroom storage ideas)
- (yeni post: small bedroom layout ideas)

#### Hub: Small Bathroom Pillar Post
`/blog/how-can-you-decorate-a-small-bathroom-14-expert-ideas`
← Spoke linkler:
- small-bathroom-decor-ideas (→ redirect veya merge)

### Acil İç Bağlantı Çiftleri (hemen eklenecek)

| Post | Eklenecek Bağlantı |
|------|-------------------|
| tiny-home-phenomenon-guide | → tiny-home-shed-conversion-guide |
| how-to-make-small-home-functional | → how-to-decorate-small-home-guide |
| jute-rugs-guide | → rugs-for-small-rooms |
| outdoor-lighting-ideas-garden-balcony | → small-balcony-garden-ideas |
| how-to-decorate-small-bedroom-guide | → small-bedroom-design-guide |
| how-to-design-small-kitchen | → best-table-for-small-kitchen |
| how-to-choose-mini-fridge | → how-to-design-small-kitchen |

---

## 6. Cannibalization Çözüm Planı

### Studio Apartment (5 post → 2 post)
| Post | Aksiyon |
|------|---------|
| how-to-decorate-a-studio-apartment-an-experts-guide | ✅ KORU — pillar |
| 3-flawless-layouts-for-narrow-rooms... | ✅ KORU — farklı odak (layout) |
| how-to-decorate-studio-apartment (912w) | 🔄 301 → experts-guide |
| how-do-you-decorate-a-studio-apartment-studio-apartment-ideas | 🔄 MERGE → experts-guide'a ekle |
| the-art-of-studio-living-guide | ✅ KORU — felsefi/lifestyle odak |

### Small Kitchen (6 post → 3 post)
| Post | Aksiyon |
|------|---------|
| how-to-design-small-kitchen | ✅ KORU — pillar |
| how-to-decorate-small-kitchen (935w) | ✅ KORU — farklı odak (dekor) |
| how-to-make-small-kitchen-functional (512w) | 🔄 MERGE → how-to-design-small-kitchen |
| stylish-small-kitchen-ideas (635w) | 🔄 MERGE → how-to-decorate-small-kitchen |
| 2025-decorating-tips-for-small-kitchens | ✅ KORU — güncel tips odağı |
| tiny-kitchen-design-guide | ✅ KORU — çok küçük mutfak odağı |

### Small Bathroom (2 post → 1 pillar)
| Post | Aksiyon |
|------|---------|
| how-can-you-decorate-a-small-bathroom-14-expert-ideas | ✅ KORU — pillar |
| small-bathroom-decor-ideas (587w) | 🔄 301 → bathroom pillar |

---

## 7. Schema Markup Geliştirme Planı

### Mevcut (İyi)
- BlogPosting schema her postta ✅
- Organization schema anasayfada ✅
- WebSite schema ✅

### Eksik — Eklenecekler
- **FAQPage schema** — Her posta 3-5 SSS bölümü ekle
- **BreadcrumbList** — Tüm sayfalarda
- **Person schema** — About sayfasında güçlendir
- **HowTo schema** — "How to..." başlıklı postlarda

---

## 8. AdSense Onay Kontrol Listesi

- [ ] Contact sayfası oluştur (`/contact`)
- [ ] About sayfasında gerçek iletişim bilgisi
- [ ] Privacy Policy güncel ve eksiksiz ✅
- [ ] Terms of Service ✅
- [ ] Cookie Policy ✅
- [ ] Tüm postlar 800w+ (2 post hâlâ kısa)
- [ ] AI sızıntısı yok ✅ (Temizlendi)
- [ ] Duplicate content yok (Cannibalization çözülecek)
- [ ] HTTPS ✅
- [ ] Mobile responsive ✅
- [ ] Navigation çalışıyor ✅
- [ ] 404 sayfası var ✅
- [ ] Ad unit yerleştirme (post başı, orta, sonu)
- [ ] Google Analytics aktif ✅
- [ ] Sitemap Google Search Console'a gönderildi

---

## 9. KPI Hedefleri

| Metrik | Şimdi | 3 Ay | 6 Ay | 12 Ay |
|--------|-------|------|------|-------|
| Blog audit skoru | 41/100 | 65/100 | 80/100 | 90/100 |
| Günlük organik ziyaretçi | ? | 100+ | 300+ | 500+ |
| AdSense onayı | ❌ | ✅ | — | — |
| İndeksli post sayısı | 45 | 60 | 80 | 120 |
| 1000w+ post oranı | 73% | 95% | 100% | 100% |
| Pillar post sayısı | 0 | 3 | 6 | 10 |
| İç bağlantı ortalaması | 0 | 5/post | 8/post | 10/post |
