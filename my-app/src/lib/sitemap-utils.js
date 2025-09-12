// src/Lib/sitemap-utils.js

import { SITEMAP_CONFIG } from '../config/sitemap-config';

/**
 * Fetch data from API with error handling
 */
export async function fetchApiData(endpoint, options = {}) {
  try {
    const fullUrl = `${SITEMAP_CONFIG.API_BASE_URL}${endpoint}`;
    console.log(`🔍 Fetching sitemap data from: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: 10000,
      ...options
    });
    
    if (!response.ok) {
      console.error(`❌ API Error: ${endpoint} - Status: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    console.log(`✅ API Success: ${endpoint}`);
    return data;
    
  } catch (error) {
    console.error(`❌ Fetch Error for ${endpoint}:`, error.message);
    return null;
  }
}

/**
 * Escape XML special characters
 */
export function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Helper: Remove all HTML tags from a string
 */
function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Generate XML sitemap URL entry (cleaned up with plain-text captions)
 */
export function generateSitemapUrl({
  loc,
  lastmod = null,
  images = []
}) {
  const lastmodTag = lastmod
    ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>`
    : '';

  const imageXml = images.length > 0
    ? images.map(img => {
        const captionText = stripHtml(img.caption);
        return `
        <image:image>
          <image:loc>${escapeXml(img.url)}</image:loc>
          <image:title>${escapeXml(img.title || '')}</image:title>
          <image:caption>${escapeXml(captionText)}</image:caption>
        </image:image>`;
      }).join('')
    : '';

  return `
    <url>
      <loc>${escapeXml(loc)}</loc>
      ${lastmodTag}
      ${imageXml}
    </url>`;
}

/**
 * Generate sitemap index entry
 */
export function generateSitemapIndexEntry(sitemapUrl, lastmod = null) {
  const lastmodTag = lastmod
    ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>`
    : '';

  return `
    <sitemap>
      <loc>${escapeXml(sitemapUrl)}</loc>
      ${lastmodTag}
    </sitemap>`;
}

/**
 * Create complete XML sitemap structure
 */
export function createXmlSitemap(urls, includeImages = false) {
  const xmlns = includeImages
    ? 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${xmlns}>
  ${urls.join('')}
</urlset>`.trim();
}

/**
 * Create sitemap index XML
 */
export function createSitemapIndex(sitemaps) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.join('')}
</sitemapindex>`.trim();
}

/**
 * Generate URL slug from text
 */
export function generateSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get product images for sitemap
 */
export function getProductImages(product) {
  const images = [];
  ['imgs1', 'imgs2', 'imgs3', 'imgs4'].forEach(field => {
    if (product[field]) {
      images.push({
        url: product[field].startsWith('http')
          ? product[field]
          : `${SITEMAP_CONFIG.DOMAIN}${product[field]}`,
        title: product.productname1 || '',
        caption: product.description12 || ''
      });
    }
  });
  return images;
}
