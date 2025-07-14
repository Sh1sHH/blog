import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Large Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-200 select-none">
            404
          </h1>
          <div className="relative -mt-8">
          
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-600 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. 
            You can return to the homepage or explore our blog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/blog" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Explore Blog
            </Link>
          </Button>
        </div>

        {/* Popular Categories */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            Explore popular categories:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/practical-tips">
                Practical Tips
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/decoration">
                Decoration
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/gift-items">
                Gift Items
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/kitchen">
                Kitchen
              </Link>
            </Button>
          </div>
        </div>

        {/* Error Information */}
        <div className="mt-8 text-xs text-slate-400">
          <p>Error Code: 404 - Page Not Found</p>
        </div>
      </div>
    </div>
  );
} 