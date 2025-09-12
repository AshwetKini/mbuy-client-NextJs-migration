import { SITEMAP_CONFIG } from '../config/sitemap-config';
import { generateSitemapUrl, createXmlSitemap } from '../lib/sitemap-utils';

export default function StaticSitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  try {
    // Use realistic lastmod dates for different page types
    const policyLastMod = '2024-12-01T00:00:00.000Z';
    const contentLastMod = '2025-08-31T00:00:00.000Z'; 
    const homeLastMod = '2025-09-01T00:00:00.000Z';

    const urls = SITEMAP_CONFIG.STATIC_ROUTES.map(route => {
      let lastmod;
      if (route.path === '/') {
        lastmod = homeLastMod;
      } else if (route.path.includes('policy') || route.path === '/terms') {
        lastmod = policyLastMod;
      } else {
        lastmod = contentLastMod;
      }

      return generateSitemapUrl({
        loc: `${SITEMAP_CONFIG.DOMAIN}${route.path}`,
        lastmod: lastmod
        // ✅ REMOVED: changefreq and priority
      });
    });

    const sitemapXml = createXmlSitemap(urls);
    
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemapXml);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating static sitemap:', error);
    
    const fallbackUrls = [
      generateSitemapUrl({
        loc: SITEMAP_CONFIG.DOMAIN,
        lastmod: new Date().toISOString()
      })
    ];
    
    const fallbackSitemap = createXmlSitemap(fallbackUrls);
    res.setHeader('Content-Type', 'text/xml');
    res.write(fallbackSitemap);
    res.end();

    return { props: {} };
  }
}
