/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WP_API_BASE: string
  readonly VITE_NAV_HOME: string
  readonly VITE_NAV_OUR_TECH: string
  readonly VITE_NAV_OUR_STORY: string
  readonly VITE_NAV_ABOUT: string
  readonly VITE_NAV_CONTACT: string
  readonly VITE_NAV_BLOGS: string
  readonly VITE_NAV_LOGIN: string
  readonly VITE_FOOTER_INSTAGRAM: string
  readonly VITE_FOOTER_LINKEDIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
