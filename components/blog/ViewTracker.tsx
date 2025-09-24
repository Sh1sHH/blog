'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
  slug: string;
}

/**
 * Client-side component to track blog post views
 * This runs after page load to increment view count in Firebase
 */
export default function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // Track view after component mounts (client-side only)
    const trackView = async () => {
      try {
        await fetch(`/api/posts/${slug}/views`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    // Small delay to ensure page has loaded
    const timeout = setTimeout(trackView, 1000);
    
    return () => clearTimeout(timeout);
  }, [slug]);

  // This component doesn't render anything
  return null;
}
