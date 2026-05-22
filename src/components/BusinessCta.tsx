import Image from "next/image";
import { Check } from "lucide-react";
import { businessCtaImage, businessCtaLeftBg, marqueeItems } from "@/lib/content";

/** Brand guide: cyan + magenta */
const C_BADGE = "#14bbd3";
const C_PINK = "#ec008c";
const C_TICKER_BLUE = "#5dd4e8";

const listItems = [
  "Consistently high-quality products",
  "Speed to market, including rush orders and short runs.",
  "Unique product offerings for niche markets",
  "Eco-friendly packaging for food products, including compostable bags and films",
  "Quick response without jet lag",
] as const;

function TickerFlower({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill={C_PINK}
        d="M16 2l2.2 8.2L26.4 8l-6.2 6.2L30 16l-9.8 1.8L26.4 24l-8.2-2.2L16 30l-2.2-8.2L5.6 24l6.2-6.2L2 16l9.8-1.8L5.6 8l8.2 2.2L16 2z"
      />
    </svg>
  );
}


export function BusinessCta() {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative bg-white">
      <div className="relative mx-auto max-w-[1920px] overflow-visible">
        <div className="relative pt-[52px] sm:pt-[58px] lg:pt-[62px]">

          <div className="grid min-h-0 grid-cols-1 lg:grid-cols-2 lg:min-h-[800px]">
            <div
              className="relative flex flex-col justify-center px-[15px] pb-[100px] pt-[130px] lg:px-20 lg:pb-[173px] lg:pt-[174px] xl:px-[80px]"
              style={{
                backgroundColor: "#050508",
                backgroundImage: `url("${businessCtaLeftBg}")`,
                backgroundSize: "cover",
                backgroundPosition: "top left",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="max-w-[32rem]">
                <p className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.42em] text-white sm:text-[12px] lg:text-[13px]">
                  YOUR BRAND - OUR PACKAGING
                </p>
                <h2 className="font-display mt-6 max-w-[17ch] text-left text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:mt-7 sm:max-w-[20ch] sm:text-[38px] lg:mt-8 lg:text-[46px] lg:leading-[1.1] xl:max-w-[22ch] xl:text-[52px]">
                  Start your business from here you can get:
                </h2>
                <ul className="mt-9 space-y-[1.125rem] font-sans text-[15px] font-normal leading-[1.62] text-white sm:mt-10 sm:space-y-5 sm:text-[16px] lg:leading-[1.65]">
                  {listItems.map((line) => (
                    <li key={line} className="flex gap-[0.875rem]">
                      <span
                        className="mt-[3px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full sm:h-6 sm:w-6"
                        style={{ backgroundColor: C_PINK }}
                      >
                        <Check className="h-[11px] w-[11px] text-white sm:h-3 sm:w-3" strokeWidth={3} aria-hidden />
                      </span>
                      <span className="text-white/98">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative min-h-[min(85vw,420px)] w-full lg:min-h-[800px]">
              <Image
                src={businessCtaImage}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-[#ececec] bg-white py-[13px] sm:py-[15px]">
        <div
          className="animate-marquee-business flex w-max items-center gap-9 whitespace-nowrap px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.26em] sm:gap-11 sm:text-[12px] sm:tracking-[0.28em] lg:text-[13px] lg:tracking-[0.3em]"
          style={{ color: C_TICKER_BLUE }}
        >
          {row.map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-9 sm:gap-11">
              {t}
              <TickerFlower className="shrink-0 opacity-95" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
