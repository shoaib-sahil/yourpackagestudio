import { MarqueePremiumIcon } from "@/components/PackagingServicesMarqueeIcons";
import { services } from "@/lib/content";

type MarqueeItem = { key: string; label: string };

/** Per-item gradient strokes (matches icon families). */
const MARQUEE_BORDER_GRADIENT: Record<string, string> = {
  "food-packaging": "linear-gradient(135deg, #fdba74 0%, #ea580c 45%, #c2410c 100%)",
  "coffee-cups": "linear-gradient(135deg, #fcd34d 0%, #b45309 50%, #451a03 100%)",
  "stock-packaging": "linear-gradient(135deg, #93c5fd 0%, #2563eb 50%, #1e3a8a 100%)",
  "water-juice": "linear-gradient(135deg, #a5f3fc 0%, #0ea5e9 50%, #0369a1 100%)",
  "tea-packaging": "linear-gradient(135deg, #bbf7d0 0%, #22c55e 50%, #14532d 100%)",
  "flexible-pouches": "linear-gradient(135deg, #f0abfc 0%, #c026d3 50%, #86198f 100%)",
  "Structural Engineering": "linear-gradient(135deg, #c7d2fe 0%, #6366f1 50%, #312e81 100%)",
  "Digital Printing": "linear-gradient(135deg, #ddd6fe 0%, #7c3aed 55%, #4c1d95 100%)",
  "Custom Printed Bags": "linear-gradient(135deg, #fecdd3 0%, #e11d48 50%, #881337 100%)",
  "Custom Mailer Box": "linear-gradient(135deg, #cbd5e1 0%, #64748b 50%, #1e293b 100%)",
  "Custom Roll Stock": "linear-gradient(135deg, #99f6e4 0%, #14b8a6 50%, #115e59 100%)",
  "Samples & Prototyping": "linear-gradient(135deg, #6ee7b7 0%, #10b981 50%, #064e3b 100%)",
};

function marqueeBorderGradient(key: string): string {
  return MARQUEE_BORDER_GRADIENT[key] ?? "linear-gradient(135deg, #a5b4fc, #6366f1, #4338ca)";
}

export function PackagingServicesMarquee() {
  const packagingItems: MarqueeItem[] = [
    { key: "food-packaging", label: "Food packaging" },
    { key: "coffee-cups", label: "coffee cups" },
    { key: "stock-packaging", label: "stock packaging" },
    { key: "water-juice", label: "Water & Juice" },
    { key: "tea-packaging", label: "tea packaging" },
    { key: "flexible-pouches", label: "Flexible pouches" },
  ];

  const serviceItems: MarqueeItem[] = services.map((s) => ({
    key: s.title,
    label: s.title,
  }));

  const row = [...packagingItems, ...serviceItems];
  const doubled = [...row, ...row];

  return (
    <section className="w-full bg-transparent py-3 sm:py-4">
      <div className="relative w-full overflow-hidden px-[15px] sm:px-[22px] lg:px-[30px]">
        <div className="relative">
          <div
            className="animate-marquee flex w-max items-center gap-4 whitespace-nowrap sm:gap-5 lg:gap-6"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            }}
          >
            {doubled.map((it, i) => (
              <div
                key={`${it.key}-${i}`}
                className="inline-flex shrink-0 rounded-full p-px shadow-sm ring-1 ring-black/[0.04]"
                style={{ background: marqueeBorderGradient(it.key) }}
              >
                <div className="flex items-center gap-1.5 rounded-full bg-white/92 py-1 pl-1 pr-3 backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1.5 sm:pr-3.5">
                  <MarqueePremiumIcon
                    marqueeKey={it.key}
                    idSuffix={`${it.key}-${i}`}
                    className="h-7 w-7 shrink-0 sm:h-8 sm:w-8 drop-shadow-[0_1px_3px_rgba(15,23,42,0.12)]"
                  />
                  <span
                    className="max-w-[200px] truncate font-sans text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-[#1a1a1a] sm:max-w-[260px] sm:text-[11px] sm:tracking-[0.12em] lg:text-[12px]"
                    title={it.label}
                  >
                    {it.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
