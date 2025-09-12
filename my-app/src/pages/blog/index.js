import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { getBlogCategories, getAllBlogs, getBlogTags } from '../../apis/api';

// --- Helper Functions ---

/**
 * Strips HTML tags from a string to display a clean text preview.
 * @param {string} html - The HTML string to clean.
 * @returns {string} - The plain text string.
 */
const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
};

/**
 * Formats a date string into a more readable format.
 * e.g., "July 13, 2025"
 * @param {string} dateString - The ISO date string.
 * @returns {string} - The formatted date string.
 */
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};


// --- Child Components ---

// A placeholder for when a blog post doesn't have a featured image.
const PlaceholderImage = () => (
    <div className="flex items-center justify-center h-48 bg-gray-200 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    </div>
);

// The component for rendering a single blog post card.
import { Eye } from "lucide-react";

const BlogCard = ({ blog }) => {
    const cleanExcerpt =
        stripHtml(blog.excerpt) || stripHtml(blog.content).substring(0, 100) + "...";
    const displayDate = formatDate(blog.createdAt);
    const blogUrl = `/blog/${blog.slug}/${blog._id}`;

    return (
        <div className="w-full mx-auto rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative group">
                <img
                    src={blog.featuredImage}
                    alt={`Featured image for ${blog.title}`}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center h-full justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-sm font-medium flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Read More
                    </div>
                </div>
            </div>

            <div className="p-5">
                <p className="text-sm text-blue-600 font-medium mb-1">{blog.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2">
                    {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{cleanExcerpt}</p>
                <a
                    href={`/blog/${blog.slug}/${blog._id}`}
                    className="inline-block text-sm px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Read More
                </a>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 border-t px-5 py-3">
                <span>
                    <time dateTime={blog.createdAt}>{displayDate}</time>
                </span>
            </div>
        </div>
    );
};




// --- Main Page Component ---

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    // Fetch categories and tags for filters
    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const [catRes, tagRes] = await Promise.all([
                    getBlogCategories(),
                    getBlogTags(),
                ]);
                setCategories(catRes.categories || []);
                setTags(tagRes.tags || []);
            } catch (e) {
                // ignore
            }
        };
        fetchMeta();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('Calling getAllBlogs with:', { page, limit: 12, category: selectedCategory, tags: selectedTag, search });
                const response = await getAllBlogs({
                    page,
                    limit: 12,
                    category: selectedCategory,
                    tags: selectedTag,
                    search,
                });
                console.log('getAllBlogs response:', response);
                if (!response.success) throw new Error(response.error || 'Failed to fetch');
                setBlogs(response.blogs || []);
                setTotalPages(response.pagination?.totalPages || 1);
            } catch (e) {
                console.error('getAllBlogs error:', e);
                setError("Sorry, we couldn't load the blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [page, selectedCategory, selectedTag, search]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setPage(1);
    };
    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
        setPage(1);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };
    const handleClearFilters = () => {
        setSelectedCategory('');
        setSelectedTag('');
        setSearch('');
        setSearchInput('');
        setPage(1);
    };

    const renderContent = () => {
        if (loading) {
            return <div className="text-center py-10">Loading posts...</div>;
        }
        if (error) {
            return <div className="text-center py-10 text-red-500">{error}</div>;
        }
        if (blogs.length === 0) {
            return <div className="text-center py-10">No blog posts found.</div>;
        }
        return (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        );
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 rounded-md mx-1 ${i === page ? 'bg-blue-950 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="flex justify-center mt-10">{pages}</div>
        );
    };

    return (
        <Layout>
            <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className='max-w-7xl mx-auto'>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                From Our Blog
                            </h2>
                            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                                Latest news, articles, and insights from our team.
                            </p>
                        </div>
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 items-center justify-end">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat, idx) => (
                                    <option key={cat + idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                value={selectedTag}
                                onChange={handleTagChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Tags</option>
                                {tags.map((tag, idx) => (
                                    <option key={tag + idx} value={tag}>{tag}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="ml-2 text-sm text-gray-500 hover:underline"
                            >
                                Clear
                            </button>
                        </form>
                    </div>
                    <div className="mt-12">
                        {renderContent()}
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blogs;