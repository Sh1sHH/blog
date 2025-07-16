import { Info } from 'lucide-react';

interface AffiliateDisclosureProps {
  className?: string;
}

/**
 * Affiliate Disclosure Component
 * Satış ortaklığı linklerinin bulunduğu sayfalarda yasal bilgilendirme yapar
 * SEO ve şeffaflık için gereklidir
 */
export default function AffiliateDisclosure({ className = '' }: AffiliateDisclosureProps) {
  return (
    <div className={`p-3 mb-4 ${className}`}>
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-600 leading-relaxed">
          <p className="font-medium mb-1 text-gray-700">Affiliate Disclosure</p>
          <p>
            Some links on this page are affiliate links. If you purchase a product through these links, 
            I may earn a small commission at no additional cost to you. Thank you for your support!
          </p>
        </div>
      </div>
    </div>
  );
} 