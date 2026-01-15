export function track(event: string, data?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // GA4
  if ((window as any).gtag) {
    (window as any).gtag("event", event, data || {});
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq("track", event, data || {});
  }
}
