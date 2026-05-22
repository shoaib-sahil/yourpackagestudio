"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 1900);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bocpak-primary"
          style={{ backgroundColor: "var(--e-global-color-primary)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="mb-10 px-6 text-center"
          >
            <h1 className="font-display text-[clamp(1.5rem,5vw,2.35rem)] font-normal leading-tight tracking-[0.04em] text-white">
              Your Package Studio
            </h1>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
              Premium custom packaging
            </p>
          </motion.div>

          <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-white/[0.12]">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left rounded-full"
              style={{
                backgroundColor: "color-mix(in srgb, white 82%, var(--e-global-color-primary))",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
