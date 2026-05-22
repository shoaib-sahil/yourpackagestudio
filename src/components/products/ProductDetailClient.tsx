"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Send, ArrowRight } from "lucide-react";
import { type ProductItem, slugify } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Field component ───────────────────────────────────────── */
function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#888]">
        {label}{required && <span className="ml-0.5 text-bocpak-gold">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border-0 border-b border-[#d8d8d8] bg-transparent pb-2 pt-1 text-[14px] text-[#111] placeholder:text-[#ccc] focus:border-bocpak-primary focus:outline-none transition-colors";

/* ─── Quote Form ─────────────────────────────────────────────── */
function QuoteForm({ productName }: { productName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", quantity: "",
    length: "", width: "", depth: "",
    material: "", printSize: "", notes: "",
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#f0f7f2] py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-bocpak-primary" strokeWidth={1.5} />
        <p className="text-[17px] font-semibold text-bocpak-primary">Quote request received!</p>
        <p className="max-w-xs text-[14px] leading-relaxed text-[#666]">
          Our team will get back to you within 1 business day with a personalised quote.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-1 text-[13px] text-bocpak-primary underline underline-offset-2 hover:no-underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      <input type="hidden" name="product" value={productName} />
      <div className="grid grid-cols-2 gap-5">
        <Field label="Name" required>
          <input name="name" required value={form.name} onChange={set}
            className={inputCls} placeholder="Your full name" />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required value={form.email} onChange={set}
            className={inputCls} placeholder="you@company.com" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Field label="Phone" required>
          <input name="phone" required value={form.phone} onChange={set}
            className={inputCls} placeholder="+1 (555) 000-0000" />
        </Field>
        <Field label="Quantity" required>
          <input name="quantity" type="number" min="1" required value={form.quantity} onChange={set}
            className={inputCls} placeholder="e.g. 500" />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[["length","L (in.)"],["width","W (in.)"],["depth","D (in.)"]].map(([n,l]) => (
          <Field key={n} label={l}>
            <input name={n} value={form[n as keyof typeof form]} onChange={set}
              className={inputCls} placeholder="0.00" />
          </Field>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Field label="Material">
          <input name="material" value={form.material} onChange={set}
            className={inputCls} placeholder="e.g. Kraft, 380 GSM" />
        </Field>
        <Field label="Print size">
          <input name="printSize" value={form.printSize} onChange={set}
            className={inputCls} placeholder="e.g. 1 side, 4 sides" />
        </Field>
      </div>
      <Field label="Notes / Special requirements">
        <textarea name="notes" rows={3} value={form.notes} onChange={set}
          className="w-full resize-none border-0 border-b border-[#d8d8d8] bg-transparent pb-2 pt-1 text-[14px] text-[#111] placeholder:text-[#ccc] focus:border-bocpak-primary focus:outline-none transition-colors"
          placeholder="Artwork files, special finishes, inserts…" />
      </Field>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-bocpak-primary py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all hover:bg-[var(--e-global-color-primary-hover)] hover:shadow-lg"
      >
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        Submit Quote Request
      </button>
    </form>
  );
}

/* ─── Image Gallery ──────────────────────────────────────────── */
function ImageGallery({ product }: { product: ProductItem }) {
  const images = [product.image, product.image, product.image];
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const mx = e.clientX - cx;
    const my = e.clientY - cy;
    setTilt({
      x: -(my / rect.height) * 14,
      y: (mx / rect.width) * 14,
      active: true,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0, active: false });
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image with 3-D tilt */}
      <div
        className="relative overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-[0_4px_40px_rgba(0,0,0,0.10)] cursor-crosshair"
        style={{
          perspective: "900px",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative aspect-square w-full"
          style={{
            transform: tilt.active
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03,1.03,1.03)`
              : "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
            transition: tilt.active ? "transform 0.08s linear" : "transform 0.5s ease",
            willChange: "transform",
          }}
        >
          <Image
            src={images[active]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
          {/* glare overlay */}
          {tilt.active && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * -2}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
              }}
            />
          )}
        </div>
        {product.hot && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-bocpak-gold px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
            Bestseller
          </span>
        )}
        {product.inStock === false && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-[#555] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
            Made to Order
          </span>
        )}
      </div>

      {/* Horizontal thumbnail strip */}
      <div className="flex gap-2.5">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#f5f5f5] transition-all duration-200 ${
              active === i
                ? "border-bocpak-primary shadow-md"
                : "border-transparent hover:border-bocpak-gold/60"
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" sizes="76px" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Tabs ───────────────────────────────────────────────────── */
const TABS = ["Overview", "Specifications", "FAQ"] as const;

function TabsSection({ product }: { product: ProductItem }) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Overview");

  return (
    <section className="mt-14 overflow-hidden rounded-2xl border border-[#ebebeb] bg-white shadow-sm">
      <div className="flex border-b border-[#ebebeb]">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`relative px-8 py-5 text-[13px] font-bold uppercase tracking-[0.1em] transition-colors ${
              active === tab ? "text-bocpak-primary" : "text-[#999] hover:text-[#444]"
            }`}
          >
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full bg-bocpak-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="p-8 text-[15px] leading-[1.8] text-[#555]">
        {active === "Overview" && (
          <p>
            Our {product.name.toLowerCase()} are engineered to protect your products while making a
            lasting impression. {product.description} Choose from a wide range of sizes, substrates,
            and finishing options — all fully customisable to your brand identity. Perfect for
            e-commerce fulfilment, retail shelves, and gifting.
          </p>
        )}
        {active === "Specifications" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Material", "Corrugated cardboard / Kraft / Custom"],
              ["Print method", "Full-colour digital or offset"],
              ["Finish", "Matte, Gloss, Soft-touch lamination"],
              ["Minimum order", "100 units"],
              ["Lead time", "7–14 business days after art approval"],
              ["Customisation", "Custom sizes, die-cuts & inserts available"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 rounded-xl bg-[#fafafa] px-5 py-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#aaa]">{k}</span>
                <span className="text-[14px] font-medium text-[#222]">{v}</span>
              </div>
            ))}
          </div>
        )}
        {active === "FAQ" && (
          <div className="space-y-6">
            {[
              { q: "What is the minimum order quantity?", a: "Our minimum order is 100 units per design. Volume discounts apply for orders over 500 units." },
              { q: "Can I get a sample before bulk ordering?", a: "Yes! We offer physical samples and digital mock-ups before you commit to a full production run." },
              { q: "How long does production take?", a: "Standard turnaround is 7–14 business days after artwork approval. Rush options are available on request." },
              { q: "Do you provide artwork support?", a: "Absolutely. Our in-house design team can help you create or refine artwork to match your brand perfectly." },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-[#f0f0f0] pb-6 last:border-0 last:pb-0">
                <p className="font-semibold text-[#111]">{q}</p>
                <p className="mt-1.5 text-[#666]">{a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Related Card ───────────────────────────────────────────── */
function RelatedCard({ p }: { p: ProductItem }) {
  const href = `/products/${slugify(p.name)}`;
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
          sizes="(max-width:640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>
      <div className="p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-bocpak-gold">
          {p.category}
        </p>
        <h3 className="text-[14px] font-bold leading-snug text-[#111] line-clamp-2">
          <Link href={href} className="hover:text-bocpak-primary">{p.name}</Link>
        </h3>
        <Link
          href={href}
          className="mt-3 flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.08em] text-bocpak-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          View details <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

/* ─── Main Export ────────────────────────────────────────────── */
export function ProductDetailClient({
  product,
  related,
}: {
  product: ProductItem;
  related: ProductItem[];
}) {
  return (
    <div className="bg-[#fafafa]">
      {/* ── Breadcrumb ── */}
      <motion.div
        className="border-b border-[#ebebeb] bg-white px-5 py-3 lg:px-14"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav className="flex items-center gap-1.5 text-[12px] text-[#aaa]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#555] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-[#555] transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#333]">{product.name}</span>
        </nav>
      </motion.div>

      {/* ── Product hero ── */}
      <div className="mx-auto max-w-[1540px] px-4 py-12 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-20">

          {/* Left: Gallery — slide in from left */}
          <motion.div
            className="lg:sticky lg:top-[108px] lg:self-start"
            initial={{ opacity: 0, x: -56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
          >
            <ImageGallery product={product} />
          </motion.div>

          {/* Right: Info + form — slide in from right */}
          <motion.div
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
          >
            {/* Category pill */}
            <span className="inline-block rounded-full bg-bocpak-primary/8 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-bocpak-primary">
              {product.category}
            </span>

            {/* Title */}
            <motion.h1
              className="mt-3 font-display text-[30px] font-normal leading-[1.2] text-bocpak-primary sm:text-[36px] lg:text-[40px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.28 }}
            >
              {product.name}
            </motion.h1>

            {/* Form card — description sits right above form */}
            <motion.div
              className="mt-6 rounded-2xl border border-[#ebebeb] bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] lg:p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
            >
              {/* Description inside form card */}
              <p className="mb-6 text-[15px] leading-[1.75] text-[#666]">
                {product.description}
              </p>

              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#f0f0f0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#999]">
                  Request a Quote
                </span>
                <div className="h-px flex-1 bg-[#f0f0f0]" />
              </div>
              <QuoteForm productName={product.name} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          <TabsSection product={product} />
        </motion.div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <div className="mb-7 flex items-end justify-between">
              <h2 className="font-display text-[26px] font-normal text-[#111]">
                Related Products
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.1em] text-bocpak-primary hover:underline"
              >
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
              }}
            >
              {related.map((p) => (
                <motion.div
                  key={p.name}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <RelatedCard p={p} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* ── CTA banner ── */}
        <motion.div
          className="relative mt-16 overflow-hidden rounded-3xl px-8 py-14 text-center shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, #374650 0%, #2d3a45 50%, #252f38 100%)",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          {/* decorative rings */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-52 w-52 rounded-full border border-white/5" />

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bocpak-gold">
            Let's build together
          </p>
          <h3 className="mt-3 font-display text-[28px] font-normal leading-snug text-white sm:text-[34px]">
            Need a custom solution?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.7] text-white/70">
            Our packaging specialists are ready to help — from concept to delivery.
            Get a personalised quote in under 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-bocpak-gold px-9 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-lg transition-all hover:bg-[var(--bocpak-accent-gold-hover)] hover:shadow-xl"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
