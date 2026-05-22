import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TopBar } from "@/components/TopBar";
import { ProductsShop } from "@/components/products/ProductsShop";

export const metadata = {
  title: "All Products – Bocpak",
  description: "Browse our full range of custom packaging solutions.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const initialType = typeof params?.type === "string" ? params.type : undefined;

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main className="flex-1 bg-[#f8f9fc]">
        <div className="border-b border-[#e7e7e7] bg-white px-5 py-3 lg:px-20">
          <nav className="flex items-center gap-2 text-[13px] text-[#777]" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#111]">Home</a>
            <span>/</span>
            <span className="font-medium text-[#111]">Products</span>
          </nav>
        </div>
        <ProductsShop initialType={initialType} />
      </main>
      <SiteFooter />
    </>
  );
}
