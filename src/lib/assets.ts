/** Remote assets from the official Bocpak ThemeForest demo (same origin as the reference template). */
export const DEMO_ORIGIN = "https://demo2.themelexus.com/bocpak";

export function demoUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${DEMO_ORIGIN}${p}`;
}
