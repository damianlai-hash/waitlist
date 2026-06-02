# Bookzyr Admin — Empire Barbershop

The admin panel for the Bookzyr barbershop booking platform, rebuilt in
**Next.js 14 (App Router) + Tailwind CSS** and restyled to the Bookzyr brand
(sourced from [www.bookzyr.com](https://www.bookzyr.com)): warm cream
backgrounds, coral primary (`#FF6B5B`), gold/green/navy accents, and a clean
system sans-serif type style. A light/dark toggle is included (the brand cream
theme is the default).

## Features

All the functionality from the original admin UI, re-skinned:

- **Calendar** — barber-column day view with bookings, date navigation
  (Today / prev / next), zoom, team filter, live Booked / Occupancy /
  Retention stats, a Waitlist drawer, and a "New booking" modal you can use to
  add appointments to the grid.
- **Command Centre** — KPI cards, weekly revenue chart, team-today panel and
  upcoming appointments.
- **Clients** — searchable, filterable client table with tags.
- **Staff** — barber cards with status, ratings and quick actions.
- **Services** — service catalogue grouped by category with prices/durations.
- **Point of Sale** — tap-to-add till with a live cart and totals.
- **Analytics** — KPIs, most-booked services and a bookings-by-channel donut.
- **Reports** — exportable business report cards.
- **Marketing** — campaign performance table and outreach KPIs.
- **AI Assistant** — chat-style assistant with suggested prompts (demo wiring).
- **Settings** — business details and toggleable booking preferences.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /calendar
npm run build    # production build
```

## Project structure

```
app/
  (dashboard)/        # shared sidebar + topbar shell and all pages
  layout.tsx          # root layout + theme bootstrap
  globals.css         # Bookzyr theme tokens (light/dark)
components/           # Sidebar, TopBar, calendar feature, UI primitives
lib/                  # data (barbers, services, clients…) and icon set
tailwind.config.ts    # Bookzyr colour palette
```

Data is currently in-memory mock data under `lib/data.ts` — swap these for your
Bookzyr backend/API calls to go live.
