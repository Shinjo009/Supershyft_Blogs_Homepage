export const NAV_DEFAULTS = {
  home: 'https://www.supershyft.com/index.html',
  ourTech: 'https://www.supershyft.com/technology.html',
  ourStory: 'https://www.supershyft.com/our-story.html',
  contact: 'https://www.supershyft.com/contact-us.html',
} as const

export const SOCIAL_DEFAULTS = {
  instagram: 'https://www.instagram.com/supershyft?igsh=bjFlZzZsbDdhaTdy',
  linkedin: 'https://www.linkedin.com/company/fitnasticindia/posts/?feedView=all',
} as const

export const SITE_NAV_ITEMS = [
  { label: 'Home', hrefKey: 'home' as const },
  { label: 'Our Tech', hrefKey: 'ourTech' as const },
  { label: 'Our Story', hrefKey: 'ourStory' as const },
  { label: 'Contact Us', hrefKey: 'contact' as const },
] as const

export function getSiteNav() {
  return {
    home: import.meta.env.VITE_NAV_HOME?.trim() || NAV_DEFAULTS.home,
    ourTech: import.meta.env.VITE_NAV_OUR_TECH?.trim() || NAV_DEFAULTS.ourTech,
    ourStory:
      import.meta.env.VITE_NAV_OUR_STORY?.trim() ||
      import.meta.env.VITE_NAV_ABOUT?.trim() ||
      NAV_DEFAULTS.ourStory,
    contact: import.meta.env.VITE_NAV_CONTACT?.trim() || NAV_DEFAULTS.contact,
  }
}

export function getSocialLinks() {
  return {
    instagram: import.meta.env.VITE_FOOTER_INSTAGRAM?.trim() || SOCIAL_DEFAULTS.instagram,
    linkedin: import.meta.env.VITE_FOOTER_LINKEDIN?.trim() || SOCIAL_DEFAULTS.linkedin,
  }
}

/** @deprecated Use SITE_NAV_ITEMS */
export const FOOTER_NAV_ITEMS = SITE_NAV_ITEMS
