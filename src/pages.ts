/** The home page variants. Home One is the original page; Home Two shares its design and swaps some sections. */
export type PageId = 'home-1' | 'home-2';

export const pages: { id: PageId; label: string; href: string }[] = [
  { id: 'home-1', label: 'Home One', href: '/' },
  { id: 'home-2', label: 'Home Two', href: '/home-2.html' },
];
