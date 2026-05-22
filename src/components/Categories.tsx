import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Headphones, Phone } from "lucide-react";
import { categories, categorySideBanners } from "@/lib/content";

export function Categories() {
  const [bannerSupport, bannerPromo] = categorySideBanners;

  return (
    <section id="categories" className="bg-white py-10 lg:py-[60px]">
      <div className="pl-20 pr-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-4xl font-bold uppercase tracking-[0.2em] text-brand-cyan">
            Categories
          </p>
          <h2 className="font-display mt-3 text-[30px] font-normal leading-[1.15] tracking-tight text-[#111] sm:text-[46px] lg:text-[50px]">
            What are you packaging?
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-2xl text-[16px] leading-[26px] text-[#555]">
            Personalized and specialized{" "}
            <strong className="font-semibold text-bocpak-primary">custom packaging</strong> wholesale
            service.
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-1 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-brand-cyan hover:opacity-90"
          >
            See all products
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-10 grid w-full gap-8 lg:grid-cols-[minmax(0,1.62fr)_minmax(220px,26%)] lg:items-stretch lg:gap-10 xl:gap-12">
          <div className="min-w-0 grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.title}
                href="/products"
                className="group flex flex-col items-center rounded-[14px] border-[0.5px] border-[#e7e7e7] bg-white px-5 py-6 pb-7 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-[#d0d0d0] hover:shadow-[0px_4px_24px_rgba(0,0,0,0.08)] sm:px-6 sm:py-7"
              >
                <div
                  className="relative flex h-[172px] w-[172px] shrink-0 items-center justify-center overflow-hidden rounded-full p-2 sm:h-[188px] sm:w-[188px]"
                >
                  {/* Clip image to a circle so rectangular JPGs don’t spill past the round badge */}
                  <div className="relative h-full min-h-0 w-full overflow-hidden rounded-full">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 45vw, 188px"
                      className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <h3 className="font-sans mt-4 w-full text-center text-[20px] font-bold leading-snug text-[#111] sm:mt-5">
                  <span
                    className="bg-[linear-gradient(90deg,#111,#111)] bg-no-repeat pb-0.5 [background-position:0_100%] [background-size:0%_2px] transition-[background-size] duration-300 ease-out group-hover:[background-size:100%_2px]"
                  >
                    {c.title}
                  </span>
                </h3>
              </Link>
            ))}
          </div>

          <div className="flex min-h-0 flex-col gap-5 lg:min-w-0 lg:h-full">
            <div
              className={`relative flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-[14px] lg:min-h-0 ${bannerSupport.bgClass}`}
            >
              <Image
                src={bannerSupport.image}
                alt=""
                fill
                className="object-cover object-right"
                sizes="(max-width:1024px) 100vw, 32vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-cyan/88 to-transparent" />
              <div className="relative z-10 flex min-h-[200px] flex-1 flex-col justify-center gap-4 px-6 py-6 text-white sm:px-8 lg:min-h-0">
                <p className="text-[20px] font-bold uppercase tracking-[0.08em] text-white/95">
                  Perfect packaging <br /> every time!
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+1834123456789"
                    className="flex items-start gap-3 text-[16px] font-medium leading-snug hover:opacity-95"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/50">
                      <Phone className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-[16px] font-semibold uppercase tracking-wide text-white/85">
                        24/7 Support
                      </span>
                      <span className="text-[16px] font-semibold">+1834 123 456 789</span>
                    </span>
                  </a>
                  <Link
                    href="#"
                    className="flex items-start gap-3 text-[16px] font-medium leading-snug hover:opacity-95"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/50">
                      <Headphones className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-[16px] font-semibold uppercase tracking-wide text-white/85">
                        How can we help you?
                      </span>
                      <span className="font-semibold underline-offset-4 hover:underline">Help and FAQ</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={`relative flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-[14px] lg:min-h-0 ${bannerPromo.bgClass}`}
            >
              <Image
                src={bannerPromo.image}
                alt=""
                fill
                className="object-cover object-right"
                sizes="(max-width:1024px) 100vw, 32vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffe000] via-[#ffe000]/90 to-transparent" />
              <div className="relative z-10 flex min-h-[200px] flex-1 flex-col justify-center gap-4 px-6 py-6 text-[#111] sm:px-8 lg:min-h-0">
                <p className="font-sans text-[16px] font-bold">Buy more, save more!</p>
                <p className="font-display text-[64px] font-bold leading-none text-brand-cyan sm:text-[52px]">
                  20%
                </p>
                <p className="font-sans text-[16px] font-bold uppercase tracking-wide">Free shipping</p>
                <p className="font-display mt-2 max-w-[220px] text-[24px] font-normal leading-snug text-bocpak-primary">
                  Savings you don&apos;t want to miss!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
