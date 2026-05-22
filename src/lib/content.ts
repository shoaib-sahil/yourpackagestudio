// Use local hero logo for header + footer (same asset).
export const logoSrc = "/images/hero/logo.png";

/** Convert a product name to a URL-friendly slug. */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export const logoIntrinsic = { width: 692, height: 184 } as const;

export const heroSlides = [
  {
    id: 1,
    bg: "/images/hero/hero-bg-1.png",
  },
  {
    id: 2,
    bg: "/images/hero/hero-bg-2.png",
  },
] as const;

/** Local assets under `public/images/categories/` (mirrors demo cat-01…08). */
export const categories = [
  {
    title: "Custom Coffee Bags",
    count: 2,
    image: "/images/categories/cat-01.jpg",
  },
  {
    title: "Food packaging",
    count: 1,
    image: "/images/categories/cat-02.jpg",
  },
  {
    title: "Coffee cups",
    count: 3,
    image: "/images/categories/cat-03.jpg",
  },
  {
    title: "Stock packaging",
    count: 4,
    image: "/images/categories/cat-04.jpg",
  },
  {
    title: "Tea packaging",
    count: 2,
    image: "/images/categories/cat-05.jpg",
    
  },
  {
    title: "Flexible pouches",
    count: 0,
    image: "/images/categories/cat-06.jpg",
  },
  {
    title: "Water & Juice",
    count: 3,
    image: "/images/categories/cat-07.jpg",
  },
  {
    title: "Pet Treat packaging",
    count: 3,
    image: "/images/categories/cat-08.jpg",
  },
] as const;

/** Side promo banners next to the category grid (local assets). */
export const categorySideBanners = [
  {
    id: "support",
    image: "/images/categories/banner-megamenu-1.jpg",
    bgClass: "bg-[#0086d6]",
  },
  {
    id: "promo",
    image: "/images/categories/banner-megamenu-2.jpg",
    bgClass: "bg-[#ffe000]",
  },
] as const;

export type ProductItem = {
  name: string;
  category: string;
  /** Short excerpt under the title (WooCommerce-style), line-clamped in UI. */
  description: string;
  image: string;
  price: number;
  compareAt?: number;
  salePct?: number;
  rating: number;
  reviews: number;
  cta: "read_more" | "add_to_cart" | "select_options";
  hot?: boolean;
  priceRange?: { min: number; max: number };
  /** Colors available for the sidebar filter */
  colors?: string[];
  /** Sizes available for the sidebar filter */
  sizes?: string[];
  /** Product tags for the sidebar filter */
  tags?: string[];
  /** Whether it's in stock */
  inStock?: boolean;
};

/** Demo product grid copy (matches theme placeholder excerpt). */
const productExcerpt =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat…";

export const products: ProductItem[] = [
  {
    name: "Water & juice Packaging",
    category: "Cosmetic Packaging",
    description: "Custom-printed water and juice pouches with high-barrier film and vibrant full-colour artwork. Ideal for beverages, juices and health drinks.",
    image: "/images/products/product-11-1-460x460.jpg",
    price: 19.67,
    rating: 3.33,
    reviews: 3,
    cta: "read_more",
    colors: ["blue", "white"],
    sizes: ["S", "M", "L"],
    tags: ["Water & Juice", "Flexible Pouches"],
    inStock: true,
  },
  {
    name: "Baby food bags",
    category: "Cosmetic Packaging",
    description: "Food-safe stand-up pouches with resealable zipper, perfect for purées, cereals and snacks. Fully custom printed to your brand.",
    image: "/images/products/product-12-1-460x460.jpg",
    price: 4.9,
    compareAt: 5.6,
    salePct: 13,
    rating: 3.33,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["pink", "white", "yellow"],
    sizes: ["XS", "S", "M"],
    tags: ["Food Packaging", "Stand-up Pouches"],
    inStock: true,
  },
  {
    name: "Taco with meat and vegetables",
    category: "Pet Treat packaging",
    description: "Sturdy flat-bottom pouches with matte lamination and custom artwork. Great for dry pet food, treats and supplements.",
    image: "/images/products/product-13-1-460x460.jpg",
    price: 13.0,
    rating: 4.0,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["brown", "green"],
    sizes: ["M", "L", "XL"],
    tags: ["Pet Treat", "Flat-bottom Pouches"],
    inStock: true,
  },
  {
    name: "Pet food packaging",
    category: "Stock packaging",
    description: "Heavy-duty gusseted bags for bulk pet food. Available in kraft or white polythene with full-colour digital print.",
    image: "/images/products/product-14-1-460x460.jpg",
    price: 100.65,
    rating: 4.0,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["brown", "black", "white"],
    sizes: ["L", "XL", "XXL"],
    tags: ["Pet Treat", "Stock Packaging"],
    inStock: false,
  },
  {
    name: "Gourmet Beef Sosaties Per kg",
    category: "Cosmetic Packaging",
    description: "Premium vacuum-seal pouches with gloss lamination and window cutout — ideal for high-end deli meats and gourmet products.",
    image: "/images/products/product-15-1-460x460.jpg",
    price: 215.2,
    rating: 3.0,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["red", "black"],
    sizes: ["M", "L"],
    tags: ["Food Packaging"],
    inStock: true,
  },
  {
    name: "Frozen Angelfish Per kg",
    category: "Custom Coffee Bags",
    description: "Moisture-barrier frozen-food pouches with peel-and-reseal. Available in clear or fully printed options.",
    image: "/images/products/product-16-1-460x460.jpg",
    price: 11.81,
    rating: 4.33,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["blue", "silver"],
    sizes: ["S", "M", "L"],
    tags: ["Food Packaging", "Flexible Pouches"],
    inStock: true,
  },
  {
    name: "Thinly Sliced Beef Brisket",
    category: "Coffee Cups",
    description: "Deli-style flat pouches with anti-fog window, ideal for showcasing your product in retail settings.",
    image: "/images/products/product-17-1-460x460.jpg",
    price: 12.05,
    compareAt: 18.46,
    salePct: 35,
    rating: 4.0,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["red", "white"],
    sizes: ["XS", "S", "M"],
    tags: ["Food Packaging"],
    inStock: true,
  },
  {
    name: "Ziplock plastic green tea",
    category: "Custom Coffee Bags",
    description: "Resealable ziplock pouches with kraft exterior and inner foil liner. Perfect for loose-leaf teas and coffee grounds.",
    image: "/images/products/product-18-1-460x460.jpg",
    price: 17.65,
    rating: 3.67,
    reviews: 3,
    cta: "add_to_cart",
    colors: ["green", "brown", "white"],
    sizes: ["S", "M", "L"],
    tags: ["Tea Packaging", "Coffee Bags"],
    inStock: true,
  },
  {
    name: "Wrapped Red Cabbage",
    category: "Food packaging",
    description: "Compostable stretch-wrap packaging for fresh produce. Fully printable and suitable for refrigerated shelves.",
    image: "/images/products/product-19-1-460x460.jpg",
    price: 5.5,
    salePct: 11,
    rating: 4.33,
    reviews: 3,
    cta: "select_options",
    priceRange: { min: 5.5, max: 7.0 },
    colors: ["purple", "green"],
    sizes: ["S", "M"],
    tags: ["Food Packaging", "Eco-friendly"],
    inStock: true,
  },
  {
    name: "Sweetcorn 4 Pack",
    category: "Pet Treat packaging",
    description: "Multi-pack tray wrapper with printed sleeve — ideal for fresh produce bundles and promotional packs.",
    image: "/images/products/product-20-1-460x460.jpg",
    price: 16.88,
    rating: 4.33,
    reviews: 3,
    cta: "add_to_cart",
    hot: true,
    colors: ["yellow", "green"],
    sizes: ["S", "M", "L"],
    tags: ["Food Packaging"],
    inStock: true,
  },
];

/**
 * Service cards use the same full-bleed art as Elementor homepage (post-14):
 * `h1-banner03.jpg` … `h1-banner08.jpg` from `wp-content/uploads/2024/05/`.
 * Background positions match `elementor/css/post-14.css`.
 */
export const services = [
  {
    title: "Structural Engineering",
    excerpt:
      "Our packaging experts design and engineer innovative structures tailored to your product and branding.",
    bullets: [
      "Consultation Packaging Strategy",
      "Structural Engineering",
      "Packaging & Artwork Design",
    ],
    image: "/images/services/h1-banner03.jpg",
    bgPosition: "top right" as const,
    span: 2 as const,
    bulletCheck: "pink" as const,
  },
  {
    title: "Digital Printing",
    excerpt:
      "Custom printed packages help attract the attention of customers, tell them everything they need to know about your brand with a single glance.",
    bullets: [] as string[],
    image: "/images/services/h1-banner04.jpg",
    bgPosition: "top center" as const,
    span: 1 as const,
    bulletCheck: "none" as const,
  },
  {
    title: "Custom Printed Bags",
    excerpt:
      "Packaging is an incredibly important identity asset, which can have enormous brand building capabilities. Make it unique with a customised design.",
    bullets: [] as string[],
    image: "/images/services/h1-banner05.jpg",
    bgPosition: "top center" as const,
    span: 1 as const,
    bulletCheck: "none" as const,
  },
  {
    title: "Custom Mailer Box",
    excerpt:
      "Our custom coffee mailer boxes are the perfect solution to engage customers and protect your roasted coffee during shipping.",
    bullets: [] as string[],
    image: "/images/services/h1-banner06.jpg",
    bgPosition: "top right" as const,
    span: 1 as const,
    bulletCheck: "none" as const,
  },
  {
    title: "Custom Roll Stock",
    excerpt:
      "Our fully customisable roll stock features high-quality images and a design that keeps even the smallest details crisp and crystal clear.",
    bullets: [] as string[],
    image: "/images/services/h1-banner07.jpg",
    bgPosition: "top center" as const,
    span: 1 as const,
    bulletCheck: "none" as const,
  },
  {
    title: "Samples & Prototyping",
    excerpt:
      "Create physical samples and 3D interactive prototypes final product packaging before making a final decision.",
    bullets: [
      "Smart material applications",
      "Structure and size validation",
      "Stringent proofing & color matching",
    ],
    image: "/images/services/h1-banner08.jpg",
    bgPosition: "top center" as const,
    span: 2 as const,
    bulletCheck: "cyan" as const,
  },
] as const;

export const featureIcons = [
  {
    title: "Eco-Friendly Packaging",
    text: "Sustainable technology and processes. Reusable and 100% recyclable bags.",
  },
  {
    title: "Fully Customisable",
    text: "Our packaging can be customised to include essential information, such as origin, processing methods...",
  },
  {
    title: "Worldwide Delivery",
    text: "We can provide your business with affordable packaging with hermetic technology.",
  },
  {
    title: "Creative Design",
    text: "Packaging design ideas along with tips on how to make your product stand out.",
  },
] as const;

export type TestimonialItem = {
  title: string;
  quote: string;
  name: string;
  role: string;
  /** Local avatar from demo `review-01.jpg` … `review-06.jpg` (order matches homepage slider). */
  avatar: string;
};

export const testimonials: TestimonialItem[] = [
  {
    title: "Great quality of products",
    quote:
      "Great products, attention to detail, service and quality. The variety of products and variances of products offered is pretty big as well so you will definitely be able to find the right product for you!",
    name: "Christopher Feran",
    role: "Assistant Manager",
    avatar: "/images/testimonials/review-06.jpg",
  },
  {
    title: "Great quality of products",
    quote:
      "Great expertise, innovation and quality focused. The team at Bocpak are really supportive and efficient, providing excellent solutions and quality packaging.",
    name: "Rabea Holzfurtner",
    role: "Assistant Manager",
    avatar: "/images/testimonials/review-05.jpg",
  },
  {
    title: "High-quality products",
    quote:
      "High-quality products, accurate production timelines, clear expectations. We’ve had great experiences working with Bocpak and recommend them for custom packaging needs.",
    name: "Allie Stauss",
    role: "Co-General Manager",
    avatar: "/images/testimonials/review-04.jpg",
  },
  {
    title: "Good quality materials & high…",
    quote:
      "I worked with Stella for our new packaging and she was incredibly helpful! Samples of the packaging came really fast and the process was overall seamless.",
    name: "Daniel H",
    role: "Co-General Manager",
    avatar: "/images/testimonials/review-03.jpg",
  },
  {
    title: "Amazing products and content",
    quote:
      "Amazing products and content on the entire coffee value chain. looking forward to doing healthy and profitable business with you. Do u make Jutebags?",
    name: "Tonny Butera",
    role: "Co-General Manager",
    avatar: "/images/testimonials/review-02.jpg",
  },
  {
    title: "Amazing products and content",
    quote:
      "Amazing products and content on the entire coffee value chain. looking forward to doing healthy and profitable business with you. Do u make Jutebags?",
    name: "Aaron Probert",
    role: "Co-General Manager",
    avatar: "/images/testimonials/review-01.jpg",
  },
];

export const marqueeItems = [
  "FAST EXPRESS DELIVERY",
  "CUSTOM PRINTED PACKAGING",
  "SAVE ON QUALITY PRINTING",
  "SUBSCRIBE AND GET DISCOUNT",
] as const;

/** From `bocpak-raw.html` / Elementor post-14.css (elementor-element-2e6d1b1): right = h1-banner12, left = h1-banner13 */
export const businessCtaImage = "/images/business-cta/h1-banner12.jpg";
export const businessCtaLeftBg = "/images/business-cta/h1-banner13.jpg";
