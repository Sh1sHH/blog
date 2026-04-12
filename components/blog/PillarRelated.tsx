import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import {
  getPillarForSlug,
  getSiblingsInPillar,
  getPostRole,
} from '@/lib/pillars';

interface PillarRelatedProps {
  currentSlug: string;
}

export default async function PillarRelated({ currentSlug }: PillarRelatedProps) {
  const pillar = getPillarForSlug(currentSlug);
  if (!pillar) return null;

  const role = getPostRole(currentSlug);
  const isPillarPage = role === 'pillar';
  const siblings = getSiblingsInPillar(currentSlug, 6);

  if (siblings.length === 0 && isPillarPage) return null;

  const allPosts = await getAllPosts();
  const postLookup = new Map(allPosts.map((p) => [p.slug, p]));

  const pillarPost = isPillarPage ? null : postLookup.get(pillar.slug);
  const siblingPosts = siblings
    .map((s) => postLookup.get(s.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (!pillarPost && siblingPosts.length === 0) return null;

  return (
    <section
      className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-gray-200"
      aria-labelledby="pillar-related-heading"
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-5 w-5 text-amber-600" aria-hidden="true" />
        <h2
          id="pillar-related-heading"
          className="text-xl md:text-2xl font-bold text-gray-900"
        >
          More from {pillar.name}
        </h2>
      </div>
      <p className="text-sm md:text-base text-gray-600 mb-6">
        {pillar.description}
      </p>

      {pillarPost && (
        <Link
          href={`/blog/${pillarPost.slug}`}
          className="group block mb-6 no-underline bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 md:p-5 hover:border-amber-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Complete Guide
            </span>
            <ArrowRight className="h-3 w-3 text-amber-700 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-800 transition-colors">
            {pillarPost.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {pillarPost.description}
          </p>
        </Link>
      )}

      {siblingPosts.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 list-none p-0 m-0">
          {siblingPosts.map((p) => (
            <li key={p.slug} className="m-0">
              <Link
                href={`/blog/${p.slug}`}
                className="group flex gap-3 items-start p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all no-underline h-full"
              >
                {p.image && (
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {p.readTime} min read
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
