import { Metadata } from 'next';
import PaintCalculator from '@/components/tools/PaintCalculator';

export const metadata: Metadata = {
  title: 'Paint Calculator | Free Room Paint Estimator Tool',
  description: 'Calculate how much paint you need for your room. Enter room dimensions, windows, and doors for accurate paint estimation. Free and easy to use paint calculator.',
  keywords: ['paint calculator', 'paint estimator', 'room paint', 'wall paint', 'paint calculation', 'how much paint', 'paint cost'],
  openGraph: {
    title: 'Paint Calculator - CleverSpaceSolutions',
    description: 'Calculate how much paint you need for your room. Free and practical tool for accurate paint estimation.',
    url: 'https://cleverspacesolutions.com/tools/paint-calculator',
    siteName: 'CleverSpaceSolutions',
    images: [
      {
        url: '/images/tools/paint-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Paint Calculator Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Room Paint Calculator',
    description: 'Calculate how much paint you need for your room with accurate estimation.',
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
  "name": "Room Paint Calculator",
  "description": "Free tool to calculate how much paint you need based on your room dimensions",
  "url": "https://cleverspacesolutions.com/tools/paint-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "CleverSpaceSolutions",
    "url": "https://cleverspacesolutions.com"
  },
  "featureList": [
    "Room size calculation",
    "Window and door deduction",
    "Paint coat selection",
    "Different paint types",
    "Cost estimation",
    "PDF report download"
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
      
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
              🎨 Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Room Paint Calculator
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
              Enter your room dimensions and get accurate paint estimates. 
              Include windows and doors for the most precise results.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✅ 100% Free</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">📊 Detailed Calculation</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">💰 Cost Estimation</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">📄 PDF Report</span>
            </div>
          </div>

          {/* Paint Calculator Component */}
          <PaintCalculator />

          {/* SEO Content Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                How to Calculate Paint Amount?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    📐 Basic Calculation
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Wall area = (Length × Height) × 4 walls</li>
                    <li>• Subtract window and door areas</li>
                    <li>• Divide by paint coverage (sq ft/gallon)</li>
                    <li>• Multiply by number of coats</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    🎯 Important Factors
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Wall surface type (drywall, plaster, wood)</li>
                    <li>• Paint type (flat, eggshell, satin, semi-gloss)</li>
                    <li>• Color change situation</li>
                    <li>• Add 10-15% waste allowance</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  💡 Professional Tips
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div>
                    <strong>Paint Selection:</strong>
                    <p>Use flat paint for bedrooms, semi-gloss for kitchens and bathrooms.</p>
                  </div>
                  <div>
                    <strong>Application:</strong>
                    <p>Prime first, then apply two coats of paint for best results.</p>
                  </div>
                  <div>
                    <strong>Cost:</strong>
                    <p>Quality paint is more economical in the long run.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    How accurate is the calculation?
                  </h3>
                  <p className="text-slate-600">
                    Our calculator provides 95% accuracy based on professional standards. 
                    However, surface condition and application technique may affect the final result.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Is waste allowance included?
                  </h3>
                  <p className="text-slate-600">
                    Yes, our calculator automatically adds 15% waste allowance. This covers spills, 
                    touch-ups, and future maintenance needs.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Does it work for different paint types?
                  </h3>
                  <p className="text-slate-600">
                    Yes, you can use it for all interior paint types including latex, acrylic, and oil-based paints. 
                    Coverage rates are automatically adjusted based on paint type.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Does it calculate ceiling paint?
                  </h3>
                  <p className="text-slate-600">
                    Currently, it calculates wall paint only. For ceiling paint, 
                    use the formula: room area (length × width) ÷ paint coverage.
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
