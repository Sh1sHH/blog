import { Metadata } from 'next';
import PaintCalculator from '@/components/tools/PaintCalculator';

export const metadata: Metadata = {
  title: 'Oda Boya Miktarı Hesaplayıcı | Ücretsiz Boya Hesaplama Aracı',
  description: 'Odanızın boyutlarına göre kaç litre boya ihtiyacınız olduğunu hesaplayın. Pencere, kapı sayısını da dahil ederek en doğru sonucu alın. Ücretsiz ve kolay kullanım.',
  keywords: ['boya hesaplayıcı', 'boya miktarı', 'oda boyası', 'duvar boyası', 'boya hesaplama', 'kaç litre boya', 'boya maliyeti'],
  openGraph: {
    title: 'Oda Boya Miktarı Hesaplayıcı - CleverSpaceSolutions',
    description: 'Odanızın boyutlarına göre kaç litre boya ihtiyacınız olduğunu hesaplayın. Ücretsiz ve pratik araç.',
    url: 'https://cleverspacesolutions.com/tools/paint-calculator',
    siteName: 'CleverSpaceSolutions',
    images: [
      {
        url: '/images/tools/paint-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Boya Miktarı Hesaplayıcı',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oda Boya Miktarı Hesaplayıcı',
    description: 'Odanızın boyutlarına göre kaç litre boya ihtiyacınız olduğunu hesaplayın.',
    images: ['/images/tools/paint-calculator-og.jpg'],
  },
  alternates: {
    canonical: 'https://cleverspacesolutions.com/tools/paint-calculator',
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Oda Boya Miktarı Hesaplayıcı",
  "description": "Odanızın boyutlarına göre kaç litre boya ihtiyacınız olduğunu hesaplayan ücretsiz araç",
  "url": "https://cleverspacesolutions.com/tools/paint-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "TRY"
  },
  "provider": {
    "@type": "Organization",
    "name": "CleverSpaceSolutions",
    "url": "https://cleverspacesolutions.com"
  },
  "featureList": [
    "Oda boyutu hesaplama",
    "Pencere ve kapı çıkarma",
    "Boya kat sayısı seçimi",
    "Farklı boya türleri",
    "Maliyet tahmini",
    "PDF rapor indirme"
  ]
};

export default function PaintCalculatorPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎨 Oda Boya Miktarı Hesaplayıcı
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Odanızın boyutlarını girin, kaç litre boya ihtiyacınız olduğunu öğrenin. 
              Pencere, kapı sayısını da hesaba katarak en doğru sonucu alın.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✅ Ücretsiz</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">📊 Detaylı Hesaplama</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">💰 Maliyet Tahmini</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">📄 PDF Rapor</span>
            </div>
          </div>

          {/* Paint Calculator Component */}
          <PaintCalculator />

          {/* SEO Content Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Boya Miktarı Nasıl Hesaplanır?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    📐 Temel Hesaplama
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Duvar alanı = (En × Yükseklik) × 4 duvar</li>
                    <li>• Pencere ve kapı alanları çıkarılır</li>
                    <li>• Boya verimi (m²/litre) ile bölünür</li>
                    <li>• Kat sayısı ile çarpılır</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    🎯 Önemli Faktörler
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Duvar yüzeyi türü (sıva, alçı, ahşap)</li>
                    <li>• Boya türü (mat, ipek mat, yarı mat)</li>
                    <li>• Renk değişikliği durumu</li>
                    <li>• %10-15 fire payı eklenmeli</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  💡 Profesyonel İpuçları
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>Boya Seçimi:</strong>
                    <p>Yatak odası için mat, mutfak için yarı mat boya tercih edin.</p>
                  </div>
                  <div>
                    <strong>Uygulama:</strong>
                    <p>İlk kat astar, ikinci kat son kat boya uygulaması idealdir.</p>
                  </div>
                  <div>
                    <strong>Maliyet:</strong>
                    <p>Kaliteli boya uzun vadede daha ekonomiktir.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Sık Sorulan Sorular
              </h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Hesaplama ne kadar doğru?
                  </h3>
                  <p className="text-gray-600">
                    Hesaplayıcımız profesyonel standartlara göre %95 doğruluk oranında sonuç verir. 
                    Ancak yüzey durumu ve uygulama tekniği sonucu etkileyebilir.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Fire payı dahil mi?
                  </h3>
                  <p className="text-gray-600">
                    Evet, hesaplayıcımız otomatik olarak %15 fire payı ekler. Bu, dökülen boya, 
                    ikinci kat ihtiyacı ve gelecekteki rötuşlar için yeterlidir.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Farklı boya türleri için geçerli mi?
                  </h3>
                  <p className="text-gray-600">
                    Evet, akrilik, plastik, yağlı boya gibi tüm iç mekan boyaları için kullanabilirsiniz. 
                    Boya türüne göre verim oranları otomatik ayarlanır.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Tavan boyası da hesaplanıyor mu?
                  </h3>
                  <p className="text-gray-600">
                    Şu anda sadece duvar boyası hesaplanıyor. Tavan boyası için 
                    oda alanı (en × boy) × boya verimi formülünü kullanabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
