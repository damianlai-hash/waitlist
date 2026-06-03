"use client";

import Link from "next/link";
import { Icon } from "@/lib/icons";
import { BARBERS, formatTime, serviceById } from "@/lib/data";
import { useMobile } from "@/components/mobile/MobileProvider";
import { AppBar } from "@/components/mobile/AppBar";
import { Avatar, BookingRow, SectionTitle } from "@/components/mobile/ui";

const NOW = 12 * 60 + 15; // 12:15, demo "current time"

export default function TodayPage() {
  const { bookings, revenue } = useMobile();

  const sorted = [...bookings].sort((a, b) => a.start - b.start);
  const upNext = sorted.find((b) => b.start >= NOW) ?? sorted[sorted.length - 1];
  const upNextSvc = upNext ? serviceById(upNext.serviceId) : undefined;
  const working = BARBERS.filter((b) => b.working);
  const capacity = BARBERS.length * 17; // ~17 slots/day
  const occupancy = Math.min(100, Math.round((bookings.length / capacity) * 100));

  return (
    <>
      <AppBar title="Empire Barbershop" subtitle="Tue 2 June · You're on" />

      <div className="px-4 pb-6 pt-4">
        <p className="text-sm text-muted">Good afternoon, Damian 👋</p>
        <h1 className="display-title text-3xl text-ink">Today at a glance</h1>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Kpi tone="#FF6B5B" icon={<Icon.Calendar className="h-4 w-4" />} label="Bookings" value={String(bookings.length)} />
          <Kpi tone="#6CC289" icon={<Icon.Dollar className="h-4 w-4" />} label="Revenue" value={`£${revenue}`} />
          <Kpi tone="#4A9FBF" icon={<Icon.Activity className="h-4 w-4" />} label="Occupancy" value={`${occupancy}%`} />
          <Kpi tone="#B98AC9" icon={<Icon.Users className="h-4 w-4" />} label="On shift" value={`${working.length}/${BARBERS.length}`} />
        </div>

        {/* Up next */}
        {upNext && (
          <>
            <SectionTitle>Up next</SectionTitle>
            <Link href="/m/agenda" className="card mx-4 flex items-center gap-3 p-3.5 active:opacity-80" style={{ display: "flex" }}>
              <Avatar id={upNext.barberId} size={44} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-bold text-ink">{upNext.clientName}</div>
                <div className="truncate text-xs text-muted">
                  {upNextSvc?.name} · {formatTime(upNext.start)}
                </div>
              </div>
              <span className="chip bg-surface-2 px-2.5 py-1 text-coral">
                <Icon.Clock className="h-3.5 w-3.5" /> {formatTime(upNext.start)}
              </span>
            </Link>
          </>
        )}

        {/* Quick actions */}
        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-3 gap-3 px-4">
          <Action href="/m/new" tone="#FF6B5B" icon={<Icon.Plus className="h-5 w-5" />} label="New" />
          <Action href="/m/clients" tone="#4A9FBF" icon={<Icon.Users className="h-5 w-5" />} label="Clients" />
          <Action href="/m/agenda" tone="#6CC289" icon={<Icon.List className="h-5 w-5" />} label="Agenda" />
        </div>

        {/* Schedule preview */}
        <SectionTitle
          action={
            <Link href="/m/agenda" className="text-xs font-bold text-coral">
              See all
            </Link>
          }
        >
          Next up today
        </SectionTitle>
        <div className="card mx-4 divide-y divide-border overflow-hidden">
          {sorted
            .filter((b) => b.start >= NOW)
            .slice(0, 4)
            .map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          {sorted.filter((b) => b.start >= NOW).length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-muted">Nothing left on the books today 🎉</div>
          )}
        </div>
      </div>
    </>
  );
}

function Kpi({ tone, icon, label, value }: { tone: string; icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card p-3.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${tone}20`, color: tone }}>
        {icon}
      </span>
      <div className="mt-2 text-2xl font-extrabold leading-none text-ink">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

function Action({ href, tone, icon, label }: { href: string; tone: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="card flex flex-col items-center gap-2 py-3.5 active:opacity-80">
      <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: tone }}>
        {icon}
      </span>
      <span className="text-xs font-bold text-ink">{label}</span>
    </Link>
  );
}
