"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { FAQS } from "@/lib/marketplace";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-3 px-5 py-4 text-left">
              <span className="flex-1 text-[15px] font-bold text-ink">{f.q}</span>
              <Icon.ChevronDown className={`h-5 w-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <p className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-muted">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
