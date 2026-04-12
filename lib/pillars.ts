import pillarMap from '@/data/pillar-map.json';

export type PostRole = 'pillar' | 'cluster' | 'supporting';

export interface PillarInfo {
  key: string;
  name: string;
  slug: string;
  description: string;
  targetKeywords: string[];
}

export interface PostPillarEntry {
  slug: string;
  pillar: string;
  role: PostRole;
  note?: string;
  tag?: string;
}

interface PillarMapFile {
  pillars: Record<string, Omit<PillarInfo, 'key'>>;
  posts: Record<string, { pillar: string; role: PostRole; note?: string; tag?: string }>;
}

const map = pillarMap as unknown as PillarMapFile;

export function getPillarForSlug(slug: string): PillarInfo | null {
  const entry = map.posts[slug];
  if (!entry) return null;
  const pillar = map.pillars[entry.pillar];
  if (!pillar) return null;
  return { key: entry.pillar, ...pillar };
}

export function getPostRole(slug: string): PostRole | null {
  return map.posts[slug]?.role ?? null;
}

export function getPillarPostSlug(pillarKey: string): string | null {
  return map.pillars[pillarKey]?.slug ?? null;
}

export function getAllPillars(): PillarInfo[] {
  return Object.entries(map.pillars).map(([key, value]) => ({ key, ...value }));
}

/**
 * Return sibling posts in the same pillar, excluding the current slug and the
 * pillar post itself (since it's linked separately). Cluster posts take priority
 * over supporting posts. Seasonal (halloween-tagged) supporting posts are
 * deprioritized unless the current post is also seasonal.
 */
export function getSiblingsInPillar(
  currentSlug: string,
  limit = 5
): PostPillarEntry[] {
  const current = map.posts[currentSlug];
  if (!current) return [];

  const currentIsSeasonal = current.tag === 'seasonal-halloween';
  const pillarSlug = map.pillars[current.pillar]?.slug;

  const all: PostPillarEntry[] = Object.entries(map.posts)
    .filter(([slug, entry]) => {
      if (slug === currentSlug) return false;
      if (slug === pillarSlug) return false;
      if (entry.pillar !== current.pillar) return false;
      if (entry.tag === 'seasonal-halloween' && !currentIsSeasonal) return false;
      return true;
    })
    .map(([slug, entry]) => ({ slug, ...entry }));

  const clusters = all.filter((p) => p.role === 'cluster');
  const supporting = all.filter((p) => p.role === 'supporting');

  return [...clusters, ...supporting].slice(0, limit);
}

export function getPillarPostEntry(pillarKey: string): PostPillarEntry | null {
  const pillar = map.pillars[pillarKey];
  if (!pillar) return null;
  const entry = map.posts[pillar.slug];
  if (!entry) return null;
  return { slug: pillar.slug, ...entry };
}

export function slugHasPillarMapping(slug: string): boolean {
  return slug in map.posts;
}
