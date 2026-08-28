declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Le3JZ0tAAAAAIwnseCz0GozkK0HEahCdzl8BRCn';

let scriptLoadingPromise: Promise<boolean> | null = null;

/**
 * Ensures Google reCAPTCHA v3 script is loaded.
 */
export function loadRecaptchaScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  if (window.grecaptcha) {
    return Promise.resolve(true);
  }

  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise((resolve) => {
    // Check if script element already exists in DOM
    const existing = document.querySelector(`script[src*="recaptcha/api.js"]`);
    if (existing) {
      if (window.grecaptcha) {
        resolve(true);
      } else {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Google reCAPTCHA v3 script.');
      resolve(false);
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Executes reCAPTCHA v3 for a given action and returns the verification token.
 * 
 * @param action - Action name (e.g. 'valuation_submit', 'contact_submit')
 * @returns Token string or null
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  if (!SITE_KEY) {
    console.warn('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined.');
    return 'test-recaptcha-token';
  }

  try {
    const loaded = await loadRecaptchaScript();
    if (!loaded || !window.grecaptcha) {
      console.warn('Google reCAPTCHA could not be loaded.');
      return 'test-recaptcha-token';
    }

    return await new Promise<string | null>((resolve) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(SITE_KEY, { action });
          resolve(token);
        } catch (err) {
          console.error('reCAPTCHA execution error:', err);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    return null;
  }
}
