import type { ReactElement } from 'react';

const INK = '#26333d';

export function HeroArt() {
  return (
    <svg className="people draw" viewBox="0 0 520 380" role="img" aria-label="手をつないで歩く親子のイラスト">
      <path pathLength={1} d="M30 336c90-16 370-16 460 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* つむぎの糸：太陽から親子へ */}
      <path pathLength={1} d="M410 104c-30 40-90 18-120 50-24 26 4 56-30 74" fill="none" stroke="#ffb59a" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1" />
      <circle pathLength={1} className="f" cx="410" cy="78" r="36" fill="#ffd25a" stroke={INK} strokeWidth="3" />
      <path pathLength={1} d="M410 26v-12M456 40l9-9M364 40l-9-9M464 80h12M356 80h-12" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* 大人 */}
      <path pathLength={1} className="f d2" d="M140 336c-6-56 0-102 32-120 36-20 70 4 74 44 4 34-2 58-4 76" fill="#6fb1e3" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle pathLength={1} className="f d2" cx="192" cy="166" r="32" fill="#ffe7d9" stroke={INK} strokeWidth="3" />
      <path pathLength={1} className="f d2" d="M160 150c8-26 58-28 66 2-18-8-46-10-66-2z" fill="#3e3128" stroke={INK} strokeWidth="2" />
      <path pathLength={1} d="M180 166h.1M204 166h.1" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path pathLength={1} d="M184 180c5 5 12 5 17 0" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* 子ども */}
      <path pathLength={1} className="f d3" d="M286 336c-2-34 2-62 24-74 24-12 46 4 48 28 2 20-2 34-4 46" fill="#ffb59a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle pathLength={1} className="f d3" cx="320" cy="230" r="25" fill="#ffe7d9" stroke={INK} strokeWidth="3" />
      <path pathLength={1} className="f d3" d="M296 222c4-18 42-20 48 0-14-6-34-6-48 0z" fill="#7a5a3c" stroke={INK} strokeWidth="2" />
      <path pathLength={1} d="M311 230h.1M329 230h.1" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      <path pathLength={1} d="M314 241c3 3 8 3 11 0" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      {/* つないだ手 */}
      <path pathLength={1} d="M240 266c14-6 28-6 46 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* 葉っぱ */}
      <path pathLength={1} className="f" d="M64 286c6-26 24-38 38-34-2 16-16 32-38 34zM88 298c-2-22 6-38 20-40 2 16-6 32-20 40z" fill="#7cc49a" stroke={INK} strokeWidth="2.5" />
      <path pathLength={1} className="f d3" d="M452 300c-6-20 4-36 18-38 4 14-4 30-18 38z" fill="#7cc49a" stroke={INK} strokeWidth="2.5" />
    </svg>
  );
}

export function MapArt() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="つむぎ台駅北口から徒歩3分の地図（イメージ）">
      <rect width="320" height="200" fill="#eef6ee" />
      <path d="M0 150h320" stroke="#c9d6de" strokeWidth="18" />
      <path d="M0 150h320" stroke="#fff" strokeWidth="2" strokeDasharray="10 10" />
      <path d="M200 0v200" stroke="#c9d6de" strokeWidth="14" />
      <rect x="30" y="160" width="120" height="26" rx="6" fill="#6fb1e3" stroke={INK} strokeWidth="2" />
      <text x="90" y="178" fontSize="12" textAnchor="middle" fill="#fff" fontWeight="700">
        つむぎ台駅
      </text>
      <path d="M120 160c10-40 40-60 90-80" fill="none" stroke="#ffb59a" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <circle cx="232" cy="70" r="16" fill="#ffd25a" stroke={INK} strokeWidth="2.4" />
      <path d="M226 70h12M232 64v12" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <text x="252" y="58" fontSize="11" fill={INK} fontWeight="700">
        当院
      </text>
      <text x="138" y="122" fontSize="10" fill="#566874">
        徒歩3分
      </text>
    </svg>
  );
}

export type Symptom = 'fever' | 'cough' | 'stomach' | 'vaccine' | 'bp' | 'checkup' | 'allergy' | 'online';

const SYMPTOM_ICONS: Record<Symptom, ReactElement> = {
  fever: (
    <>
      <path d="M22 8a5 5 0 0 1 10 0v22a9 9 0 1 1-10 0z" fill="#fff" stroke={INK} strokeWidth="2.6" />
      <circle cx="27" cy="37" r="5" fill="#ffb59a" />
      <path d="M27 16v18" stroke="#ffb59a" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  cough: (
    <>
      <circle cx="22" cy="26" r="14" fill="#ffe7d9" stroke={INK} strokeWidth="2.6" />
      <path d="M16 30c3 2 8 2 10-1" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M38 18c4 2 6 6 6 8M40 26h6M38 34c4-2 6-4 6-6" stroke="#6fb1e3" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </>
  ),
  stomach: (
    <>
      <ellipse cx="26" cy="28" rx="15" ry="14" fill="#ffb59a" stroke={INK} strokeWidth="2.6" />
      <path d="M20 26c4 4 8 4 12 0M18 34c2 1 4 1 6 0M28 34c2 1 4 1 6 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  vaccine: (
    <>
      <rect x="12" y="10" width="28" height="34" rx="6" fill="#7cc49a" stroke={INK} strokeWidth="2.6" />
      <path d="M19 20h14M19 27h14M19 34h8" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="38" cy="38" r="7" fill="#ffd25a" stroke={INK} strokeWidth="2.2" />
      <path d="M35 38l2 2 4-4" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  bp: (
    <>
      <path d="M26 42s-15-9-15-20a7.5 7.5 0 0 1 15-3 7.5 7.5 0 0 1 15 3c0 11-15 20-15 20z" fill="#ffb59a" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M14 26h7l3-5 4 9 3-4h7" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  checkup: (
    <>
      <rect x="10" y="8" width="26" height="36" rx="5" fill="#fff" stroke={INK} strokeWidth="2.6" />
      <path d="M16 18h14M16 25h14M16 32h8" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="37" cy="34" r="8" fill="#6fb1e3" stroke={INK} strokeWidth="2.4" />
      <path d="M43 40l5 5" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  allergy: (
    <>
      <path d="M14 38c4-16 18-22 26-22-2 10-10 22-26 22z" fill="#7cc49a" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M14 38c6-6 12-10 18-14" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2.4" fill="#ffd25a" stroke={INK} strokeWidth="1.6" />
      <circle cx="22" cy="10" r="2" fill="#ffd25a" stroke={INK} strokeWidth="1.6" />
      <circle cx="10" cy="22" r="2" fill="#ffd25a" stroke={INK} strokeWidth="1.6" />
    </>
  ),
  online: (
    <>
      <rect x="8" y="12" width="36" height="24" rx="4" fill="#6fb1e3" stroke={INK} strokeWidth="2.6" />
      <circle cx="26" cy="22" r="5" fill="#ffe7d9" stroke={INK} strokeWidth="2" />
      <path d="M19 34c1-4 4-6 7-6s6 2 7 6" fill="#fff" stroke={INK} strokeWidth="2" />
      <path d="M20 42h12M26 36v6" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
};

export function SymptomIcon({ name }: { name: Symptom }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      {SYMPTOM_ICONS[name]}
    </svg>
  );
}
