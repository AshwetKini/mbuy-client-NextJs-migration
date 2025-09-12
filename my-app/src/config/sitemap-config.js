export const SITEMAP_CONFIG = {
  // Your domain URL
  DOMAIN: process.env.NEXT_PUBLIC_SITE_URL || 'https://materialbuy.com',
  // API endpoints for fetching data - FIXED API URL
  API_BASE_URL: 'https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2/api',
  
  // Sitemap settings
  MAX_ITEMS_PER_SITEMAP: 50000, // Google's limit
  
  // Static pages that should be included
  STATIC_ROUTES: [
    { path: '/' },
    { path: '/about' },
    { path: '/contact' },
    { path: '/services' },
    { path: '/professional' },
    { path: '/career' },
    { path: '/pre-fab-house' },
    { path: '/allproducts' },
    { path: '/blog' },
    { path: '/privacy-policy' },
    { path: '/terms' },
    { path: '/shipping-policy' },
    { path: '/return-policy' },
    { path: '/refund-and-cancellation-policy' }
  ]
};
