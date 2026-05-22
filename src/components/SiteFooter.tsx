"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { logoSrc } from "@/lib/content";

const products = [
  { label: "Mailer Boxes", href: "/products" },
  { label: "Custom Boxes", href: "/products" },
  { label: "Kraft Boxes", href: "/products" },
  { label: "Bubble Mailers", href: "/products" },
  { label: "Shipping Boxes", href: "/products" },
] as const;

const company = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
] as const;

const contactInfo = {
  email: "info@yourpackage.studio",
  phone: "+1834 123 456 789",
  address: "123 Main St, Anytown, USA",
} as const;

const brandDescription =
  "Premium custom packaging for small businesses. Quality boxes, fast turnaround, and design support that helps your brand stand out.";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.354 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.971 1.172-4.971s-.299-.599-.299-1.484c0-1.388.806-2.425 1.809-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.807 1.481 1.807 1.777 0 3.144-1.874 3.144-4.579 0-2.396-1.722-4.068-4.177-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01-.029.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.956-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 pb-2.5 border-b border-[#c8cfe0] font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#222]">
      {children}
    </h3>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { readonly label: string; readonly href: string }[];
}) {
  return (
    <div className="min-w-0">
      <ColHeading>{title}</ColHeading>
      <ul className="space-y-2.5">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="font-sans text-[14px] font-normal leading-snug text-[#555] transition-colors hover:text-bocpak-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden text-bocpak-text"
      style={{ backgroundColor: "var(--bocpak-footer-bg)" }}
    >
      {/* subtle tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 0%, rgba(30,51,40,0.05), transparent 55%)",
        }}
      />

      {/* ─── Main content ─── */}
      <div className=" mx-20  max-w-[1440px]  pb-4 pt-14 sm:px-8  ">

        
        <div className="lg:flex lg:items-start lg:gap-0">

          {/* ── Brand panel ── */}
          <div className="mb-10 lg:mb-0 lg:w-[300px] lg:shrink-0 lg:pr-10 xl:w-[400px] xl:pr-12">
            <a href="/" className="block mb-4 relative right-[110px]" >
              <img
                src={logoSrc}
                alt="Bocpak"
                className="block h-auto w-auto max-h-[93px] max-w-[350px] "
              />
            </a>
            <p className="mb-6 max-w-[270px] font-sans text-[14px] leading-[1.7] text-[#555]">
              {brandDescription}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#222]">
                Follow us:
              </span>
              {(
                [
                  { href: "#", label: "Facebook", El: (p: { className?: string }) => <Facebook {...p} strokeWidth={1.75} /> },
                  { href: "#", label: "X", El: (p: { className?: string }) => <Twitter {...p} strokeWidth={1.75} /> },
                  { href: "#", label: "Instagram", El: (p: { className?: string }) => <Instagram {...p} strokeWidth={1.75} /> },
                  { href: "#", label: "Pinterest", El: (p: { className?: string }) => <PinterestIcon {...p} /> },
                  { href: "#", label: "Youtube", El: (p: { className?: string }) => <Youtube {...p} strokeWidth={1.75} /> },
                ] as const
              ).map(({ href, label, El }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c8cfe0] bg-white text-[#333] shadow-sm transition-all hover:border-bocpak-primary/40 hover:text-bocpak-primary hover:shadow"
                >
                  <El className="h-[16px] w-[16px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          <div className="hidden lg:block w-px shrink-0 self-stretch bg-[#c8cfe0]/70" />

          {/* ── Link columns ── */}
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 lg:flex-1 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-14 lg:pl-10 xl:pl-14">
            <LinkColumn title="Products" links={products} />
            <LinkColumn title="Company" links={company} />

            <div>
              <ColHeading>Contact Info</ColHeading>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-[2px] h-[15px] w-[15px] shrink-0 text-bocpak-primary/70" strokeWidth={1.75} />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-sans text-[14px] leading-snug text-[#555] underline decoration-[#c8cfe0] underline-offset-2 transition-colors hover:text-bocpak-primary"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-[2px] h-[15px] w-[15px] shrink-0 text-bocpak-primary/70" strokeWidth={1.75} />
                  <a
                    href="tel:+1834123456789"
                    className="font-sans text-[14px] leading-snug text-[#555] underline decoration-[#c8cfe0] underline-offset-2 transition-colors hover:text-bocpak-primary"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-[2px] h-[15px] w-[15px] shrink-0 text-bocpak-primary/70" strokeWidth={1.75} />
                  <span className="font-sans text-[14px] leading-snug text-[#555]">
                    {contactInfo.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <div className="relative border-t border-[#c8cfe0]/80 bg-black/[0.025]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-5 sm:flex-row sm:px-8 lg:px-14 xl:px-20">
          <p className="font-sans text-[13px] text-[#666]">
            © {new Date().getFullYear()} Your Package Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="font-sans text-[13px] text-[#666] transition-colors hover:text-bocpak-primary">
              Privacy Policy
            </Link>
            <span className="text-[#aaa]">·</span>
            <Link href="/terms" className="font-sans text-[13px] text-[#666] transition-colors hover:text-bocpak-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>  

      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition hover:brightness-110"
        style={{ backgroundColor: "var(--bocpak-footer-scroll)" }}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
      </button>
    </footer>
  );
}
