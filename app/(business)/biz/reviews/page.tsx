"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { BIZ_REVIEWS, BIZ_METRICS } from "@/lib/business";
import { BizBar } from "@/components/business/BizBar";

export default function BizReviews() {
  const [replied, setReplied] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});

  return (
    <>
      <BizBar title="Reviews" subtitle={`${BIZ_METRICS.rating.toFixed(1)} · ${BIZ_METRICS.reviews} reviews`} back />

      <div className="px-4 pb-6 pt-4">
        <div className="card mb-4 flex items-center gap-4 p-4">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-ink">{BIZ_METRICS.rating.toFixed(1)}</div>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon.Star key={i} className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} />
              ))}
            </div>
          </div>
          <p className="flex-1 text-sm text-muted">Replying to reviews boosts your ranking on Bookzyr. Aim to respond within 48 hours.</p>
        </div>

        <div className="space-y-3">
          {BIZ_REVIEWS.map((r) => {
            const reply = r.reply ?? replied[r.id];
            return (
              <div key={r.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">{r.author}</span>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon.Star key={i} className="h-3.5 w-3.5" style={{ fill: i < r.rating ? "#E8B86A" : "transparent", color: "#E8B86A" }} />
                    ))}
                  </span>
                  <span className="text-xs text-muted">· {r.service}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink">{r.body}</p>

                {reply ? (
                  <div className="mt-3 rounded-xl bg-surface-2 p-3">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-coral">Your reply</div>
                    <p className="mt-1 text-sm text-ink">{reply}</p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <textarea
                      className="input min-h-[64px] resize-none"
                      placeholder="Write a reply…"
                      value={draft[r.id] ?? ""}
                      onChange={(e) => setDraft((d) => ({ ...d, [r.id]: e.target.value }))}
                    />
                    <button
                      onClick={() => draft[r.id]?.trim() && setReplied((s) => ({ ...s, [r.id]: draft[r.id].trim() }))}
                      disabled={!draft[r.id]?.trim()}
                      className="btn-primary mt-2 w-full py-2 text-sm disabled:opacity-50"
                    >
                      Post reply
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
