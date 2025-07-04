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