import type { Metadata, Viewport } from "next";
import { BizProvider } from "@/components/business/BizProvider";
import { BizNav } from "@/components/business/BizNav";

export const metadata: Metadata = {
  title: "Bookzyr for Business",
  description: "Run your venue on Bookzyr — bookings, performance, listing and payouts.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Bookzyr Business" },
};

export const viewport: Viewport = {
  themeColor: "#C53A28",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <BizProvider>
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[460px] flex-col bg-bg md:border-x md:border-border">
        <main className="flex-1">{children}</main>
        <BizNav />
      </div>
    </BizProvider>
  );
}
