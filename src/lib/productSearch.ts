import type { ProductItem } from "./content";
import { headerNavLeft, headerNavRight, isNavDropdown } from "./headerNav";

export function filterProductsByQuery(list: readonly ProductItem[], q: string): ProductItem[] {
  const t = q.trim().toLowerCase();
  if (!t) return [...list];
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(t) ||
      p.category.toLowerCase().includes(t) ||
      p.description.toLowerCase().includes(t),
  );
}

export type NavSearchLabel = { label: string; group: string };

export function flattenNavSearchLabels(): NavSearchLabel[] {
  const seen = new Set<string>();
  const out: NavSearchLabel[] = [];
  for (const entry of [...headerNavLeft, ...headerNavRight]) {
    if (isNavDropdown(entry)) {
      for (const item of entry.items) {
        if (seen.has(item)) continue;
        seen.add(item);
        out.push({ label: item, group: entry.label });
      }
    }
  }
  return out;
}

export function filterNavLabels(labels: readonly NavSearchLabel[], q: string): NavSearchLabel[] {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return labels.filter((x) => x.label.toLowerCase().includes(t));
}
