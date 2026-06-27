import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.tsx'
import { initTheme } from './lib/theme'
import './i18n/i18n';

// Initialize theme before rendering the app to prevent flicker
initTheme();

// PostHog is only initialized when the key is present.
// Contributors running locally without the key will have it silently disabled.
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;

// Use the current domain's /ingest proxy in production so PostHog events always route through vercel.json rewrites → us.i.posthog.com.
// This prevents stale env vars ever pointing to the wrong Vercel deployment.
// In local dev fall back to direct PostHog (no proxy needed).
const _isLocalhost = typeof window !== 'undefined' && (
  ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.endsWith('.local')
);
const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  (_isLocalhost ? 'https://us.i.posthog.com' : window.location.origin);

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    // Use a recent configuration snapshot date to ensure modern SDK defaults.
    // See: https://posthog.com/docs/libraries/js#what-is-the-defaults-option
    api_host: POSTHOG_HOST,
    // Loads async — won't block rendering
    loaded: (ph) => {
      // Disable in dev so local sessions don't pollute the dashboard
      if (import.meta.env.DEV) ph.opt_out_capturing();
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>,
)
