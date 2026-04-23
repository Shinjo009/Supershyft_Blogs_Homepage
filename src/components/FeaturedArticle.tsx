import readArticleArt from '../assets/Read Article.svg'
import type { BlogPost } from '../types/blog'

type Props = {
  post: BlogPost | null
}

export function FeaturedArticle({ post }: Props) {
  return (
    <section className="hi-section" aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="hi-section__title">
        Featured Article
      </h2>
      {!post ? (
        <p className="hi-muted">No articles match this filter yet.</p>
      ) : (
        <article className="hi-featured">
          <a className="hi-featured__media" href={post.href}>
            <img
              src={post.imageUrl}
              alt=""
              decoding="async"
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 900px) 100vw, 640px"
            />
          </a>
          <div className="hi-featured__body">
            <p className="hi-featured__meta-line">
              {post.categoryLabel}{' '}
              <span className="hi-featured__meta-paren">({post.readMinutes} min read)</span>
            </p>
            <h3 className="hi-featured__headline">
              <a href={post.href}>{post.title}</a>
            </h3>
            <p className="hi-featured__excerpt">{post.excerpt}</p>
            <a className="hi-featured__cta" href={post.href}>
              <img className="hi-featured__cta-img" src={readArticleArt} alt="Read article" width={598} height={63} />
            </a>
          </div>
        </article>
      )}
    </section>
  )
}
