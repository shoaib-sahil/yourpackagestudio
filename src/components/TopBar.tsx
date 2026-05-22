import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <div className="bg-[#2757ff] py-1 text-white">
      <div className="container-bocpak flex min-h-9 items-center justify-center gap-3 text-[12px] leading-tight sm:text-[14px] lg:justify-between lg:text-[16px]">
        <div className="hidden items-center gap-4 lg:flex xl:gap-8">
          <span className="font-medium">Follow Us:</span>
          <Link href="#" aria-label="Facebook" className="hover:opacity-80">
            <Facebook className="h-5 w-5" strokeWidth={1.8} />
          </Link>
          <Link href="#" aria-label="X" className="hover:opacity-80">
            <span className="text-[18px] font-semibold">𝕏</span>
          </Link>
          <Link href="#" aria-label="Instagram" className="hover:opacity-80">
            <Instagram className="h-5 w-5" strokeWidth={1.8} />
          </Link>
          <Link href="#" aria-label="Youtube" className="hover:opacity-80">
            <Youtube className="h-5 w-5" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center font-medium">
          <span className="hidden h-7 w-7 shrink-0 rounded-full border border-white/70 bg-[url('https://demo2.themelexus.com/bocpak/wp-content/uploads/2024/05/h1-slider1-l2.jpg')] bg-cover bg-center sm:inline-block" />
          <span className="min-w-0">
            Ramadan Offer: Extra 10% off + Up to 25% Bulk Discount!
          </span>
        </div>

        <div className="hidden items-center justify-end gap-6 lg:flex">
          <Link href="#" className="hover:opacity-80">
            English
          </Link>
        </div>
      </div>
    </div>
  );
}
