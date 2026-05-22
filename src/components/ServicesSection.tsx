import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { services } from "@/lib/content";

const bulletIcon = (variant: "pink" | "cyan") =>
  variant === "pink" ? (
    <svg
      className="mt-0.5 h-[18px] w-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="12" fill="#f472b6" />
      <path
        d="M7 12.5l3 3 7-7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className="mt-0.5 h-[18px] w-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="12" fill="#22d3ee" />
      <path
        d="M7 12.5l3 3 7-7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[#e9eeff] py-16 sm:py-20 lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1690px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-4xl font-display font-bold uppercase tracking-[0.2em] text-brand-cyan">
            Services
          </p>
          <h2 className="mt-3 font-display text-3xl text-[#111827] sm:text-4xl lg:text-[42px] lg:leading-[1.2]">
            Be part of the solution
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[18px] text-[#6b7280]">
            Improve your operational efficiencies, optimize costs and brand
            engagements.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-[#1a56c4] hover:underline"
          >
            See all products
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-[30px] lg:grid-cols-4">
          {services.map((s) => {
            const isWide = s.span === 2;
            const hasBullets = s.bullets.length > 0;

            return (
              <article
                key={s.title}
                className={`group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl shadow-sm sm:min-h-[440px] lg:min-h-[480px] ${
                  isWide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: s.bgPosition,
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col justify-between p-6 pt-[41px] sm:p-8 lg:px-10 lg:pb-10 lg:pt-[41px]">
                  <div>
                    <h3 className="max-w-[300px] font-display text-[28px] font-normal leading-[34px] text-white">
                      {s.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-[345px] font-sans text-[16px] font-normal leading-[26px] text-white ${
                        !isWide
                          ? "pb-[120px] sm:pb-[180px] lg:pb-[210px]"
                          : ""
                      }`}
                    >
                      {s.excerpt}
                    </p>
                    {hasBullets && (
                      <ul
                        className={`mt-4 space-y-2 font-sans text-[16px] font-normal leading-[26px] text-white ${
                          isWide ? "pb-8 lg:pb-[110px]" : ""
                        }`}
                      >
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            {s.bulletCheck !== "none" &&
                              bulletIcon(s.bulletCheck)}
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Link
                    href="/products"
                    className="mt-6 inline-flex w-fit flex-row-reverse items-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#111827] shadow-sm transition hover:bg-white/95"
                  >
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    Explore more
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
