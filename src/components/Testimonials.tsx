import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/content";

function StarsRow() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-[15px] w-[15px] fill-[#ffc107] text-[#ffc107]"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span
      className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center"
      aria-label="Verified customer"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#14bbd3" />
        <path
          d="M8 12l2.5 2.5L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-bocpak mx-auto max-w-[1290px] text-center">
        <p className="font-display text-2xl font-normal text-brand-cyan sm:text-[26px]">
          Testimonials.
        </p>
        <h2 className="mt-2 font-display text-3xl font-normal leading-tight text-[#111] sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
          See what our customers say
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[26px] text-[#6b7280]">
          Don&apos;t let what we say influence you, take it from our customers!
        </p>
        <Link
          href="#"
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-brand-cyan hover:underline"
        >
          See all reviews
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-12 w-full snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-6 px-4 sm:gap-7 sm:px-6 lg:gap-8 lg:px-[max(1rem,calc((100vw-1760px)/2+24px))]">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="group flex min-w-[288px] max-w-[340px] shrink-0 snap-start flex-col rounded-[14px] border border-[#ececec] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] sm:min-w-[320px]"
            >
              <StarsRow />
              <h3 className="mt-4 font-display text-[18px] font-normal leading-snug text-[#111] sm:text-[20px] sm:leading-[26px]">
                {t.title}
              </h3>
              <p className="mt-3 flex-1 text-left text-[14px] leading-[24px] text-[#6b7280]">
                {t.quote}
              </p>
              <footer className="mt-6 flex items-start gap-3 border-t border-[#f0f0f0] pt-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.06]">
                  <Image
                    src={t.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-sans text-[15px] font-semibold text-[#111]">
                      {t.name}
                    </span>
                    <VerifiedBadge />
                  </div>
                  <p className="mt-0.5 font-sans text-[13px] leading-tight text-[#9ca3af]">
                    {t.role}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
