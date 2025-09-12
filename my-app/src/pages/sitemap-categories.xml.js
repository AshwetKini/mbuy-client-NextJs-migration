// // pages/sitemap-categories.xml.js
// import { getCategories } from '../apis/api';

// // SAFETY: XML entity escaping function
// function escapeXml(unsafe) {
//   if (!unsafe) return '';
//   return unsafe
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&apos;');
// }

// // SAFETY: Create clean slug with proper XML escaping
// function createCategorySlug(title) {
//   if (!title) return '';
  
//   // First create the slug (spaces to hyphens)
//   const slug = title.replace(/\s+/g, '-');
  
//   // Then escape XML entities
//   return escapeXml(slug);
// }

// function generateSiteMap(categories) {
//   const baseUrl = 'https://materialbuy.com';
  
//   // SAFETY: Ensure categories is an array
//   if (!Array.isArray(categories) || categories.length === 0) {
//     return `<?xml version="1.0" encoding="UTF-8"?>
//      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//        <url>
//          <loc>${escapeXml(baseUrl)}</loc>
//          <lastmod>${new Date().toISOString()}</lastmod>
//        </url>
//      </urlset>`;
//   }
  
//   return `<?xml version="1.0" encoding="UTF-8"?>
//    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//      ${categories
//        .map((category) => {
//          if (!category || !category.title) return '';
         
//          // Use XML-safe slug generation
//          const categorySlug = createCategorySlug(category.title);
//          const categoryUrl = `${baseUrl}/allproducts/${categorySlug}`;
         
//          return `
//        <url>
//            <loc>${categoryUrl}</loc>
//            <lastmod>${new Date().toISOString()}</lastmod>
//            <changefreq>weekly</changefreq>
//            <priority>0.8</priority>
//        </url>`;
//        })
//        .filter(url => url !== '')
//        .join('')}
//    </urlset>`;
// }

// export default function SiteMap() {
//   return null;
// }

// export async function getServerSideProps({ res }) {
//   try {
//     // Categories revalidate every 7 hours
//     res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=180');
    
//     console.log('Fetching categories for sitemap...');
//     const categoriesResponse = await getCategories();
    
//     let categories = [];
    
//     if (categoriesResponse?.data?.data && Array.isArray(categoriesResponse.data.data)) {
//       categories = categoriesResponse.data.data;
//     } else if (categoriesResponse?.data && Array.isArray(categoriesResponse.data)) {
//       categories = categoriesResponse.data;
//     } else if (Array.isArray(categoriesResponse)) {
//       categories = categoriesResponse;
//     } else {
//       console.warn('No valid categories array found in API response');
//       categories = [];
//     }

//     // SAFETY: Ensure categories is array
//     if (!Array.isArray(categories)) {
//       console.error('Categories is not an array:', typeof categories);
//       categories = [];
//     }

//     console.log('Categories count:', categories.length);
//     const sitemap = generateSiteMap(categories);
    
//     res.setHeader('Content-Type', 'text/xml');
//     res.write(sitemap);
//     res.end();

//     return { props: {} };
//   } catch (error) {
//     console.error('Categories sitemap error:', error);
    
//     const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
//      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//        <url>
//          <loc>${escapeXml('https://materialbuy.com')}</loc>
//          <lastmod>${new Date().toISOString()}</lastmod>
//        </url>
//      </urlset>`;
    
//     res.setHeader('Content-Type', 'text/xml');
//     res.write(errorSitemap);
//     res.end();
    
//     return { props: {} };
//   }
// }

//for ampersand changes
import { getCategories } from '../apis/api';

// UPDATED: Create super clean slug (remove & and special chars)
function createCleanCategorySlug(title) {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')        // Replace " & " with "-"
    .replace(/\s+/g, '-')            // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')        // Remove all special chars except hyphens
    .replace(/\-\-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-+/, '')              // Trim hyphens from start
    .replace(/-+$/, '');             // Trim hyphens from end
}

function generateSiteMap(categories) {
  const baseUrl = 'https://materialbuy.com';
  
  if (!Array.isArray(categories) || categories.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${baseUrl}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     </urlset>`;
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${categories
       .map((category) => {
         if (!category || !category.title) return '';
         
         // Create clean slug: "Bed & Bath" → "bed-bath"
         const categorySlug = createCleanCategorySlug(category.title);
         const categoryUrl = `${baseUrl}/allproducts/${categorySlug}`;
         
         return `
       <url>
           <loc>${categoryUrl}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
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
    // res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=180');
    res.setHeader('Cache-Control', 'no-store, must-revalidate'); // Fresh data always
    
    const categoriesResponse = await getCategories();
    let categories = [];
    
    if (categoriesResponse?.data?.data && Array.isArray(categoriesResponse.data.data)) {
      categories = categoriesResponse.data.data;
    } else if (categoriesResponse?.data && Array.isArray(categoriesResponse.data)) {
      categories = categoriesResponse.data;
    } else if (Array.isArray(categoriesResponse)) {
      categories = categoriesResponse;
    } else {
      categories = [];
    }

    if (!Array.isArray(categories)) {
      categories = [];
    }

    const sitemap = generateSiteMap(categories);
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Categories sitemap error:', error);
    
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>https://materialbuy.com</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     </urlset>`;
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(errorSitemap);
    res.end();
    
    return { props: {} };
  }
}

