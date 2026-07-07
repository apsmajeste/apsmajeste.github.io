/* ============================================================
   APS MAJESTE — Shared site data (brand, nav)
   ============================================================ */

export const SITE = {
  brand: 'APS MAJESTE',
  brandPrefix: 'APS',
  brandMain: 'MAJESTE',
  brandAccent: '',
  tagline: 'Majestic Personal Care, Crafted with Intention',
  domain: 'https://apsmajeste.in',
  email: 'concierge@apsmajeste.in',
  phone: '+91 294 123 4567',
  address: {
    line1: 'Lake Palace Road',
    city: 'Udaipur',
    region: 'Rajasthan',
    postalCode: '313001',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/apsmajeste',
    pinterest: 'https://pinterest.com/apsmajeste',
    tiktok: 'https://tiktok.com/@apsmajeste',
  },
  founded: 2019,
  amazonStore: 'https://www.amazon.in/s?k=APS+MAJESTE',
};

/**
 * Build a base-path-aware internal URL.
 *
 * Vite's `--base` flag rewrites asset references but NOT <a href> links,
 * so navigation links must be prefixed with import.meta.env.BASE_URL
 * to work on GitHub Pages project sites (e.g. /apsmajeste/about.html).
 *
 *   link('about.html')      → '/about.html'                (dev / user site)
 *   link('about.html')      → '/apsmajeste/about.html'     (project site)
 *   link('product.html?id=rose')  → '/apsmajeste/product.html?id=rose'
 */
export function link(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // strip trailing slash
  const clean = path.replace(/^\//, ''); // strip leading slash from input
  return `${base}/${clean}`;
}

export const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'products.html', label: 'Products' },
  { href: 'why-choose-us.html', label: 'Why APS MAJESTE' },
  { href: 'contact.html', label: 'Contact' },
];

export const FOOTER_LINKS = {
  shop: [
    { href: 'products.html', label: 'All Products' },
    { href: 'products.html#face-wash', label: 'Face Wash' },
    { href: 'products.html#perfumes', label: 'Perfumes' },
  ],
  company: [
    { href: 'about.html', label: 'Our Story' },
    { href: 'why-choose-us.html', label: 'Why APS MAJESTE' },
    { href: 'contact.html', label: 'Contact' },
    { href: 'products.html', label: 'Browse Products' },
  ],
  legal: [
    { href: 'privacy-policy.html', label: 'Privacy Policy' },
    { href: 'terms.html', label: 'Terms & Conditions' },
    { href: 'contact.html', label: 'Customer Care' },
    { href: 'admin/', label: 'Admin' },
  ],
};
