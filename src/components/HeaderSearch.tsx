"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { products, type ProductItem } from "@/lib/content";
import { headerProductTypeHref } from "@/lib/headerNav";
import {
  filterNavLabels,
  filterProductsByQuery,
  flattenNavSearchLabels,
  type NavSearchLabel,
} from "@/lib/productSearch";

const MAX_PRODUCT_ROWS = 8;
const MAX_NAV_ROWS = 6;

const navLabels = flattenNavSearchLabels();

function scrollToProduct(index: number) {
  requestAnimationFrame(() => {
    document.getElementById(`product-${index}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  const trimmed = query.trim();
  const hasMinQuery = trimmed.length >= 1;

  const productMatches = useMemo(() => {
    const filtered = filterProductsByQuery(products, query);
    return filtered.slice(0, MAX_PRODUCT_ROWS);
  }, [query]);

  const navMatches = useMemo(() => {
    return filterNavLabels(navLabels, query).slice(0, MAX_NAV_ROWS);
  }, [query]);

  const productIndices = useMemo(() => {
    const map = new Map<ProductItem, number>();
    products.forEach((p, i) => map.set(p, i));
    return map;
  }, []);

  const showSuggestions = hasMinQuery && dropdownOpen;

  const clearQuery = useCallback(() => {
    setQuery("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!showSuggestions) return;
    function onDocMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showSuggestions]);

  const showProductsEmptyHint =
    hasMinQuery && productMatches.length === 0 && navMatches.length === 0;

  return (
    <div ref={containerRef} className="relative w-full min-w-0 max-w-[280px] lg:max-w-[260px]">
      {/* Static search field — always visible */}
      <div className="flex items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-3 py-2 shadow-sm transition-shadow focus-within:border-[#bbb] focus-within:shadow-md">
        <Search className="h-4 w-4 shrink-0 text-[#999]" aria-hidden />
        <input
          ref={inputRef}
          id={panelId + "-input"}
          type="search"
          value={query}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            setDropdownOpen(v.trim().length >= 1);
          }}
          onFocus={() => {
            if (query.trim().length >= 1) setDropdownOpen(true);
          }}
          placeholder="Search products…"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-[#111] outline-none placeholder:text-[#999] lg:text-[14px]"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-expanded={showSuggestions}
          aria-controls={showSuggestions ? panelId : undefined}
          aria-autocomplete="list"
        />
        {trimmed.length > 0 && (
          <button
            type="button"
            className="shrink-0 rounded-full p-0.5 text-[#777] hover:bg-[#f0f0f0] hover:text-[#111]"
            aria-label="Clear search"
            onClick={clearQuery}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions — only after at least one non-space character */}
      {showSuggestions && (
        <div
          id={panelId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute right-0 top-full z-[70] mt-2 flex max-h-[min(70vh,480px)] w-[min(420px,calc(100vw-1.5rem))] max-w-[420px] flex-col overflow-hidden rounded-xl border border-[#e7e7e7] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2">
            {showProductsEmptyHint && (
              <p className="px-2 py-6 text-center text-[14px] text-[#777]">
                No matches. Try another name or category.
              </p>
            )}

            {productMatches.length > 0 && (
              <div className="mb-3">
                <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                  Products
                </p>
                <ul className="space-y-0.5">
                  {productMatches.map((p) => {
                    const index = productIndices.get(p) ?? 0;
                    return (
                      <li key={p.name} role="option">
                        <Link
                          href={`#product-${index}`}
                          className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[#f6f6f6]"
                          onClick={() => {
                            setDropdownOpen(false);
                            scrollToProduct(index);
                          }}
                        >
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-[#f0f0f0]">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold leading-snug text-[#111]">
                              {p.name}
                            </span>
                            <span className="mt-0.5 line-clamp-1 text-[12px] text-[#777]">
                              {p.category}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {navMatches.length > 0 && (
              <div>
                <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                  Product types
                </p>
                <ul className="space-y-0.5">
                  {navMatches.map((n: NavSearchLabel) => (
                    <li key={`${n.group}-${n.label}`} role="option">
                      <Link
                        href={headerProductTypeHref(n.label)}
                        className="flex flex-col rounded-lg px-2 py-2 transition-colors hover:bg-[#f6f6f6]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="text-[14px] font-medium text-[#111]">{n.label}</span>
                        <span className="text-[12px] text-[#999]">{n.group}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t border-[#ececec] px-3 py-2">
            <Link
              href="#products"
              className="block text-center text-[13px] font-semibold text-brand-cyan hover:underline"
              onClick={() => setDropdownOpen(false)}
            >
              View all products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/** Inline search for the mobile menu drawer */
export function MobileDrawerSearch({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState("");

  const productMatches = useMemo(() => {
    return filterProductsByQuery(products, query).slice(0, 5);
  }, [query]);

  const navMatches = useMemo(() => {
    return filterNavLabels(navLabels, query).slice(0, 4);
  }, [query]);

  const productIndices = useMemo(() => {
    const map = new Map<ProductItem, number>();
    products.forEach((p, i) => map.set(p, i));
    return map;
  }, []);

  const hasMinQuery = query.trim().length >= 1;
  const hasResults = productMatches.length > 0 || navMatches.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 rounded-lg border border-bocpak-border bg-[#fafafa] px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-[#999]" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111] outline-none placeholder:text-[#999]"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {query.trim().length > 0 && (
          <button
            type="button"
            className="shrink-0 rounded p-1 text-[#777]"
            aria-label="Clear"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {hasMinQuery && !hasResults && (
        <p className="text-[13px] text-[#777]">No matches.</p>
      )}

      {hasMinQuery && hasResults && (
        <div className="max-h-48 overflow-y-auto rounded-lg border border-[#ececec] bg-white py-1">
          {productMatches.map((p) => {
            const index = productIndices.get(p) ?? 0;
            return (
              <Link
                key={p.name}
                href={`#product-${index}`}
                className="flex items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#f6f6f6]"
                onClick={() => {
                  onNavigate();
                  scrollToProduct(index);
                }}
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-[#f0f0f0]">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="36px" />
                </span>
                <span className="min-w-0 font-medium text-[#111]">{p.name}</span>
              </Link>
            );
          })}
          {navMatches.map((n) => (
            <Link
              key={`${n.group}-${n.label}`}
              href={headerProductTypeHref(n.label)}
              className="block px-3 py-2 text-[13px] hover:bg-[#f6f6f6]"
              onClick={onNavigate}
            >
              <span className="font-medium text-[#111]">{n.label}</span>
              <span className="ml-1 text-[12px] text-[#999]">({n.group})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
