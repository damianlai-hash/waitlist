import type { Metadata, Viewport } from "next";
import { MobileProvider } from "@/components/mobile/MobileProvider";
import { BottomNav } from "@/components/mobile/BottomNav";

export const metadata: Metadata = {
  title: "Bookzyr · Empire Barbershop",
  description: "Run the chair from your pocket — the Bookzyr staff app.",
  manifest: "/manifest.webmanifest",
  icons: { apple: "/apple-icon.png" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bookzyr",
  },
};

export const viewport: Viewport = {
  themeColor: "#C53A28",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileProvider>
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[460px] flex-col bg-bg md:border-x md:border-border">
        <main className="flex-1">{children}</main>
        <BottomNav />
      </div>
    </MobileProvider>
  );
}
