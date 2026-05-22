import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/animations/PageLoader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bocpak – Print Custom Packaging and Pouches",
  description:
    "Packaging is the first impression your brand makes on a customer. Custom packaging wholesale service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="font-sans min-h-full flex flex-col" suppressHydrationWarning>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
