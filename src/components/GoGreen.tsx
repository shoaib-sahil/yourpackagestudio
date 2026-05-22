import Image from "next/image";
import {
  IconGoGreenLibrary,
  IconGoGreenPromise,
} from "@/components/go-green/GoGreenIcons";

const heroArt = "/images/go-green/h1-banner11.png";

/** Native dimensions of `h1-banner11.png` — keeps aspect ratio exact. */
const ART_W = 1124;
const ART_H = 800;

export function GoGreen() {
  return (
    <section className="bg-[#f8f9fc] px-4 py-14 sm:px-6 lg:px-8 lg:py-24 xl:px-[30px] xl:py-[120px]">
      <div className="mx-auto grid min-w-0 max-w-[1760px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10 xl:gap-12">
        {/* Left: copy + cards — defines row height on large screens */}
        <div className="min-w-0 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7b9ae8]">
            Eco-conscious businesses
          </p>
          <h2 className="mt-2.5 max-w-[22ch] font-display text-3xl font-normal leading-[1.08] text-[#1f2937] sm:max-w-none sm:text-4xl lg:text-[56px] lg:leading-[1.12] xl:text-[64px] xl:leading-[1.1]">
            Go green with custom eco-friendly packaging
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-[26px] text-[#6b7280]">
            Packaging is the first impression your brand makes on a customer.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-[30px] sm:grid-cols-2 sm:gap-6 lg:gap-[30px]">
            <div className="group rounded-2xl bg-white p-8 pb-[37px] shadow-[0_2px_20px_rgba(15,23,42,0.045)] ring-1 ring-[#eef0f4] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
              <IconGoGreenPromise />
              <h3 className="mt-[21px] font-display text-[22px] font-normal leading-[28px] text-[#111827] transition-colors group-hover:text-bocpak-primary">
                The Bocpak Promise
              </h3>
              <p className="mt-2 font-sans text-[16px] font-normal leading-[26px] text-[#6b7280]">
                We guarantee the highest quality products and customer experience
                with every order!
              </p>
            </div>
            <div className="group rounded-2xl bg-white p-8 pb-[37px] shadow-[0_2px_20px_rgba(15,23,42,0.045)] ring-1 ring-[#eef0f4] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
              <IconGoGreenLibrary />
              <h3 className="mt-[21px] font-display text-[22px] font-normal leading-[28px] text-[#111827] transition-colors group-hover:text-bocpak-primary">
                Extensive Option Library
              </h3>
              <p className="mt-2 font-sans text-[16px] font-normal leading-[26px] text-[#6b7280]">
                Access over 50+ options that you can utilize to create your very
                own unique box experience.
              </p>
            </div>
          </div>
        </div>

        {/* Right: same row height as left; image vertically centered */}
        <div className="relative flex min-h-[260px] w-full min-w-0 items-center justify-center lg:min-h-0 lg:justify-end">
          <div
            className="relative w-full max-w-[720px] sm:max-w-[820px] lg:max-w-none"
            style={{ aspectRatio: `${ART_W} / ${ART_H}` }}
          >
            <Image
              src={heroArt}
              alt=""
              fill
              className="object-contain object-center lg:object-right"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
