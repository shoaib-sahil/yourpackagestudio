"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { HeaderSearch, MobileDrawerSearch } from "@/components/HeaderSearch";
import { logoIntrinsic, logoSrc } from "@/lib/content";
import { headerNavLeft, headerNavRight, headerProductTypeHref, isNavDropdown } from "@/lib/headerNav";

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  const twoColumn = items.length > 6;
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-0.5 whitespace-nowrap py-2 text-[14px] font-semibold uppercase tracking-[0.02em] text-[#101010]"
        aria-expanded="false"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="h-4 w-4 shrink-0 text-[#7a7a7a] transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div
        className={`pointer-events-none invisible absolute top-full z-[60] pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 ${
          twoColumn ? "w-[min(100vw-2rem,520px)]" : "min-w-[min(100vw-2rem,280px)]"
        } left-1/2 -translate-x-1/2`}
      >
        <div className="relative">
          {/* Caret — points up to parent nav */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[7px] left-1/2 z-[9] block h-0 w-0 -translate-x-1/2 border-x-[8px] border-b-[8px] border-x-transparent border-b-[#e7e7e7]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[6px] left-1/2 z-10 block h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[7px] border-x-transparent border-b-white"
          />

          <div className="max-h-[min(70vh,440px)] overflow-y-auto rounded-lg border border-[#e7e7e7] bg-white shadow-lg">
            <p className="border-b border-[#ececec] px-4 pb-2 pt-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-cyan">
              {label}
            </p>
            <ul
              className={`py-1 text-[13px] font-normal normal-case tracking-normal text-[#444] ${
                twoColumn ? "grid grid-cols-2 gap-x-1" : ""
              }`}
            >
            {items.map((item) => (
              <li key={item}>
                <Link
                  href={headerProductTypeHref(item)}
                  className="group/item relative block px-4 py-2 transition-colors hover:bg-[#f6f6f6] hover:text-[#101010]"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-cyan transition-transform duration-300 ease-out group-hover/item:scale-x-100" />
                  </span>
                </Link>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-[#ececec] bg-[#f6f6f6]">
      <div className="relative flex h-20 items-center justify-between overflow-visible px-4 sm:px-5 xl:h-[100px]">
        <div className="hidden items-center gap-3 text-[#777] xl:flex xl:w-[248px]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d9d9]">
            <Phone className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div className="text-[14px] leading-[1]">
            <p>Need help? Call Us:</p>
            <a href="tel:+1834123456789" className="mt-1 block text-[20px] text-[#111]">
              +1834 123 456 789
            </a>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 xl:hidden">
          <button
            type="button"
            className="rounded-md p-2 text-bocpak-primary"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="inline-flex shrink-0 items-center justify-center leading-none">
            <Image
              src={logoSrc}
              alt="Bocpak"
              width={logoIntrinsic.width}
              height={logoIntrinsic.height}
              className="h-auto w-auto max-h-10 max-w-[152px] object-contain bg-transparent"
              priority
              unoptimized
            />
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex">
          <nav
            className="flex min-w-0 items-center gap-5 text-[14px] font-semibold tracking-[0.02em] text-[#101010]"
            aria-label="Primary"
          >
            {headerNavLeft.map((entry) =>
              isNavDropdown(entry) ? (
                <NavDropdown key={entry.label} label={entry.label} items={entry.items} />
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="flex items-center gap-0.5 whitespace-nowrap py-2 uppercase transition-opacity hover:opacity-75"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          <Link href="/" className="inline-flex shrink-0 items-center justify-center leading-none">
            <Image
              src={logoSrc}
              alt="Bocpak"
              width={350}
              height={93}
              className="h-auto w-auto max-h-25 max-w-[300px] object-contain bg-transparent"
              priority
              unoptimized
            />
          </Link>

          <nav
            className="flex items-center gap-5 text-[14px] font-semibold tracking-[0.02em] text-[#101010]"
            aria-label="Secondary"
          >
            {headerNavRight.map((entry) =>
              isNavDropdown(entry) ? (
                <NavDropdown key={entry.label} label={entry.label} items={entry.items} />
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="whitespace-nowrap py-2 uppercase transition-opacity hover:opacity-75"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="ml-auto flex min-w-0 max-w-[min(200px,46vw)] items-center sm:max-w-[240px] xl:w-[268px] xl:max-w-none xl:justify-end">
          <HeaderSearch />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,360px)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-bocpak-border px-4 py-4">
              <span className="text-lg font-semibold text-bocpak-primary">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-bocpak-border px-4 pb-3 pt-0">
              <p className="mb-2 text-[12px] font-medium uppercase tracking-wide text-[#777]">
                Search
              </p>
              <MobileDrawerSearch onNavigate={() => setOpen(false)} />
            </div>
            <nav className="flex-1 overflow-y-auto p-4 text-bocpak-primary">
              <ul className="space-y-6 text-[15px]">
                {[...headerNavLeft, ...headerNavRight].map((entry) =>
                  isNavDropdown(entry) ? (
                    <li key={entry.label}>
                      <p className="mb-2 font-semibold uppercase tracking-wide text-[#101010]">
                        {entry.label}
                      </p>
                      <ul className="space-y-1.5 border-l-2 border-[#e9eeff] pl-3">
                        {entry.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={headerProductTypeHref(item)}
                              className="font-medium text-bocpak-text hover:text-bocpak-primary"
                              onClick={() => setOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={entry.label}>
                      <Link
                        href={entry.href}
                        className="font-semibold uppercase tracking-wide text-[#101010]"
                        onClick={() => setOpen(false)}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
