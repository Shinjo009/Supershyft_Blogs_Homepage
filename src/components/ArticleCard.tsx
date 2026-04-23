import type { BlogPost } from '../types/blog'

type Props = {
  post: BlogPost
}

export function ArticleCard({ post }: Props) {
  return (
    <a className="hi-card" href={post.href}>
      <div className="hi-card__media">
        <img src={post.imageUrl} alt="" decoding="async" loading="lazy" sizes="(max-width: 640px) 100vw, 360px" />
      </div>
      <div className="hi-card__body">
        <div className="hi-card__meta">
          <span className="hi-tag hi-tag--sm">{post.categoryLabel}</span>
          <span className="hi-read hi-read--row">
            <img src="/assets/clock.png" width={16} height={16} alt="" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>
        <h3 className="hi-card__title">{post.title}</h3>
        <p className="hi-card__excerpt">{post.excerpt}</p>
        <div className="hi-card__footer">
          <span className="hi-card__byline">
            {post.author}, {post.dateDisplay}
          </span>
        </div>
      </div>
    </a>
  )
}
