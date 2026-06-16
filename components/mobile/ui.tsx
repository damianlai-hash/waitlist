import { BARBERS, serviceById, formatTime } from "@/lib/data";
import type { Booking } from "@/lib/data";

export function barberById(id: string) {
  return BARBERS.find((b) => b.id === id);
}

const STATUS_TONE: Record<Booking["status"], { label: string; color: string }> = {
  paid: { label: "Paid", color: "#6CC289" },
  confirmed: { label: "Confirmed", color: "#4A9FBF" },
  pending: { label: "Pending", color: "#E8B86A" },
};

export function StatusChip({ status }: { status: Booking["status"] }) {
  const t = STATUS_TONE[status];
  return (
    <span className="chip px-2 py-0.5 text-[10px]" style={{ background: `${t.color}20`, color: t.color }}>
      {t.label}
    </span>
  );
}

export function Avatar({ id, size = 36 }: { id: string; size?: number }) {
  const b = barberById(id);
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl font-bold text-white"
      style={{ background: b?.color ?? "#999", width: size, height: size, fontSize: size * 0.32 }}
    >
      {b?.initials ?? "?"}
    </span>
  );
}

export function BookingRow({ booking }: { booking: Booking }) {
  const svc = serviceById(booking.serviceId);
  const barber = barberById(booking.barberId);
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-12 shrink-0 text-right">
        <div className="text-sm font-extrabold text-ink">{formatTime(booking.start)}</div>
        <div className="text-[11px] text-muted">{svc?.durationMin}m</div>
      </div>
      <span className="h-9 w-1 shrink-0 rounded-full" style={{ background: barber?.color ?? "#999" }} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-ink">{booking.clientName}</div>
        <div className="truncate text-xs text-muted">
          {svc?.name} · {barber?.name}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-sm font-bold text-ink">£{svc?.price}</span>
        <StatusChip status={booking.status} />
      </div>
    </div>
  );
}

export function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-2 mt-5 flex items-center justify-between px-4">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{children}</h2>
      {action}
    </div>
  );
}
