# Affiliate Disclosure Component

Bu özellik, blog yazılarında affiliate link bulunduğunda otomatik olarak yasal bilgilendirme mesajı gösterir.

## Özellikler

### 1. Otomatik Algılama
- HTML içeriğinde affiliate platformlarını algılar
- `rel="sponsored"` attribute'unu kontrol eder
- Sadece affiliate link varsa disclosure gösterir

### 2. Yasal Uyumluluk
- FTC (Federal Trade Commission) gerekliliklerine uygun
- Şeffaf ve açık bilgilendirme
- Kullanıcı dostu tasarım

### 3. SEO Faydaları
- Google'ın şeffaflık politikalarına uyum
- Güvenilirlik artışı
- Yasal sorumluluk karşılama

## Desteklenen Affiliate Platformları

- **Amazon**: amazon.com, amazon.co.uk, amazon.de, vb.
- **Kısa Linkler**: amzn.to, bit.ly, tinyurl.com, goo.gl
- **Affiliate Network'ler**: 
  - ShareASale (shareasale.com)
  - Commission Junction (cj.com)
  - LinkShare (linksynergy.com)
  - Ve diğerleri...

## Kullanım

### Otomatik Çalışma
Component otomatik olarak çalışır:

1. Blog yazısı render edilir
2. `hasAffiliateLinks()` fonksiyonu içeriği kontrol eder
3. Affiliate link varsa disclosure gösterilir
4. Yoksa hiçbir şey gösterilmez

### Manuel Kontrol
```typescript
import { hasAffiliateLinks } from '@/lib/utils';

const content = '<a href="https://amazon.com/product">Product</a>';
const hasAffiliate = hasAffiliateLinks(content); // true
```

## Görünüm

### Disclosure Mesajı
```
ℹ️ Affiliate Disclosure

Some links on this page are affiliate links. If you purchase a product 
through these links, I may earn a small commission at no additional cost 
to you. Thank you for your support!
```

### Tasarım Özellikleri
- Amber/sarı renk teması (dikkat çekici ama rahatsız etmeyen)
- Info ikonu ile görsel vurgu
- Responsive tasarım
- Tailwind CSS ile stillendirilmiş

## Konum

Disclosure aşağıdaki yerlerde gösterilir:

1. **Blog Post Sayfası** (`/blog/[slug]`)
   - Görsel ile içerik arasında
   - Sayfa genişliğinde
   - Margin ile ayrılmış

2. **Admin Preview Sayfası** (`/admin/posts/preview/[slug]`)
   - Aynı konum ve stil
   - Test amaçlı

## Teknik Detaylar

### Component Yapısı
```typescript
interface AffiliateDisclosureProps {
  className?: string;
}

export default function AffiliateDisclosure({ className }: AffiliateDisclosureProps)
```

### Algılama Algoritması
```typescript
export function hasAffiliateLinks(htmlContent: string): boolean {
  // 1. Affiliate platform URL'lerini kontrol et
  const hasAffiliateUrl = affiliatePlatforms.some(platform => 
    htmlContent.toLowerCase().includes(platform.toLowerCase())
  );

  // 2. rel="sponsored" attribute'unu kontrol et
  const hasSponsoredRel = /rel\s*=\s*["'][^"']*sponsored[^"']*["']/i.test(htmlContent);

  return hasAffiliateUrl || hasSponsoredRel;
}
```

## Özelleştirme

### Stil Değişiklikleri
Component'e `className` prop'u ile özel stiller eklenebilir:

```tsx
<AffiliateDisclosure className="mb-8 border-2" />
```

### Mesaj Değişiklikleri
`components/ui/affiliate-disclosure.tsx` dosyasında mesaj metni değiştirilebilir.

### Yeni Platform Ekleme
`lib/utils.ts` dosyasındaki `affiliatePlatforms` array'ine yeni platform eklenebilir:

```typescript
const affiliatePlatforms = [
  'amazon.',
  'amzn.to',
  'yeni-platform.com', // Yeni platform
  // ...
];
```

## Test Etme

1. Test blog yazısı oluşturun: `content/posts/affiliate-test-example.md`
2. Amazon veya diğer affiliate linkler ekleyin
3. Blog yazısını görüntüleyin
4. Disclosure'un görünür olduğunu kontrol edin
5. Normal linklerle test edin (disclosure görünmemeli)

## Sorun Giderme

### Disclosure Görünmüyor
- HTML içeriğinde affiliate link var mı kontrol edin
- `hasAffiliateLinks()` fonksiyonu doğru çalışıyor mu test edin
- Console'da hata var mı kontrol edin

### Yanlış Algılama
- Affiliate platform listesini kontrol edin
- Regex pattern'ini test edin
- HTML içeriğinin doğru formatlandığını kontrol edin

### Stil Sorunları
- Tailwind CSS'in yüklendiğinden emin olun
- Responsive breakpoint'leri kontrol edin
- Browser developer tools ile debug edin

## Yasal Notlar

Bu component yasal bilgilendirme amaçlıdır ancak:
- Yerel yasalara uyumluluğu kontrol edin
- Hukuki danışmanlık alın
- Düzenli olarak güncelleyin

## Gelecek Geliştirmeler

1. **Çoklu Dil Desteği**: Türkçe/İngilizce seçenekleri
2. **Özelleştirilebilir Mesajlar**: Admin panelinden düzenleme
3. **Analitik**: Disclosure görüntüleme istatistikleri
4. **A/B Testing**: Farklı mesaj formatları test etme 