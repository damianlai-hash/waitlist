import type { Metadata } from "next";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketFooter } from "@/components/market/MarketFooter";

export const metadata: Metadata = {
  title: "Bookzyr · Book beauty & wellness near you",
  description: "Discover and instantly book salons, barbershops and spas. Real-time availability, verified reviews, always free.",
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <MarketHeader />
      <div className="flex-1">{children}</div>
      <MarketFooter />
    </div>
  );
}
