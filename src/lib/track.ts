/**
 * Client-side analytics for therealhelp.com.
 *
 * Tracks contact actions (Call / Book / Email clicks, form views, form
 * submits) and sends them to POST /api/event, which forwards a cleaned,
 * whitelisted copy to the leads Google Sheet (Events tab).
 *
 * The payload is deliberately minimal: page path, UTM params, a partner `ref`,
 * the referrer hostname (never the full URL), and a random session id. No IP
 * address and no user agent are ever recorded.
 */

export type TrackEventName = "cta_click" | "form_view" | "form_submit";
export type TrackAction = "call" | "book" | "email";
export type TrackForm = "hero" | "footer" | "offer";
export type TrackResult = "ok" | "error";

export type TrackEventProps = {
  action?: TrackAction;
  location?: string;
  form?: TrackForm;
  result?: TrackResult;
};

export type Attribution = {
  ref: string;
  utm: {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
  };
  landingPage: string;
  referrer: string;
};

const SESSION_KEY = "rh_sid";
const ATTRIBUTION_KEY = "rh_attribution";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const ATTRIBUTION_PARAM_KEYS = [...UTM_KEYS, "ref"] as const;

let memorySid = "";

function randomId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getSid(): string {
  if (typeof window === "undefined") return memorySid;
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = randomId();
    window.sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    if (!memorySid) memorySid = randomId();
    return memorySid;
  }
}

function emptyAttribution(): Attribution {
  return {
    ref: "",
    utm: {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    },
    landingPage: "/",
    referrer: "",
  };
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseStoredAttribution(raw: string): Attribution {
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const utm = (parsed.utm && typeof parsed.utm === "object" ? parsed.utm : {}) as Record<
    string,
    unknown
  >;
  return {
    ref: asString(parsed.ref),
    utm: {
      utm_source: asString(utm.utm_source),
      utm_medium: asString(utm.utm_medium),
      utm_campaign: asString(utm.utm_campaign),
      utm_content: asString(utm.utm_content),
      utm_term: asString(utm.utm_term),
    },
    landingPage: asString(parsed.landingPage) || "/",
    referrer: asString(parsed.referrer),
  };
}

/**
 * Capture attribution on page load (call once from main.tsx) so a lead or
 * event submitted on any later page still carries the original campaign.
 *
 * - The UTM params and partner `ref` are last-touch: they are written only
 *   when the current URL carries at least one of them, and that overwrites any
 *   value saved earlier (e.g. clicking through to /pricing?utm_source=x).
 * - `landingPage` and `referrer` are first-touch: recorded once, from the page
 *   the visitor first landed on, and never overwritten.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);

    let existing: Attribution | null = null;
    try {
      const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
      if (stored) existing = parseStoredAttribution(stored);
    } catch {
      existing = null;
    }

    const attribution = existing ?? emptyAttribution();

    if (ATTRIBUTION_PARAM_KEYS.some((key) => url.searchParams.has(key))) {
      for (const key of UTM_KEYS) {
        attribution.utm[key] = (url.searchParams.get(key) ?? "").trim();
      }
      attribution.ref = (url.searchParams.get("ref") ?? "").trim();
    }

    if (!existing) {
      attribution.landingPage = url.pathname || "/";
      attribution.referrer = document.referrer || "";
    }

    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Storage unavailable; attribution degrades to per-page defaults.
  }
}

/**
 * Read the attribution captured by captureAttribution(). Never falls back to
 * the current URL, so a lead on a second page still carries the first page's
 * campaign. SSR-safe.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution();
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return parseStoredAttribution(stored);
  } catch {
    // Storage unavailable or corrupt.
  }
  return emptyAttribution();
}

function referrerHost(referrer: string): string {
  if (!referrer) return "";
  try {
    return new URL(referrer).hostname;
  } catch {
    return "";
  }
}

/**
 * Fire an analytics event. Never throws and never blocks the caller, so it is
 * safe to run from a link's onClick without preventDefault — the tel: and
 * cal.com navigations proceed normally.
 */
export function trackEvent(
  name: TrackEventName,
  props: TrackEventProps = {},
): void {
  if (typeof window === "undefined") return;

  try {
    const attribution = getAttribution();
    const payload = {
      name,
      ...props,
      page: window.location.pathname || "/",
      utm_source: attribution.utm.utm_source,
      utm_medium: attribution.utm.utm_medium,
      utm_campaign: attribution.utm.utm_campaign,
      utm_content: attribution.utm.utm_content,
      ref: attribution.ref,
      referrerHost: referrerHost(attribution.referrer),
      sid: getSid(),
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], { type: "text/plain" });

    const beaconed =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/event", blob);

    if (!beaconed) {
      void fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: json,
        keepalive: true,
      });
    }
  } catch {
    // Analytics must never break or delay the user's action.
  }
}
