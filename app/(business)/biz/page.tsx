"use client";

import Link from "next/link";
import { Icon } from "@/lib/icons";
import { formatTime, serviceById } from "@/lib/data";
import { REVENUE_WEEK, BIZ_METRICS, revenueTotal } from "@/lib/business";
import { useBiz } from "@/components/business/BizProvider";
import { BizBar } from "@/components/business/BizBar";
import { KpiTile, BizBars, SectionTitle } from "@/components/business/ui";
import { Avatar, BookingRow } from "@/components/mobile/ui";

export default function BizDashboard() {
  const { bookings, requests, accept, decline, revenueToday } = useBiz();
  const sorted = [...bookings].sort((a, b) => a.start - b.start);
  const weekTotal = revenueTotal(REVENUE_WEEK);

  return (
    <>
      <BizBar title="Empire Barbershop" subtitle="Surry Hills · Tue 16 Jun" />

      <div className="px-4 pb-6 pt-4">
        <p className="text-sm text-muted">Good afternoon, Damian 👋</p>
        <h1 className="display-title text-3xl text-ink">Dashboard</h1>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <KpiTile tone="#C53A28" icon={<Icon.Dollar className="h-4 w-4" />} label="Revenue today" value={`£${revenueToday}`} delta={`${BIZ_METRICS.weekChangePct}%`} />
          <KpiTile tone="#4A9FBF" icon={<Icon.Calendar className="h-4 w-4" />} label="Bookings" value={String(bookings.length)} />
          <KpiTile tone="#6CC289" icon={<Icon.Users className="h-4 w-4" />} label="New clients" value={String(BIZ_METRICS.newClients)} />
          <KpiTile tone="#E8B86A" icon={<Icon.Star className="h-4 w-4" />} label="Rating" value={BIZ_METRICS.rating.toFixed(1)} />
        </div>

        {/* Revenue chart */}
        <SectionTitle action={<Link href="/biz/insights" className="text-xs font-bold text-coral">Insights</Link>}>This week</SectionTitle>
        <div className="card mx-4 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-extrabold text-ink">£{weekTotal.toLocaleString()}</div>
              <div className="text-xs text-muted">revenue · last 7 days</div>
            </div>
            <span className="chip bg-leaf/15 px-2 py-1 text-xs text-leaf">↑ {BIZ_METRICS.weekChangePct}%</span>
          </div>
          <div className="mt-4">
            <BizBars data={REVENUE_WEEK} />
          </div>
        </div>

        {/* Pending requests */}
        {requests.length > 0 && (
          <>
            <SectionTitle>Booking requests</SectionTitle>
            <div className="mx-4 space-y-3">
              {requests.map((r) => {
                const svc = serviceById(r.serviceId);
                return (
                  <div key={r.id} className="card p-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar id={r.barberId} size={40} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-ink">{r.clientName}</div>
                        <div className="truncate text-xs text-muted">{svc?.name} · {formatTime(r.start)} · £{svc?.price}</div>
                      </div>
                      <span className="chip bg-gold/15 px-2 py-0.5 text-[10px] text-gold">New</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button onClick={() => decline(r.id)} className="btn-ghost py-2 text-sm">Decline</button>
                      <button onClick={() => accept(r.id)} className="btn-primary py-2 text-sm">Accept</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Marketplace performance */}
        <SectionTitle action={<Link href="/biz/listing" className="text-xs font-bold text-coral">View listing</Link>}>On Bookzyr this week</SectionTitle>
        <div className="card mx-4 grid grid-cols-3 divide-x divide-border">
          <Funnel label="Impressions" value={BIZ_METRICS.impressions.toLocaleString()} />
          <Funnel label="Profile views" value={BIZ_METRICS.profileViews.toLocaleString()} />
          <Funnel label="Bookings" value={String(BIZ_METRICS.marketplaceBookings)} />
        </div>

        {/* Quick actions */}
        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-3 gap-3 px-4">
          <Action href="/m/new" tone="#C53A28" icon={<Icon.Plus className="h-5 w-5" />} label="Add booking" />
          <Action href="/biz/listing" tone="#4A9FBF" icon={<Icon.Tag className="h-5 w-5" />} label="Edit listing" />
          <Action href="/biz/more" tone="#6CC289" icon={<Icon.Megaphone className="h-5 w-5" />} label="Promote" />
        </div>

        {/* Today's schedule */}
        <SectionTitle action={<Link href="/biz/bookings" className="text-xs font-bold text-coral">See all</Link>}>Today's schedule</SectionTitle>
        <div className="card mx-4 divide-y divide-border overflow-hidden">
          {sorted.slice(0, 4).map((b) => (
            <BookingRow key={b.id} booking={b} />
          ))}
        </div>
      </div>
    </>
  );
}

function Funnel({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-3 text-center">
      <div className="text-lg font-extrabold text-ink">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

function Action({ href, tone, icon, label }: { href: string; tone: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="card flex flex-col items-center gap-2 py-3.5 text-center active:opacity-80">
      <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: tone }}>
        {icon}
      </span>
      <span className="text-xs font-bold text-ink">{label}</span>
    </Link>
  );
}
