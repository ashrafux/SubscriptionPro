import type { ComponentType } from 'react';
import { CatalogView, DashboardView, PaymentView, ReferralView, RenewalsView, SupportView } from './Views';

export type Feature = {
  title: string;
  headline: string;
  points: [string, string];
  /** Three colours for the blurred mesh gradient behind the screen, plus a base. */
  gradient: { base: string; a: string; b: string; c: string };
  View: ComponentType;
};

export const features: Feature[] = [
  {
    title: 'Authorized Partner',
    headline: 'Buy straight from official partners, with genuine licenses and full vendor support.',
    points: ['Every license issued through the official partner channel', 'Vendor warranty and support stay fully intact'],
    gradient: { base: '#1e3a8a', a: '#22d3ee', b: '#7c3aed', c: '#0f172a' },
    View: CatalogView,
  },
  {
    title: 'Recurring Discount',
    headline: 'Enjoy consistent savings every time you renew not just a one-time deal.',
    points: ['Get tools at a lower rate than buying directly', 'Up to 40% recurring savings'],
    gradient: { base: '#1e1b4b', a: '#fb923c', b: '#1d4ed8', c: '#e11d48' },
    View: RenewalsView,
  },
  {
    title: 'Convenient Payment',
    headline: 'Fund your wallet once and let every renewal pay itself on time.',
    points: ['Cards, bank transfer and wallet deposits in one checkout', 'Auto-pay renewals straight from your deposit fund'],
    gradient: { base: '#831843', a: '#f472b6', b: '#fdba74', c: '#a855f7' },
    View: PaymentView,
  },
  {
    title: 'Centralized Management',
    headline: 'Every tool, seat and renewal of your SaaS stack on a single dashboard.',
    points: ['See spend, renewal dates and owners at a glance', 'Reassign seats and drop unused licenses in a click'],
    gradient: { base: '#0c4a6e', a: '#67e8f9', b: '#6366f1', c: '#0ea5e9' },
    View: DashboardView,
  },
  {
    title: 'Referral Reward',
    headline: 'Share SubscriptionPro and earn credit on every renewal you bring in.',
    points: ['Earn credit for every team that joins with your link', 'Rewards keep coming on their recurring renewals'],
    gradient: { base: '#134e4a', a: '#bef264', b: '#14b8a6', c: '#065f46' },
    View: ReferralView,
  },
  {
    title: 'Active Support',
    headline: 'Real people and fast answers whenever a renewal needs attention.',
    points: ['Dedicated support over live chat and email', 'Hands-on help with migrations, billing and transfers'],
    gradient: { base: '#3b0764', a: '#f0abfc', b: '#818cf8', c: '#c026d3' },
    View: SupportView,
  },
];
