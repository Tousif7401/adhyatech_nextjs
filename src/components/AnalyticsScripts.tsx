"use client";

import Script from "next/script";

interface AnalyticsScriptsProps {
  analytics: boolean;
  marketing: boolean;
}

// Your tracking IDs
const GA_ID = "G-9HYY2ZVZGW";
const META_PIXEL_ID = "1004575129251764";

export default function AnalyticsScripts({
  analytics,
  marketing,
}: AnalyticsScriptsProps) {
  return (
    <>
      {/* Google Analytics */}
      {analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Set default consent state to denied before initialization
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });

              // Initialize GA4
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                cookie_flags: 'samesite=none;secure'
              });

              // Update consent based on user choice
              gtag('consent', 'update', {
                analytics_storage: 'granted'
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Meta Pixel noscript fallback - only loaded with marketing consent */}
      {marketing && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}
    </>
  );
}
