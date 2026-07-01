import type { BlogPost } from '../types/blog'
import { ArticleCard } from './ArticleCard'

type Props = {
  posts: BlogPost[]
}

export function AllArticles({ posts }: Props) {
  return (
    <section className="hi-articles" aria-labelledby="articles-heading">
      <h2 id="articles-heading" className="hi-articles__title">
        All Articles
      </h2>
      {posts.length === 0 ? (
        <p className="hi-muted hi-articles__empty">More articles coming soon.</p>
      ) : (
        <div className="hi-articles__grid">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
