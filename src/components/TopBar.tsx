import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <div className="pl-20 pr-20 bg-[#2757ff] text-white py-1">
      <div className="flex h-9 items-center justify-between text-[16px] leading-none">
        <div className="flex items-center gap-8">
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

        <div className="flex flex-1 items-center justify-center gap-2 text-[16px] font-medium">
          <span className="inline-block h-7 w-7 rounded-full border border-white/70 bg-[url('https://demo2.themelexus.com/bocpak/wp-content/uploads/2024/05/h1-slider1-l2.jpg')] bg-cover bg-center" />
          Ramadan Offer: Extra 10% off + Up to 25% Bulk Discount!
        </div>

        <div className="flex items-center justify-end gap-6 text-[16px]">
          <Link href="#" className="hover:opacity-80">
            English
          </Link>
        </div>
      </div>
    </div>
  );
}
