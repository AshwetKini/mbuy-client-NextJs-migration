import { SITEMAP_CONFIG } from '../config/sitemap-config';
import { generateSitemapIndexEntry, createSitemapIndex } from '../lib/sitemap-utils';

export default function SitemapIndex() {
  return null;
}

export async function getServerSideProps({ res }) {
  try {
    //  IMPROVED: Use more realistic lastmod dates
    const now = new Date();
    const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    const monthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const sitemaps = [
      generateSitemapIndexEntry(
        `${SITEMAP_CONFIG.DOMAIN}/sitemap-static.xml`,
        weekAgo.toISOString()
      ),
      generateSitemapIndexEntry(
        `${SITEMAP_CONFIG.DOMAIN}/sitemap-products.xml`,
        now.toISOString()
      ),

      generateSitemapIndexEntry(
        `${SITEMAP_CONFIG.DOMAIN}/sitemap-categories.xml`,
        now.toISOString()
      ),
      generateSitemapIndexEntry(
        `${SITEMAP_CONFIG.DOMAIN}/sitemap-blogs.xml`,
        weekAgo.toISOString()
      ),
      generateSitemapIndexEntry(
        `${SITEMAP_CONFIG.DOMAIN}/sitemap-subcategories.xml`,
        now.toISOString() 
      )

    ];

    const sitemapXml = createSitemapIndex(sitemaps);

    res.setHeader('Content-Type', 'text/xml');
    // res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.setHeader('Cache-Control', 'no-store, must-revalidate'); // Fresh sitemap index
    res.write(sitemapXml);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    
    const fallbackSitemap = createSitemapIndex([
      generateSitemapIndexEntry(`${SITEMAP_CONFIG.DOMAIN}/sitemap-static.xml`)
    ]);
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(fallbackSitemap);
    res.end();

    return { props: {} };
  }
}
