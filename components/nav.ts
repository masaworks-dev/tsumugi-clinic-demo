import type { ComponentType } from 'react';
import { IconBooking, IconDoctor, IconFirst, IconMedical, IconNews, IconPrice } from './icons';

export type NavItem = { href: string; label: string; Icon: ComponentType };

export const NAV_LEFT: readonly NavItem[] = [
  { href: '/first/', label: 'はじめての方へ', Icon: IconFirst },
  { href: '/#medical', label: '診療案内', Icon: IconMedical },
  { href: '/#doctor', label: '医師紹介', Icon: IconDoctor },
];

export const NAV_RIGHT: readonly NavItem[] = [
  { href: '/#news', label: 'お知らせ', Icon: IconNews },
  { href: '/price/', label: '料金案内', Icon: IconPrice },
  { href: '/booking/', label: 'ご予約', Icon: IconBooking },
];

export const CLINIC_NAME = 'つむぎ内科・こどもクリニック';
export const DEMO_TEL = '03-0000-0000';
