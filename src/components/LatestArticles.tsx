import type { BlogPost } from '../types/blog'
import { ArticleCard } from './ArticleCard'

type Props = {
  posts: BlogPost[]
}

export function LatestArticles({ posts }: Props) {
  return (
    <section className="hi-section hi-section--latest" aria-labelledby="latest-heading">
      <h2 id="latest-heading" className="hi-section__title">
        Latest Articles
      </h2>
      {posts.length === 0 ? (
        <p className="hi-muted hi-latest-empty">More articles coming soon.</p>
      ) : (
        <div className="hi-grid">
          {posts.map((p) => (
            <ArticleCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </section>
  )
}
