import { slugify } from "./content";

/** Main header navigation: dropdown parents include `items`; plain links use `href`. */
export type HeaderNavDropdown = { label: string; items: readonly string[] };
export type HeaderNavLink = { label: string; href: string };
export type HeaderNavEntry = HeaderNavDropdown | HeaderNavLink;

export function isNavDropdown(e: HeaderNavEntry): e is HeaderNavDropdown {
  return "items" in e;
}

export function headerProductTypeHref(label: string): string {
  return `/products?type=${encodeURIComponent(slugify(label))}`;
}

export const headerNavLeft: readonly HeaderNavEntry[] = [
  {
    label: "Top Selling",
    items: [
      "Mailer Boxes",
      "Packaging Inserts",
      "Packaging Sleeves",
      "Candle Boxes",
      "Shipping Boxes",
      "Kraft Boxes",
    ],
  },
  {
    label: "Book Boxes",
    items: [
      "Candle Boxes",
      "Gift Boxes",
      "Tea Boxes",
      "Mailer Boxes",
      "Candy Boxes",
      "Cannabis Boxes",
      "Coffee Boxes",
      "Kraft Boxes",
      "Cosmetics Boxes",
      "Retail Boxes",
      "Soap Boxes",
      "Shopping Bags",
    ],
  },
  {
    label: "Box Styles",
    items: [
      "Straight Tuck End",
      "Reverse Tuck End",
      "Roll End Boxes",
      "Snap Lock",
      "Auto Bottom Lock",
      "Display Box",
      "Pillow Box",
      "Two Piece Boxes",
      "Five Panel Hang Tab Box",
      "Dispenser Box",
    ],
  },
] as const;

export const headerNavRight: readonly HeaderNavEntry[] = [
  {
    label: "Other Products",
    items: [
      "Labels & Stickers",
      "Business Cards",
      "Flyers",
      "Gift Bags",
      "Stamps",
      "Booklet",
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
