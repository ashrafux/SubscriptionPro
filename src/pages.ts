/** The home page variants. Home One is the original page; Home Two shares its design and swaps some sections; Home Three applies the review-sheet feedback. */
export type PageId = 'home-1' | 'home-2' | 'home-3';

export const pages: { id: PageId; label: string; href: string }[] = [
  { id: 'home-1', label: 'Home One', href: '/' },
  { id: 'home-2', label: 'Home Two', href: '/home-2.html' },
  { id: 'home-3', label: 'Home Three', href: '/home-3.html' },
];
