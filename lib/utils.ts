import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * HTML içeriğinde affiliate link olup olmadığını kontrol eder
 * @param htmlContent - Kontrol edilecek HTML içeriği
 * @returns Affiliate link varsa true, yoksa false
 */
export function hasAffiliateLinks(htmlContent: string): boolean {
  // Affiliate platformları listesi
  const affiliatePlatforms = [
    'amazon.',
    'amzn.to',
    'bit.ly',
    'tinyurl.com',
    'goo.gl',
    'ow.ly',
    'clickbank.net',
    'shareasale.com',
    'cj.com',
    'linksynergy.com',
    'anrdoezrs.net',
    'dpbolvw.net',
    'jdoqocy.com',
    'kqzyfj.com',
    'qksrv.net',
    'tkqlhce.com'
  ];

  // HTML içeriğinde affiliate platform linklerini ara
  const hasAffiliateUrl = affiliatePlatforms.some(platform => 
    htmlContent.toLowerCase().includes(platform.toLowerCase())
  );

  // rel="sponsored" attribute'unu ara
  const hasSponsoredRel = /rel\s*=\s*["'][^"']*sponsored[^"']*["']/i.test(htmlContent);

  return hasAffiliateUrl || hasSponsoredRel;
}
