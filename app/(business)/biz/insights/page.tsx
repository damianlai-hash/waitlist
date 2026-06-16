"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { REVENUE_WEEK, BIZ_METRICS, TOP_SERVICES, RATING_BREAKDOWN, revenueTotal } from "@/lib/business";
import { BizBar } from "@/components/business/BizBar";
import { KpiTile, BizBars, BarList, SectionTitle } from "@/components/business/ui";

export default function BizInsights() {
  const [period, setPeriod] = useState<"Week" | "Month">("Week");
  const weekTotal = revenueTotal(REVENUE_WEEK);
  const total = period === "Week" ? weekTotal : weekTotal * 4;
  const data = period === "Week" ? REVENUE_WEEK : REVENUE_WEEK.map((d) => ({ ...d, value: Math.round(d.value * (3.4 + (d.value % 7) / 10)) }));

  return (
    <>
      <BizBar title="Insights" subtitle="Empire Barbershop" />

      <div className="px-4 pb-6 pt-4">
        {/* Period toggle */}
        <div className="flex w-full rounded-xl border border-border bg-surface p-1">
          {(["Week", "Month"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`flex-1 rounded-lg py-1.5 text-sm font-bold ${period === p ? "text-white" : "text-muted"}`} style={period === p ? { background: "var(--primary)" } : undefined}>
              {p}
            </button>
          ))}
        </div>

        {/* Revenue */}
        <div className="card mt-4 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold text-ink">£{total.toLocaleString()}</div>
              <div className="text-xs text-muted">revenue · this {period.toLowerCase()}</div>
            </div>
            <span className="chip bg-leaf/15 px-2 py-1 text-xs text-leaf">↑ {BIZ_METRICS.weekChangePct}%</span>
          </div>
          <div className="mt-4">
            <BizBars data={data} height={130} />
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <KpiTile tone="#4A9FBF" icon={<Icon.Dollar className="h-4 w-4" />} label="Avg spend" value={`£${BIZ_METRICS.avgSpend}`} />
          <KpiTile tone="#C53A28" icon={<Icon.Activity className="h-4 w-4" />} label="Occupancy" value={`${BIZ_METRICS.occupancy}%`} />
          <KpiTile tone="#6CC289" icon={<Icon.Heart className="h-4 w-4" />} label="Retention" value={`${BIZ_METRICS.retention}%`} />
          <KpiTile tone="#E8B86A" icon={<Icon.Users className="h-4 w-4" />} label="New clients" value={String(BIZ_METRICS.newClients * 6)} />
        </div>

        {/* Top services */}
        <SectionTitle>Top services</SectionTitle>
        <div className="card mx-4 p-4">
          <BarList items={TOP_SERVICES.map((s) => ({ label: s.name, value: s.revenue, sub: `${s.bookings} bookings` }))} format={(v) => `£${v.toLocaleString()}`} />
        </div>

        {/* Marketplace funnel */}
        <SectionTitle>Marketplace funnel</SectionTitle>
        <div className="card mx-4 p-4">
          <BarList
            items={[
              { label: "Impressions", value: BIZ_METRICS.impressions },
              { label: "Profile views", value: BIZ_METRICS.profileViews },
              { label: "Bookings", value: BIZ_METRICS.marketplaceBookings },
            ]}
            format={(v) => v.toLocaleString()}
          />
          <div className="mt-3 rounded-xl bg-surface-2 p-3 text-center text-xs text-muted">
            Conversion <span className="font-bold text-ink">{((BIZ_METRICS.marketplaceBookings / BIZ_METRICS.profileViews) * 100).toFixed(1)}%</span> of profile views → bookings
          </div>
        </div>

        {/* Ratings */}
        <SectionTitle>Ratings</SectionTitle>
        <div className="card mx-4 p-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-ink">{BIZ_METRICS.rating.toFixed(1)}</div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon.Star key={i} className="h-3.5 w-3.5" style={{ fill: "#E8B86A", color: "#E8B86A" }} />
                ))}
              </div>
              <div className="mt-1 text-[11px] text-muted">{BIZ_METRICS.reviews} reviews</div>
            </div>
            <div className="flex-1 space-y-1.5">
              {RATING_BREAKDOWN.map((r) => (
                <div key={r.stars} className="flex items-center gap-2">
                  <span className="w-3 text-[11px] font-semibold text-muted">{r.stars}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: "#E8B86A" }} />
                  </div>
                  <span className="w-8 text-right text-[11px] text-muted">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
