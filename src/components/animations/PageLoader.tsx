"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { logoSrc } from "@/lib/content";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();

    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (next >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setVisible(false), 320);
      }
    }, 32);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-5"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(20,187,211,0.34), transparent 28%), radial-gradient(circle at 82% 76%, rgba(236,0,140,0.24), transparent 30%), linear-gradient(135deg, #26353f 0%, #374650 52%, #1f2933 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:42px_42px]" />

          <motion.div
            aria-hidden
            className="absolute left-[12%] top-[18%] h-24 w-24 rounded-[28px] border border-white/15 bg-white/8 backdrop-blur-sm"
            animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-[16%] right-[10%] h-28 w-20 rounded-[24px] border border-brand-cyan/35 bg-brand-cyan/12 backdrop-blur-sm"
            animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative w-full max-w-[460px] rounded-[28px] border border-white/15 bg-white/[0.09] px-6 py-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-10 sm:py-10"
          >
            <motion.div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white p-2 shadow-[0_16px_45px_rgba(20,187,211,0.22)]"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={logoSrc}
                alt="Your Package Studio"
                width={220}
                height={59}
                className="h-auto w-[150%] max-w-none object-contain"
                priority
                unoptimized
              />
            </motion.div>

            <p className="mt-7 text-[11px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-cyan">
              Premium custom packaging
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,7vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
              Preparing your brand box
            </h1>
            <p className="mx-auto mt-4 max-w-[24rem] text-[14px] leading-6 text-white/70 sm:text-[15px]">
              Loading custom packaging, print-ready products, and creative solutions for your business.
            </p>

            <div className="mt-8 flex items-end justify-between gap-4 text-left">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Loading studio
              </span>
              <span className="font-display text-3xl font-semibold tabular-nums text-white">
                {progress}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/12 p-1">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-cyan),var(--brand-magenta),var(--brand-orange))] shadow-[0_0_24px_rgba(20,187,211,0.55)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
