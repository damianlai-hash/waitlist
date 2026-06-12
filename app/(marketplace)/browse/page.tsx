import { Suspense } from "react";
import { BrowseClient } from "@/components/market/BrowseClient";

export const metadata = {
  title: "Browse venues · Bookzyr",
};

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted sm:px-6">Loading venues…</div>}>
      <BrowseClient />
    </Suspense>
  );
}
