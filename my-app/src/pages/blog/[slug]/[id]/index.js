import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Layout from '../../../../Layouts/Layout'; // Adjust the path to your Layout component
import { getBlogById } from '../../../../apis/api';
import { convertOffsetToTimes } from 'framer-motion';

// --- Helper Function ---
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const SingleBlogPage = ({ blog }) => {
    return (
        <Layout>
            <Head>
                {/* This handles the <title> and <meta> tags for SEO */}
                <title>{blog.metaTitle || blog.title}</title>
                <meta name="description" content={blog.metaDescription || `Read the blog post: ${blog.title}`} />
            </Head>

            <div className="bg-white">
                <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <article>
                        <header className="mb-8">
                            <Link href="/blog" className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-semibold transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to All Blogs
                            </Link>
                            <p className="text-base font-semibold text-blue-600 uppercase tracking-wide">
                                {blog.category}
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {blog.title}
                            </h1>
                            <p className="mt-4 text-sm text-gray-500">
                                Published on <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
                            </p>
                        </header>

                        {blog.featuredImage && (
                            <div className="my-8 rounded-lg overflow-hidden shadow-lg aspect-video relative">
                                <Image
                                    src={blog.featuredImage}
                                    alt={`Featured image for ${blog.title}`}
                                    layout="fill"
                                    objectFit="cover"
                                    priority // Load this image first as it's the main content
                                />
                            </div>
                        )}
                z
                        <div
                            className="prose prose-lg lg:prose-xl max-w-none mt-12"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </article>
                </div>
            </div>
        </Layout>
    );
};

export default SingleBlogPage;


export async function getServerSideProps(context) {
    const { slug ,id } = context.params; 
    try {
        const res = await fetch(`https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2/api/blogs/${id}`);
        const data = await res.json();
        if (!data || !data.blog) return { notFound: true };
        return { props: { blog: data.blog } };
    } catch (error) {
        return { notFound: true };
    }
}