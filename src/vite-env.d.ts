/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_FALLBACK_URL?: string;
  readonly VITE_SITE_NAME?: string;
  readonly VITE_SITE_EMAIL?: string;
  readonly VITE_SITE_PHONE?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_ANALYTICS_SCRIPT_URL?: string;
  readonly VITE_ANALYTICS_SITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
