import type { BlogPost } from '../types/blog'
import { CardArrowIcon } from './CardArrowIcon'

type Props = {
  post: BlogPost
}

export function ArticleCard({ post }: Props) {
  return (
    <a className="hi-card" href={post.href}>
      <div className="hi-card__media">
        <img src={post.imageUrl} alt="" decoding="async" loading="lazy" sizes="(max-width: 640px) 100vw, 368px" />
      </div>
      <div className="hi-card__body">
        <div className="hi-card__top">
          <div className="hi-card__meta">
            <span>{post.author}</span>
            <span className="hi-card__dot" aria-hidden />
            <span>{post.readMinutes} mins read</span>
          </div>
          <div className="hi-card__title-row">
            <h3 className="hi-card__title">{post.title}</h3>
            <span className="hi-card__arrow" aria-hidden>
              <CardArrowIcon />
            </span>
          </div>
        </div>
        <div className="hi-card__footer">
          <div className="hi-card__tags">
            <span className="hi-card__tag">{post.categoryLabel}</span>
            <span className="hi-card__tag">Health</span>
          </div>
          <time className="hi-card__date" dateTime={post.dateIso}>
            {post.dateDisplay}
          </time>
        </div>
      </div>
    </a>
  )
}
