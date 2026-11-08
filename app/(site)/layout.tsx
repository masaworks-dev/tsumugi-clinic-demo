import type { ReactNode } from 'react';
import './site.css';
import { ClinicProvider } from '@/components/ClinicProvider';
import { DemoBar, MobileBar, PageEffects, SideNav, StickyHeader } from '@/components/chrome';
import { CloudBand, SiteFooter, SiteHeader } from '@/components/layout-parts';
import { Overlays } from '@/components/overlays';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ClinicProvider>
      <DemoBar />
      <div className="thread-top" aria-hidden="true" />
      <SiteHeader />
      <StickyHeader />
      <SideNav />
      {children}
      <CloudBand />
      <SiteFooter />
      <MobileBar />
      <Overlays />
      <PageEffects />
    </ClinicProvider>
  );
}
