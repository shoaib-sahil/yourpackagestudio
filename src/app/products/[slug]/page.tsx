import { notFound } from "next/navigation";
import { products, slugify } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TopBar } from "@/components/TopBar";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: slugify(p.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => slugify(p.name) === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} – Bocpak`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.name !== product.name)
    .slice(0, 4);

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main className="flex-1 bg-[#f8f9fc]">
        <ProductDetailClient product={product} related={related} />
      </main>
      <SiteFooter />
    </>
  );
}
