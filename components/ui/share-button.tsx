'use client';

import { useState } from 'react';
import { Share2, Copy, Facebook, Twitter, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
  className?: string;
}

export default function ShareButton({ title, description, url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Share on Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Share on Pinterest
  const shareOnPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`;
    window.open(pinterestUrl, '_blank', 'width=600,height=400');
  };

  // Share on Telegram
  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(telegramUrl, '_blank');
  };

  // Native share API (if available)
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        // User cancelled sharing or error occurred
        console.log('Sharing cancelled');
      }
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        side="bottom"
        sideOffset={8}
        className="w-48 z-50"
      >
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-600" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={shareOnFacebook}>
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareOnTwitter}>
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          Share on Twitter
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareOnWhatsApp}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
          Share on WhatsApp
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareOnPinterest}>
          {/* Pinterest Icon */}
          <svg className="mr-2 h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 384 512">
            <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
          </svg>
          Share on Pinterest
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareOnTelegram}>
          <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
          Share on Telegram
        </DropdownMenuItem>
        
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNativeShare}>
              <Share2 className="mr-2 h-4 w-4" />
              More Options
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 