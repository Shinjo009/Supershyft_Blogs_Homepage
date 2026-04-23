import type { BlogCategory, BlogPost } from '../types/blog'

/** Placeholder categories when `VITE_WP_API_BASE=demo`. */
export const DEMO_CATEGORIES: BlogCategory[] = [
  { id: 1, name: 'Metabolic Health', slug: 'metabolic-health' },
  { id: 2, name: 'Nutrition', slug: 'nutrition' },
  { id: 3, name: 'Risk Prediction', slug: 'risk-prediction' },
  { id: 4, name: 'Lifestyle', slug: 'lifestyle' },
  { id: 5, name: 'Research', slug: 'research' },
]

const LIVE_POST: BlogPost = {
  id: 595,
  title: 'Precision Nutrition vs Personalized Nutrition',
  excerpt:
    "What's the Difference – And Why It Matters for Your Health Journey. If you're exploring nutrition options through SuperShyft you may wonder what's the difference between precision nutrition and personalized nutrition?",
  author: 'Super Shyft',
  dateDisplay: 'April 21, 2026',
  readMinutes: 12,
  categoryLabel: 'Nutrition',
  imageUrl: 'https://blogs.supershyft.com/wp-content/uploads/2026/02/nutri.png',
  href: 'https://blogs.supershyft.com/2026/04/21/precision-nutrition-vs-personalized-nutrition/',
}

/** Single real article for offline demo; mirrors live site. */
export const DEMO_POSTS: BlogPost[] = [LIVE_POST]

export function filterDemoByCategory(categoryId: number | null): BlogPost[] {
  if (categoryId == null) {
    return DEMO_POSTS
  }
  const name = DEMO_CATEGORIES.find((c) => c.id === categoryId)?.name ?? 'Article'
  return DEMO_POSTS.map((p, idx) =>
    idx === 0
      ? {
          ...p,
          categoryLabel: name,
        }
      : p,
  )
}
