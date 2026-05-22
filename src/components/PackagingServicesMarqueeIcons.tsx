import type { ReactNode } from "react";

type IconProps = {
  /** Unique suffix so gradient IDs never clash when the marquee duplicates. */
  idSuffix: string;
  className?: string;
};

function grad(id: string, from: string, to: string, x2 = 1, y2 = 1) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2} gradientUnits="objectBoundingBox">
      <stop offset="0%" stopColor={from} />
      <stop offset="100%" stopColor={to} />
    </linearGradient>
  );
}

function SvgShell({
  className,
  children,
  defs,
}: {
  className?: string;
  children: ReactNode;
  defs: ReactNode;
}) {
  return (
    <svg
      className={`shrink-0 ${className ?? ""}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>{defs}</defs>
      {children}
    </svg>
  );
}

function FoodPackaging({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={
        <>
          {grad(`${g}-b`, "#fdba74", "#ea580c")}
          {grad(`${g}-l`, "#fed7aa", "#f97316", 0.3, 1)}
        </>
      }
    >
      <path
        d="M24 6L42 14v20L24 42 6 34V14L24 6z"
        fill={`url(#${g}-b)`}
        opacity={0.98}
      />
      <path d="M6 14l18 8 18-8" stroke="white" strokeOpacity={0.45} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M24 22v20" stroke="white" strokeOpacity={0.22} strokeWidth={1.1} />
      <ellipse cx={24} cy={14} rx={10} ry={3.5} fill={`url(#${g}-l)`} />
    </SvgShell>
  );
}

function CoffeeCup({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={
        <>
          {grad(`${g}-c`, "#92400e", "#451a03")}
          {grad(`${g}-s`, "#fde68a", "#f59e0b")}
        </>
      }
    >
      <path
        d="M14 18h16v14c0 4-3.2 7-8 7s-8-3-8-7V18z"
        fill={`url(#${g}-c)`}
      />
      <path
        d="M30 22h4a4 4 0 010 8h-4"
        stroke={`url(#${g}-c)`}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path d="M16 14c2-3 5-4 8-4s6 1 8 4" stroke={`url(#${g}-s)`} strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={22} cy={24} rx={3} ry={2} fill="white" fillOpacity={0.2} />
    </SvgShell>
  );
}

function StockBox({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-x`, "#60a5fa", "#1d4ed8")}</>}
    >
      <path d="M24 8l16 9v22l-16 9-16-9V17l16-9z" fill={`url(#${g}-x)`} />
      <path d="M8 17l16 9 16-9" stroke="white" strokeOpacity={0.5} strokeWidth={1.2} />
      <path d="M24 26v22" stroke="white" strokeOpacity={0.25} strokeWidth={1} />
      <path d="M24 8v18" stroke="white" strokeOpacity={0.2} strokeWidth={1} />
    </SvgShell>
  );
}

function WaterDroplet({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-w`, "#67e8f9", "#0284c7")}</>}
    >
      <path
        d="M24 6c-6 10-12 16-12 22a12 12 0 0024 0c0-6-6-12-12-22z"
        fill={`url(#${g}-w)`}
      />
      <ellipse cx={20} cy={22} rx={4} ry={5} fill="white" fillOpacity={0.35} />
    </SvgShell>
  );
}

function TeaLeaf({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-t`, "#86efac", "#15803d")}</>}
    >
      <path
        d="M34 10c-8 2-18 10-20 22 12-2 20-12 20-22z"
        fill={`url(#${g}-t)`}
      />
      <path d="M14 32c6-4 12-12 14-20" stroke="#14532d" strokeOpacity={0.35} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M22 26c3-1 6-4 8-8" stroke="white" strokeOpacity={0.4} strokeWidth={1} strokeLinecap="round" />
    </SvgShell>
  );
}

function FlexPouch({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-p`, "#e879f9", "#a21caf")}</>}
    >
      <path
        d="M16 12h16l4 26H12l4-26z"
        fill={`url(#${g}-p)`}
      />
      <path d="M16 12c0-4 3.5-6 8-6s8 2 8 6" stroke="white" strokeOpacity={0.35} strokeWidth={1.2} fill="none" />
      <rect x={18} y={22} width={12} height={8} rx={2} fill="white" fillOpacity={0.2} />
    </SvgShell>
  );
}

function Structural({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-e`, "#a5b4fc", "#4338ca")}</>}
    >
      <rect x={10} y={14} width={28} height={22} rx={2} fill={`url(#${g}-e)`} />
      <path d="M10 22h28M18 14v22M30 14v22" stroke="white" strokeOpacity={0.35} strokeWidth={1} />
      <circle cx={18} cy={18} r={1.5} fill="white" fillOpacity={0.5} />
      <circle cx={30} cy={26} r={1.5} fill="white" fillOpacity={0.35} />
    </SvgShell>
  );
}

function DigitalPrint({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-d`, "#c4b5fd", "#5b21b6")}</>}
    >
      <rect x={12} y={10} width={24} height={16} rx={3} fill={`url(#${g}-d)`} />
      <rect x={16} y={14} width={16} height={8} rx={1} fill="white" fillOpacity={0.25} />
      <rect x={14} y={30} width={20} height={8} rx={2} fill="#312e81" />
      <circle cx={24} cy={34} r={1.5} fill="#a78bfa" />
    </SvgShell>
  );
}

function PrintedBag({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-k`, "#fda4af", "#be123c")}</>}
    >
      <path
        d="M16 20h16v20c0 2-1.5 4-4 4H20c-2.5 0-4-2-4-4V20z"
        fill={`url(#${g}-k)`}
      />
      <path
        d="M18 20c0-4 2.5-7 6-7s6 3 6 7"
        stroke="white"
        strokeOpacity={0.4}
        strokeWidth={1.5}
        fill="none"
      />
      <path d="M20 28h8" stroke="white" strokeOpacity={0.35} strokeWidth={1.2} strokeLinecap="round" />
    </SvgShell>
  );
}

function MailerBox({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-m`, "#94a3b8", "#334155")}</>}
    >
      <path d="M8 20l16-8 16 8v18l-16 8-16-8V20z" fill={`url(#${g}-m)`} />
      <path d="M8 20l16 9 16-9" stroke="white" strokeOpacity={0.45} strokeWidth={1.2} />
      <path d="M24 29v16" stroke="white" strokeOpacity={0.2} strokeWidth={1} />
      <path d="M18 16l6 4 6-4" stroke="white" strokeOpacity={0.3} strokeWidth={1} fill="none" />
    </SvgShell>
  );
}

function RollStock({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-r`, "#5eead4", "#0f766e")}</>}
    >
      <ellipse cx={24} cy={16} rx={14} ry={5} fill={`url(#${g}-r)`} />
      <path
        d="M10 16v14c0 2.8 6.3 5 14 5s14-2.2 14-5V16"
        fill={`url(#${g}-r)`}
        opacity={0.85}
      />
      <ellipse cx={24} cy={30} rx={14} ry={5} fill="#115e59" />
      <ellipse cx={24} cy={30} rx={10} ry={3} fill="white" fillOpacity={0.15} />
    </SvgShell>
  );
}

function Prototyping({ idSuffix, className }: IconProps) {
  const g = `mq-${idSuffix.replace(/\W/g, "")}`;
  return (
    <SvgShell
      className={className}
      defs={<>{grad(`${g}-q`, "#6ee7b7", "#047857")}</>}
    >
      <path d="M18 8l-4 24h20l-4-24H18z" fill={`url(#${g}-q)`} />
      <ellipse cx={24} cy={10} rx={4} ry={1.5} fill="white" fillOpacity={0.35} />
      <rect x={20} y={26} width={8} height={10} rx={1} fill="white" fillOpacity={0.2} />
      <circle cx={32} cy={14} r={6} fill="#34d399" stroke="#065f46" strokeWidth={1} />
      <path d="M29 14l2 2 4-4" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </SvgShell>
  );
}

const DEFAULT_MARQUEE_ICON_CLASS =
  "h-10 w-10 sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px] drop-shadow-[0_3px_10px_rgba(15,23,42,0.14)]";

export function MarqueePremiumIcon({
  marqueeKey,
  idSuffix,
  className,
}: {
  marqueeKey: string;
  idSuffix: string;
  className?: string;
}) {
  const p: IconProps = { idSuffix, className: className ?? DEFAULT_MARQUEE_ICON_CLASS };

  switch (marqueeKey) {
    case "food-packaging":
      return <FoodPackaging {...p} />;
    case "coffee-cups":
      return <CoffeeCup {...p} />;
    case "stock-packaging":
      return <StockBox {...p} />;
    case "water-juice":
      return <WaterDroplet {...p} />;
    case "tea-packaging":
      return <TeaLeaf {...p} />;
    case "flexible-pouches":
      return <FlexPouch {...p} />;
    case "Structural Engineering":
      return <Structural {...p} />;
    case "Digital Printing":
      return <DigitalPrint {...p} />;
    case "Custom Printed Bags":
      return <PrintedBag {...p} />;
    case "Custom Mailer Box":
      return <MailerBox {...p} />;
    case "Custom Roll Stock":
      return <RollStock {...p} />;
    case "Samples & Prototyping":
      return <Prototyping {...p} />;
    default:
      return <StockBox {...p} />;
  }
}
