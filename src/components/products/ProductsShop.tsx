"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { products, slugify } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── sidebar data ─────────────────────────────────────────── */
const ALL_CATEGORIES = [
  { label: "Coffee Cups", count: 1 },
  { label: "Cosmetic Packaging", count: 3 },
  { label: "Custom Coffee Bags", count: 2 },
  { label: "Food packaging", count: 1 },
  { label: "Pet Treat packaging", count: 3 },
  { label: "Stock packaging", count: 1 },
  { label: "Tea Packaging", count: 1 },
  { label: "Water & Juice", count: 1 },
];

const ALL_COLORS = ["Black", "Blue", "Gray", "Green", "Purple", "Red", "White", "Yellow"];
const COLOR_HEX: Record<string, string> = {
  Black: "#111",
  Blue: "#3b82f6",
  Gray: "#9ca3af",
  Green: "#22c55e",
  Purple: "#a855f7",
  Red: "#ef4444",
  White: "#f3f4f6",
  Yellow: "#facc15",
};
const ALL_SIZES = ["S", "M", "L", "XL", "XXL", "XS"];
const ALL_TAGS = ["Water & Juice", "Flexible Pouches", "Food Packaging", "Stand-up Pouches", "Pet Treat", "Coffee Bags", "Tea Packaging", "Eco-friendly", "Stock Packaging"];
const SORT_OPTIONS = ["Default sorting", "Sort by popularity", "Sort by latest", "Sort by name: A–Z", "Sort by name: Z–A"];

type View = "grid" | "list";

function AccordionSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#e7e7e7] pb-5">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-[#111]"
      >
        {title}
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#777] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

/* ─── grid card ────────────────────────────────────────────── */
function GridCard({ p }: { p: (typeof products)[0] }) {
  const href = `/products/${slugify(p.name)}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white transition-shadow duration-300 hover:shadow-[0px_8px_28px_rgba(0,0,0,0.09)]">
      <Link href={href} className="relative overflow-hidden bg-[#f5f5f5] block">
        <div className="relative aspect-square">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          {p.hot && (
            <span className="absolute left-2 top-2 z-[1] rounded bg-[#ff7043] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Hot</span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 py-4">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-brand-cyan">
          {p.category}
        </p>
        <h3 className="text-[15px] font-bold leading-snug text-[#111] line-clamp-2">
          <Link href={href} className="hover:text-brand-cyan">{p.name}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-[1.6] text-[#777]">
          {p.description}
        </p>
      </div>
    </article>
  );
}

/* ─── list card ────────────────────────────────────────────── */
function ListCard({ p }: { p: (typeof products)[0] }) {
  const href = `/products/${slugify(p.name)}`;
  return (
    <article className="group flex gap-5 overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white p-4 transition-shadow duration-300 hover:shadow-[0px_6px_22px_rgba(0,0,0,0.08)]">
      <Link href={href} className="relative h-[170px] w-[170px] shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5] block">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="170px"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-brand-cyan">
          {p.category}
        </p>
        <h3 className="text-[17px] font-bold leading-snug text-[#111]">
          <Link href={href} className="hover:text-brand-cyan">{p.name}</Link>
        </h3>
        <p className="mt-2 line-clamp-4 text-[14px] leading-[1.65] text-[#555]">
          {p.description}
        </p>
      </div>
    </article>
  );
}

/* ─── main component ───────────────────────────────────────── */
export function ProductsShop() {
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeColors, setActiveColors] = useState<Set<string>>(new Set());
  const [activeSizes, setActiveSizes] = useState<Set<string>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    if (activeColors.size > 0) {
      list = list.filter((p) =>
        p.colors?.some((c) => activeColors.has(c.charAt(0).toUpperCase() + c.slice(1)))
      );
    }
    if (activeSizes.size > 0) {
      list = list.filter((p) => p.sizes?.some((s) => activeSizes.has(s)));
    }
    if (activeTags.size > 0) {
      list = list.filter((p) =>
        p.tags?.some((t) => activeTags.has(t))
      );
    }
    if (sort === "Sort by name: A–Z") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Sort by name: Z–A") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [activeCategory, activeColors, activeSizes, activeTags, sort]);

  function toggleColor(c: string) {
    setActiveColors((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  }
  function toggleSize(s: string) {
    setActiveSizes((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }
  function toggleTag(t: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-[1540px] px-3 py-6 lg:px-6 lg:py-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-4">

        {/* ── SIDEBAR ─────────────────────────────────────── */}
        <motion.aside
          className="w-full shrink-0 rounded-xl border border-[#e7e7e7] bg-white p-5 lg:sticky lg:top-[108px] lg:w-[290px] xl:w-[310px]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
        >

          <AccordionSection title="Product categories">
            <ul className="space-y-2">
              {ALL_CATEGORIES.map((c) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
                    className={`flex w-full items-center justify-between rounded-md px-1 py-1 text-[14px] transition-colors ${
                      activeCategory === c.label
                        ? "font-semibold text-brand-cyan"
                        : "text-[#444] hover:text-brand-cyan"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-[12px] text-[#aaa]">{c.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title="Filter by color">
            <div className="flex flex-wrap gap-2.5">
              {ALL_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  onClick={() => toggleColor(c)}
                  className={`h-7 w-7 rounded-full border-2 transition-all ${
                    activeColors.has(c)
                      ? "border-brand-cyan scale-110 shadow-md"
                      : "border-[#e0e0e0] hover:border-[#bbb]"
                  }`}
                  style={{ backgroundColor: COLOR_HEX[c] }}
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Filter by size">
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`min-w-[36px] rounded border px-2.5 py-1 text-[13px] font-semibold uppercase transition-colors ${
                    activeSizes.has(s)
                      ? "border-brand-cyan bg-brand-cyan text-white"
                      : "border-[#d0d0d0] text-[#555] hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Product tags" defaultOpen={false}>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`rounded border px-2.5 py-1 text-[12px] transition-colors ${
                    activeTags.has(t)
                      ? "border-brand-cyan bg-brand-cyan text-white"
                      : "border-[#e0e0e0] text-[#555] hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </AccordionSection>
        </motion.aside>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-[13px] text-[#777]">
              Showing 1–{filtered.length} of {filtered.length} results
            </p>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-lg border border-[#e0e0e0] bg-white py-1.5 pl-3 pr-8 text-[13px] text-[#444] focus:outline-none focus:ring-1 focus:ring-brand-cyan"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
              </div>
              {/* View toggle */}
              <div className="flex rounded-lg border border-[#e0e0e0] bg-white overflow-hidden">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={`p-2 transition-colors ${view === "grid" ? "bg-brand-cyan text-white" : "text-[#777] hover:text-brand-cyan"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={`p-2 transition-colors ${view === "list" ? "bg-brand-cyan text-white" : "text-[#777] hover:text-brand-cyan"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <motion.div
              className="rounded-xl border border-[#e7e7e7] bg-white py-20 text-center text-[#777]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              No products match your filters.
            </motion.div>
          ) : view === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
              }}
            >
              {filtered.map((p) => (
                <motion.div
                  key={p.name}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <GridCard p={p} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="flex flex-col gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
              }}
            >
              {filtered.map((p) => (
                <motion.div
                  key={p.name}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.52, ease: EASE }}
                >
                  <ListCard p={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
