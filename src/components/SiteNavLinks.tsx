import { getSiteNav, SITE_NAV_ITEMS } from '../lib/siteNav'

type Props = {
  ariaLabel: string
  className?: string
  id?: string
  onLinkClick?: () => void
}

export function SiteNavLinks({ ariaLabel, className = 'hi-nav', id, onLinkClick }: Props) {
  const nav = getSiteNav()

  return (
    <nav className={className} id={id} aria-label={ariaLabel}>
      {SITE_NAV_ITEMS.map((item) => (
        <a
          key={item.hrefKey}
          className="hi-nav__link"
          href={nav[item.hrefKey]}
          onClick={onLinkClick}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
