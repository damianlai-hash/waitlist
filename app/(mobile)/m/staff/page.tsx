"use client";

import { Icon } from "@/lib/icons";
import { BARBERS } from "@/lib/data";
import { useMobile } from "@/components/mobile/MobileProvider";
import { AppBar } from "@/components/mobile/AppBar";
import { Avatar } from "@/components/mobile/ui";

export default function StaffPage() {
  const { bookings } = useMobile();

  return (
    <>
      <AppBar title="Staff" subtitle={`${BARBERS.filter((b) => b.working).length} on shift today`} back />

      <div className="px-4 pb-6 pt-4">
        <div className="space-y-3">
          {BARBERS.map((b) => {
            const count = bookings.filter((x) => x.barberId === b.id).length;
            return (
              <div key={b.id} className="card flex items-center gap-3 p-3.5">
                <Avatar id={b.id} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[15px] font-bold text-ink">{b.name}</span>
                    {b.working ? (
                      <span className="chip bg-leaf/15 px-2 py-0.5 text-[10px] text-leaf">On shift</span>
                    ) : (
                      <span className="chip bg-surface-2 px-2 py-0.5 text-[10px] text-muted">Off today</span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                    <Icon.Calendar className="h-3.5 w-3.5" /> {count} booked
                    <span className="mx-1">·</span>
                    <Icon.Heart className="h-3.5 w-3.5 text-coral" /> 4.{6 + (b.id.length % 4)}
                  </div>
                </div>
                <a
                  href="tel:+447700900000"
                  aria-label={`Call ${b.name}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-ink active:bg-surface-2"
                >
                  <Icon.Phone className="h-[18px] w-[18px]" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
