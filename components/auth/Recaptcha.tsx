'use client';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; theme?: string; size?: string }
      ) => void;
      getResponse: () => string;
    };
  }
}

interface RecaptchaProps {
  action: string; // e.g., "register", "login", "reset_password"
  onVerify: (token: string) => void;
  onError?: () => void;
  variant?: 'v3' | 'v2';
}

export default function Recaptcha({ action, onVerify, onError, variant = 'v3' }: RecaptchaProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.grecaptcha) return setLoaded(true);

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${variant === 'v3' ? siteKey : 'explicit'}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, [siteKey, variant]);

  // ─── v3: Auto-generate token ───
  useEffect(() => {
    if (!loaded || variant !== 'v3' || !window.grecaptcha) return;

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(siteKey, { action });
        onVerify(token);
      } catch {
        onError?.();
      }
    });
  }, [loaded, variant, siteKey, action, onVerify, onError]);

  // ─── v2: Render checkbox ───
  useEffect(() => {
    if (!loaded || variant !== 'v2' || !ref.current || !window.grecaptcha) return;

    window.grecaptcha.render(ref.current, {
      sitekey: siteKey,
      theme: 'light',
    });
  }, [loaded, variant, siteKey]);

  if (variant === 'v3') return null;
  return <div ref={ref} className="g-recaptcha" data-sitekey={siteKey} />;
}
