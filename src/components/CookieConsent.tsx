"use client";

import { useEffect, useState } from "react";
import AnalyticsScripts from "./AnalyticsScripts";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp?: string;
};

const defaultConsent: Consent = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

// LocalStorage key
const CONSENT_KEY = "adyatech_cookie_consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setConsent({
          ...defaultConsent,
          ...parsed,
        });

        // If consent exists but wasn't explicitly saved with timestamp,
        // show banner after 30 days (consider it expired)
        if (parsed.timestamp) {
          const savedTime = new Date(parsed.timestamp).getTime();
          const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
          const now = Date.now();

          if (now - savedTime > thirtyDaysInMs) {
            setShowBanner(true);
          }
        } else {
          // Old consent format without timestamp - show banner
          setShowBanner(true);
        }
      } catch {
        setConsent(defaultConsent);
        setShowBanner(true);
      }
    } else {
      setConsent(defaultConsent);
      setShowBanner(true);
    }
  }, []);

  // Listen for open-cookie-settings event (from footer button)
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowSettings(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);

    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  // Prevent body scroll when settings modal is open
  useEffect(() => {
    if (showSettings) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSettings]);

  const saveConsent = (newConsent: Consent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithTimestamp));

    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const toggleCategory = (category: keyof Omit<Consent, 'necessary' | 'timestamp'>) => {
    if (consent) {
      setConsent({
        ...consent,
        [category]: !consent[category],
      });
    }
  };

  if (!consent) return null;

  return (
    <>
      <AnalyticsScripts
        analytics={consent.analytics}
        marketing={consent.marketing}
      />

      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="cookie-banner">
          <div className="cookie-banner__inner container">
          <div className="cookie-banner__content">
            <div className="cookie-banner__text">
                <h2 className="cookie-banner__title">Your Privacy Matters</h2>
                <p className="cookie-banner__description">
                  We use cookies to improve your experience, analyse traffic and
                  measure our marketing campaigns. You can choose which cookies you allow.
                </p>
                <a
                  href="/cookies"
                  className="cookie-banner__link"
                >
                  Read Cookie Policy →
                </a>
              </div>
            </div>

            <div className="cookie-banner__actions">
              <button
                onClick={rejectNonEssential}
                className="btn btn--ghost-d btn--sm"
              >
                Reject Non-Essential
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="btn btn--ghost-d btn--sm"
              >
                Manage Preferences
              </button>

              <button
                onClick={acceptAll}
                className="btn btn--red btn--sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div
          className="cookie-settings-overlay"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="cookie-settings-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cookie-settings__header">
              <h2 className="cookie-settings__title">Cookie Preferences</h2>
              <button
                className="cookie-settings__close"
                onClick={() => setShowSettings(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="cookie-settings__body">
              <p className="cookie-settings__intro">
                Choose which types of cookies you want to allow. You can change these preferences at any time.
              </p>

              {/* Necessary - Always Active */}
              <div className="cookie-settings__row">
                <div className="cookie-settings__info">
                  <h3 className="cookie-settings__category">Necessary Cookies</h3>
                  <p className="cookie-settings__desc">
                    Required for the website to function properly.
                  </p>
                </div>
                <div className="cookie-settings__toggle cookie-settings__toggle--disabled">
                  <span className="cookie-settings__status">Always Active</span>
                </div>
              </div>

              {/* Analytics */}
              <div className="cookie-settings__row">
                <div className="cookie-settings__info">
                  <h3 className="cookie-settings__category">Analytics Cookies</h3>
                  <p className="cookie-settings__desc">
                    Helps us understand website traffic through Google Analytics.
                  </p>
                </div>
                <button
                  onClick={() => toggleCategory("analytics")}
                  className={`cookie-settings__toggle cookie-settings__toggle--switch ${
                    consent.analytics ? "cookie-settings__toggle--on" : ""
                  }`}
                  aria-label="Toggle analytics cookies"
                >
                  <span className="cookie-settings__slider" />
                </button>
              </div>

              {/* Marketing */}
              <div className="cookie-settings__row">
                <div className="cookie-settings__info">
                  <h3 className="cookie-settings__category">Marketing Cookies</h3>
                  <p className="cookie-settings__desc">
                    Used to measure advertising campaigns with Meta Pixel.
                  </p>
                </div>
                <button
                  onClick={() => toggleCategory("marketing")}
                  className={`cookie-settings__toggle cookie-settings__toggle--switch ${
                    consent.marketing ? "cookie-settings__toggle--on" : ""
                  }`}
                  aria-label="Toggle marketing cookies"
                >
                  <span className="cookie-settings__slider" />
                </button>
              </div>

              {/* Functional */}
              <div className="cookie-settings__row">
                <div className="cookie-settings__info">
                  <h3 className="cookie-settings__category">Functional Cookies</h3>
                  <p className="cookie-settings__desc">
                    Enables optional website functionality and preferences.
                  </p>
                </div>
                <button
                  onClick={() => toggleCategory("functional")}
                  className={`cookie-settings__toggle cookie-settings__toggle--switch ${
                    consent.functional ? "cookie-settings__toggle--on" : ""
                  }`}
                  aria-label="Toggle functional cookies"
                >
                  <span className="cookie-settings__slider" />
                </button>
              </div>
            </div>

            <div className="cookie-settings__footer">
              <button
                onClick={() => {
                  setShowSettings(false);
                  setShowBanner(true);
                }}
                className="btn btn--ghost-d btn--sm"
              >
                Cancel
              </button>

              <button
                onClick={() => saveConsent(consent)}
                className="btn btn--red btn--sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
