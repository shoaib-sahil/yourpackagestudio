"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { heroSlides } from "@/lib/content";

const tagRows = [
  ["Food packaging", "coffee cups", "stock packaging", "Water & Juice"],
  ["tea packaging", "Flexible pouches"],
] as const;

const tagLayoutClass: Record<(typeof tagRows)[number][number], string> = {
  "Food packaging": "-rotate-[4deg] lg:-translate-x-4",
  "coffee cups": "rotate-0 lg:-translate-y-1",
  "stock packaging": "rotate-[4deg] lg:translate-x-3",
  "Water & Juice": "-rotate-[10deg] lg:translate-x-6",
  "tea packaging": "rotate-[1deg] lg:-translate-x-10",
  "Flexible pouches": "-rotate-[9deg] lg:translate-x-10",
};

const floatingCards = [
  {
    src: "/images/hero/card-l1.jpg",
    cls: "left-10 top-12 h-28 w-28 sm:h-26 sm:w-28 xl:h-35 xl:w-36",
    drift: 10,
  },
  {
    src: "/images/hero/card-l2.jpg",
    cls: "left-10 top-52 h-58 w-16 sm:top-28 sm:h-48 sm:w-46 xl:top-56 xl:h-68 xl:w-68",
    drift: 14,
  },
  {
    src: "/images/hero/card-l3.jpg",
    cls: "left-30 bottom-20 h-20 w-40 sm:left-30 sm:h-25 sm:w-42 xl:left-30 xl:h-45 xl:w-46",
    drift: 12,
  },
  {
    src: "/images/hero/card-l4.jpg",
    cls: "left-[-120px] bottom-8 h-44 w-36 sm:h-48 sm:w-40 xl:h-56 xl:w-48",
    drift: 16,
  },
 
  {
    src: "/images/hero/card-r1.jpg",
    cls: "right-16 top-10 h-28 w-24 sm:right-20 sm:top-12 sm:h-32 sm:w-28 xl:right-14 xl:top-16 xl:h-38 xl:w-38",
    drift: 10,
  },
  {
    src: "/images/hero/card-r2.jpg",
    cls: "right-8 top-40 h-44 w-36 sm:right-10 sm:top-44 sm:h-52 sm:w-44 xl:right-0 xl:top-62 xl:h-60 xl:w-62",
    drift: 14,
  },
  {
    src: "/images/hero/card-r3.jpg",
    cls: "right-40 bottom-8 h-40 w-32 sm:right-44 sm:bottom-10 sm:h-44 sm:w-36 xl:right-32 xl:bottom-12 xl:h-58 xl:w-60",
    drift: 15,
  },
  {
    src: "/images/hero/card-r4.jpg",
    cls: "-right-6 bottom-10 h-32 w-24 sm:-right-6 sm:bottom-12 sm:h-36 sm:w-28 xl:-right-8 xl:bottom-26 xl:h-44 xl:w-32",
    drift: 11,
  },
];

/** Slider Revolution module: 1290×800 desktop → 630 mobile (SR7_1_1 settings). */
export function Hero() {
  const [index, setIndex] = useState(0);
  const words = useMemo(
    () => ["Retail Packaging", "Cosmetics", "Custom Boxes", "Gift Cards"],
    [],
  );
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const current = words[wordIdx];
    const doneTyping = typed === current;
    const doneDeleting = typed.length === 0;
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (!doneTyping) {
            setTyped(current.slice(0, typed.length + 1));
          } else {
            setDeleting(true);
          }
        } else if (!doneDeleting) {
          setTyped((p) => p.slice(0, -1));
        } else {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      },
      doneTyping && !deleting ? 900 : deleting ? 55 : 90,
    );
    return () => clearTimeout(timeout);
  }, [deleting, typed, wordIdx, words]);

  return (
    <section className="relative overflow-hidden border-y border-[#e4e4e4] bg-black">
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[800ms] ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.bg}
              alt=""
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(57,87,255,0.55),transparent_36%),radial-gradient(circle_at_78%_80%,rgba(255,98,214,0.38),transparent_34%),linear-gradient(to_right,rgba(2,6,23,0.78),rgba(0,0,0,0.88),rgba(9,6,25,0.82))]" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.src}
            className={`absolute overflow-hidden rounded-[12px] ${card.cls}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, x: [0, card.drift, 0, -card.drift / 1.3, 0] }}
            transition={{
              opacity: { duration: 0.45, ease: "easeOut" },
              y: { duration: 0.45, ease: "easeOut" },
              x: {
                duration: 6.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          >
            <Image src={card.src} alt="" fill className="object-cover" sizes="200px" />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto flex h-[calc(90vh-20px)] min-h-[380px] w-full max-w-[1290px] max-h-[620px] flex-col justify-center px-[15px] py-10 sm:h-[calc(93dvh-20px)] sm:min-h-[520px] sm:px-[22px] lg:h-[calc(93vh-20px)] lg:min-h-[580px] lg:max-h-[800px] lg:px-[30px]">
        <motion.div
          className="mx-auto max-w-[900px] py-2 text-center text-white lg:-translate-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
          }}
        >
          <motion.p
            className="font-sans text-[14px] font-semibold uppercase tracking-[0.34em] text-[#f765dc]"
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            #1 PRINTING SERVICES NYC
          </motion.p>
          <motion.h1
            className="font-display mt-3 text-[43px] font-medium leading-[1.06] tracking-tight sm:text-[50px] lg:text-[76px]"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            We are your best solution
            <br />
            for <span className="text-[#2b53ff]">{typed}<span className="ml-0.5 inline-block h-[0.9em] w-[1px] animate-pulse bg-[#2b53ff]" /></span>
          </motion.h1>
          <motion.p
            className="font-sans mt-5 text-[20px] font-medium leading-[26px] text-white/84"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Packaging is the first impression your brand makes on a customer.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-11 sm:gap-5"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5 lg:gap-x-6">
              {tagRows[0].map((t) => (
                <span
                  key={t}
                  className={`font-sans rounded-[20px] px-4.5 py-2.5 text-[14px] font-semibold uppercase tracking-wide text-[#17202a] transition-transform duration-500 sm:px-4 sm:py-2 sm:text-[12px] ${tagLayoutClass[t]}`}
                  style={{
                    background:
                      t === "Food packaging"
                        ? "#49c8ff"
                        : t === "coffee cups"
                          ? "#f6b8ff"
                          : t === "stock packaging"
                            ? "#a6f46c"
                            : "#f6ef7e",
                  }}
                >
                  # {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5 lg:gap-x-7">
              {tagRows[1].map((t) => (
                <span
                  key={t}
                  className={`font-sans rounded-[20px] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#17202a] transition-transform duration-500 sm:px-4 sm:py-2 sm:text-[12px] ${tagLayoutClass[t]}`}
                  style={{
                    background: t === "tea packaging" ? "#ffbf8d" : "#c6adff",
                  }}
                >
                  # {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
