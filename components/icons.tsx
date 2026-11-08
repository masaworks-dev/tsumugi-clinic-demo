const INK = '#26333d';

export const IconFirst = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 40V22" stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
    <path d="M24 26c-2-8-9-11-15-10 0 7 6 12 15 10z" fill="#7cc49a" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M24 22c1-8 8-12 15-11 0 8-7 12-15 11z" fill="#a8dcbc" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M14 41h20" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

export const IconMedical = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M14 8v10a8 8 0 0 0 16 0V8" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M22 26v6a7 7 0 0 0 14 0v-4" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="36" cy="25" r="5" fill="#6fb1e3" stroke={INK} strokeWidth="2.4" />
    <circle cx="14" cy="8" r="2.4" fill={INK} />
    <circle cx="30" cy="8" r="2.4" fill={INK} />
  </svg>
);

export const IconDoctor = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M10 44c1-9 7-13 14-13s13 4 14 13" fill="#ffffff" stroke={INK} strokeWidth="2.4" />
    <path d="M20 31l4 7 4-7" fill="none" stroke={INK} strokeWidth="2.2" />
    <circle cx="24" cy="19" r="10" fill="#ffe7d9" stroke={INK} strokeWidth="2.4" />
    <path d="M14 17c2-8 18-9 20 0" fill="#5c4634" />
    <path d="M20 19h.1M28 19h.1" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
    <path d="M21 24c2 2 4 2 6 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconNews = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M8 12h32a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H22l-9 7v-7H8a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" fill="#ffb59a" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M14 21h20M14 27h12" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const IconPrice = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="25" r="16" fill="#ffd25a" stroke={INK} strokeWidth="2.4" />
    <path d="M17 16l7 9 7-9M24 25v10M18 26h12M18 31h12" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconBooking = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <rect x="7" y="10" width="34" height="31" rx="6" fill="#ffffff" stroke={INK} strokeWidth="2.4" />
    <path d="M7 19h34" stroke={INK} strokeWidth="2.4" />
    <path d="M16 6v8M32 6v8" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M17 30l5 5 9-10" fill="none" stroke="#2f7d52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconMenu = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const IconCalendar = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke={INK} strokeWidth="2" />
    <path d="M3 10h18M8 2v5M16 2v5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconPhone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 3h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2z" fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconLineSmall = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3C6.5 3 3 6.4 3 10.3c0 3.4 2.9 6.2 7 6.9l-.5 3 3.8-2.8C18 17.4 21 14.2 21 10.3 21 6.4 17.5 3 12 3z" fill="#fff" />
  </svg>
);

export const LogoMark = ({ small = false }: { small?: boolean }) => (
  <svg viewBox="0 0 70 60" aria-hidden="true">
    <circle cx="30" cy="30" r="20" fill="#ffd25a" stroke="#2c6f86" strokeWidth="2.6" />
    <path d="M14 22c10 4 22 4 32 0M11 32c12 5 26 5 38 0M16 42c9 3 19 3 28 0" fill="none" stroke="#2c6f86" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M48 38c8 4 12 0 14-5 2-6 6-6 7-4" fill="none" stroke="#2c6f86" strokeWidth="2.6" strokeLinecap="round" />
    {!small && <path d="M58 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#7cc49a" />}
  </svg>
);

export const Squiggle = ({ color }: { color: string }) => (
  <svg viewBox="0 0 34 22" aria-hidden="true">
    <path d="M2 14c7-10 12 4 19-5s10 3 10 3" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);
