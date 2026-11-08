import type { ReactNode } from 'react';
import { CLINIC_NAME } from './nav';

export function LinePhone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="phone" aria-label={label}>
      <div className="acc">
        <i>つ</i>
        {CLINIC_NAME}
      </div>
      {children}
    </div>
  );
}
