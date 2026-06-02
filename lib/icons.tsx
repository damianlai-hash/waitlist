import type { SVGProps } from "react";

/* Lightweight inline icon set (stroke-based, currentColor) so the admin
   has zero runtime icon dependencies. */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Home: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </Base>
  ),
  Calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </Base>
  ),
  Users: (p: IconProps) => (
    <Base {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.8c2.4.5 4 2.6 4 5.2" />
    </Base>
  ),
  Scissors: (p: IconProps) => (
    <Base {...p}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8.2 7.8 20 18M8.2 16.2 20 6M12 12l-3.8 2.8" />
    </Base>
  ),
  Tag: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 11.5V4.5A1.5 1.5 0 0 1 4.5 3h7l9 9-7 7-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </Base>
  ),
  Cart: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
    </Base>
  ),
  Chart: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6M20 16v-9" />
    </Base>
  ),
  Doc: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 2.5h8l5 5V21a.5.5 0 0 1-.5.5H6A.5.5 0 0 1 5.5 21V3A.5.5 0 0 1 6 2.5Z" />
      <path d="M13.5 2.5V8H19M8.5 13h7M8.5 16.5h7" />
    </Base>
  ),
  Megaphone: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l9 4V5L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M16 9a3 3 0 0 1 0 6M7 15v3.5" />
    </Base>
  ),
  Sparkles: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
      <path d="M18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </Base>
  ),
  Settings: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </Base>
  ),
  Search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </Base>
  ),
  Bell: (p: IconProps) => (
    <Base {...p}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Base>
  ),
  Sun: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Base>
  ),
  Moon: (p: IconProps) => (
    <Base {...p}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
    </Base>
  ),
  Plus: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  ),
  Minus: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14" />
    </Base>
  ),
  ChevronLeft: (p: IconProps) => (
    <Base {...p}>
      <path d="m15 6-6 6 6 6" />
    </Base>
  ),
  ChevronRight: (p: IconProps) => (
    <Base {...p}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  ),
  ChevronDown: (p: IconProps) => (
    <Base {...p}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  ),
  Clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  ),
  List: (p: IconProps) => (
    <Base {...p}>
      <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </Base>
  ),
  Heart: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 20s-7-4.3-9.2-8.5C1.2 8.2 2.7 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.3 0 4.8 3.2 3.2 6.5C19 15.7 12 20 12 20Z" />
    </Base>
  ),
  Activity: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 12h4l2.5 7 5-16L17 12h4" />
    </Base>
  ),
  X: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  ),
  Pin: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  ),
  Globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </Base>
  ),
  Help: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.7 1c0 1.7-2.2 2-2.2 3.5M12 17h.01" />
    </Base>
  ),
  Phone: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 4h3.5L10 8l-2 1.5a11 11 0 0 0 4.5 4.5L14 12l4 1.5V17a2 2 0 0 1-2.2 2A14 14 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </Base>
  ),
  Mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Base>
  ),
  Dollar: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 2v20M16.5 6.5C16 5 14.3 4 12 4 9 4 7.5 5.5 7.5 7.5S9 11 12 11.5s4.5 1 4.5 3.5S15 19.5 12 19.5c-2.3 0-4-1-4.5-2.5" />
    </Base>
  ),
};

export type IconKey = keyof typeof Icon;
