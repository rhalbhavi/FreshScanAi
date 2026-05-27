import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostHog } from 'posthog-js/react';

/**
 * Listens to React Router route changes and fires a PostHog $pageview event
 * on every navigation. This is required for SPAs since the page never
 * actually reloads between routes.
 */
export default function PostHogPageView() {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture('$pageview', {
      $current_url: window.location.href,
    });
  }, [location, posthog]);

  return null;
}
