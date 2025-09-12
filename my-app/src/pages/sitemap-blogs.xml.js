import { SITEMAP_CONFIG } from '../config/sitemap-config';
import {
fetchApiData,
generateSitemapUrl,
createXmlSitemap,
generateSlug
} from '../lib/sitemap-utils';
export default function BlogsSitemap() {
return null;
}
export async function getServerSideProps({ res }) {
try {
// Fetch blog posts from your API
const blogsData = await fetchApiData('/blogs');
if (!blogsData) {
// Return empty sitemap if no blogs
const emptySitemap = createXmlSitemap([]);
res.setHeader('Content-Type', 'text/xml');
res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
res.write(emptySitemap);
res.end();
return { props: {} };
}
const blogs = Array.isArray(blogsData) ? blogsData : blogsData.blogs || [];
const urls = blogs.map(blog => {
if (!blog._id || !blog.title) return null;
const blogSlug = generateSlug(blog.title);
const blogUrl = `${SITEMAP_CONFIG.DOMAIN}/blog/${blogSlug}/${blog._id}`;
return generateSitemapUrl({
loc: blogUrl,
lastmod: blog.updatedAt || blog.createdAt || new Date().toISOString(),
changefreq: SITEMAP_CONFIG.CHANGE_FREQUENCIES.blogs,
priority: SITEMAP_CONFIG.PRIORITIES.blogs
});
}).filter(Boolean);
const sitemapXml = createXmlSitemap(urls);
res.setHeader('Content-Type', 'text/xml');
res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
res.write(sitemapXml);
res.end();
return {
props: {}
};
} catch (error) {
console.error('Error generating blogs sitemap:', error);
const fallbackSitemap = createXmlSitemap([]);
res.setHeader('Content-Type', 'text/xml');
res.write(fallbackSitemap);
res.end();
return {
props: {}
};
}
}