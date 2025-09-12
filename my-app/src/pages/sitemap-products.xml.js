
import { getAllProducts } from '../apis/api';

// SAFETY: XML entity escaping function
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// SAFETY: Create clean product slug with proper XML escaping
function createProductSlug(productName) {
  if (!productName) return '';
  
  // Clean product name: spaces to hyphens, remove special chars
  const slug = productName
    .replace(/\s+/g, '-')
    .replace(/[^\w\-&]+/g, '') // Keep & for now, will escape later
    .toLowerCase();
  
  // Then escape XML entities
  return escapeXml(slug);
}

function generateSiteMap(products) {
  const baseUrl = 'https://materialbuy.com';
  
  
  if (!Array.isArray(products) || products.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${escapeXml(baseUrl)}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     </urlset>`;
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${products
       .map((product) => {
         if (!product || !product.productname1 || !product._id) return '';
         
         // Use XML-safe slug generation
         const productSlug = createProductSlug(product.productname1);
         const productUrl = `${baseUrl}/products/${productSlug}/${escapeXml(product._id)}`;
         
         return `
       <url>
           <loc>${productUrl}</loc>
           <lastmod>${new Date(product.updatedAt || new Date()).toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.9</priority>
       </url>`;
       })
       .filter(url => url !== '')
       .join('')}
   </urlset>`;
}

export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  try {
    // Products revalidate every 2 minutes, stale for 3 minutes
    // res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=180');

    res.setHeader('Cache-Control', 'no-store, must-revalidate'); // Fresh data always
    
    console.log('Fetching products for sitemap...');
    const productsResponse = await getAllProducts();
    
    let products = [];
    
    // ENHANCED: Better response parsing
    if (productsResponse?.data?.data && Array.isArray(productsResponse.data.data)) {
      products = productsResponse.data.data;
    } else if (productsResponse?.data && Array.isArray(productsResponse.data)) {
      products = productsResponse.data;
    } else if (Array.isArray(productsResponse)) {
      products = productsResponse;
    } else {
      console.warn('No valid products array found in API response');
      products = [];
    }

    // SAFETY: Double-check products is array
    if (!Array.isArray(products)) {
      console.error('Products is not an array:', typeof products);
      products = [];
    }

    // Safe slice operation
    const limitedProducts = products.length > 0 ? products.slice(0, 10000) : [];
    console.log('Limited products count:', limitedProducts.length);
    
    const sitemap = generateSiteMap(limitedProducts);
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Products sitemap error:', error);
    
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${escapeXml('https://materialbuy.com')}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     </urlset>`;
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(errorSitemap);
    res.end();
    
    return { props: {} };
  }
}
