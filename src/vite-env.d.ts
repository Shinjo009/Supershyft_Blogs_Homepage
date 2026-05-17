/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WP_API_BASE: string
  readonly VITE_NAV_HOME: string
  readonly VITE_NAV_OUR_TECH: string
  readonly VITE_NAV_OUR_STORY: string
  readonly VITE_NAV_ABOUT: string
  readonly VITE_NAV_CONTACT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
