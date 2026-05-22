"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { products, slugify } from "@/lib/content";

export function Products() {
  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace(/^#/, "");
      if (id.startsWith("product-")) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <section id="products" className="bg-white py-10 lg:py-[60px]">
      <div className="container-bocpak">
        <div className="text-center">
          <p className="font-display text-2xl font-normal text-brand-cyan sm:text-[26px]">
            Products.
          </p>
          <h2 className="mt-2 font-display text-3xl font-normal leading-tight text-[#111] sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Bestselling custom bags
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[26px] text-[#777]">
            See your ideas come to life with our{" "}
            <strong className="font-semibold text-[#111]">custom packaging</strong>{" "}
            solutions.
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-brand-cyan hover:underline"
          >
            See all products
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p, index) => {
            const href = `/products/${slugify(p.name)}`;
            return (
              <article
                key={p.name}
                id={`product-${index}`}
                className="group flex flex-col scroll-mt-28 overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white transition-shadow duration-300 hover:shadow-[0px_8px_28px_rgba(0,0,0,0.08)]"
              >
                <Link href={href} className="relative block p-3 pb-0">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f5f5f5]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    {p.hot && (
                      <span className="absolute left-2 top-2 z-[1] rounded bg-[#ff7043] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Hot
                      </span>
                    )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-brand-cyan">
                    {p.category}
                  </p>
                  <h3 className="font-sans text-[15px] font-bold leading-snug text-[#111]">
                    <Link href={href} className="hover:text-brand-cyan hover:underline">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.6] text-[#777]">
                    {p.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
