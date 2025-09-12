import { getAllProducts } from '../apis/api';

function createSlug(text) {
  if (!text) return '';

  return text
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateSitemapXML(pairs) {
  const baseUrl = 'https://materialbuy.com';

  if (!Array.isArray(pairs) || pairs.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;
  }

  const urlEntries = pairs.map(({ category, subcategory }) => {
    const catSlug = createSlug(category);
    const subSlug = createSlug(subcategory);
    return `
  <url>
    <loc>${baseUrl}/allproducts/${encodeURIComponent(catSlug)}/${encodeURIComponent(subSlug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  try {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');

    // Fetch all products
    const productsResponse = await getAllProducts();
    console.log('Raw products API response:', productsResponse);
    let products = [];

    if (
      productsResponse?.data?.data &&
      Array.isArray(productsResponse.data.data.products)
    ) {
      products = productsResponse.data.data.products;
    } else if (productsResponse?.data && Array.isArray(productsResponse.data)) {
      products = productsResponse.data;
    } else if (Array.isArray(productsResponse)) {
      products = productsResponse;
    }

    console.log(`Products fetched: ${products.length}`);
    if (products.length > 0) {
      console.log('First product example:', products[0]);
    }

    // Build unique category-subcategory pairs
    const pairsMap = new Map();
    products.forEach(product => {
      const category = product.categoryid || product.categorySlug || product.category;
      const subcategory = product.subcategory || product.subcategoryname || product.subcategorySlug;
      if (category && subcategory) {
        pairsMap.set(`${category}:::${subcategory}`, { category, subcategory });
      }
    });

    console.log(`Unique category-subcategory pairs: ${pairsMap.size}`);

    const uniquePairs = Array.from(pairsMap.values());

    // Generate sitemap XML
    const sitemapXml = generateSitemapXML(uniquePairs);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap-subcategories:', error);

    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://materialbuy.com</loc><lastmod>${new Date().toISOString()}</lastmod></url>
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(fallbackSitemap);
    res.end();

    return { props: {} };
  }
}
