'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Clock, Calendar, ThumbsUp, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post, Category } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';

const POSTS_PER_PAGE = 8;

function CleanCard({ post }: { post: Post }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative flex flex-col p-5 sm:p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-blue-500/50 transition-colors h-full"
        >
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl" />

            <div className="flex items-center gap-3 mb-4 font-medium text-xs text-[var(--text-muted)]">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-base">
                    {post.emoji}
                </span>
                <span className="text-blue-400 font-semibold">{post.category}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
            </div>

            <h3 className="font-bold text-xl leading-snug line-clamp-2 text-[var(--text-primary)] group-hover:text-blue-400 transition-colors mb-2">
                {post.title}
            </h3>

            <p className="text-sm leading-relaxed line-clamp-2 mt-2 mb-6 flex-1 text-[var(--text-secondary)]">
                {post.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                <div className="flex gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-3 font-medium text-[11px] text-[var(--text-muted)] shrink-0">
                    <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}m
                    </div>
                    {post.score !== undefined && post.score !== 0 ? (
                        <div className={`flex items-center gap-1 ${post.score > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <ThumbsUp size={11} className={post.score > 0 ? 'fill-green-500/20' : 'fill-red-500/20'} />
                            {post.score > 0 ? `+${post.score}` : post.score}
                        </div>
                    ) : null}
                </div>
            </div>
        </motion.article>
    );
}

export default function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    const categories = useMemo(() => {
        const unique = new Set(initialPosts.map(p => p.category));
        return ['All', ...Array.from(unique).sort()];
    }, [initialPosts]);

    const filteredAndSorted = useMemo(() => {
        const q = search.toLowerCase();
        let results = initialPosts.filter(p => {
            const matchesCat = activeCategory === 'All' || p.category === activeCategory;
            const matchesSearch = !q ||
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q)) ||
                p.category.toLowerCase().includes(q);
            return matchesCat && matchesSearch;
        });

        return results.sort((a, b) => {
            const dateA = new Date(a.publishedAt).getTime();
            const dateB = new Date(b.publishedAt).getTime();
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [search, activeCategory, sortBy, initialPosts]);

    const gridPosts = filteredAndSorted.slice(0, visibleCount);
    const hasMore = visibleCount < filteredAndSorted.length;

    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">

            {/* Header */}
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8 mb-12 sm:mb-16">
                <h1 className="text-4xl sm:text-7xl font-black tracking-tighter mb-4 sm:mb-6 text-[var(--text-primary)] leading-[0.9]">
                    Technical / <br />
                    <span className="text-[var(--accent-blue)]">Blog.</span>
                </h1>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl border-l-2 border-[var(--border)] pl-4 sm:pl-6 py-1">
                    Essays on building scalable ML infrastructure, cloud architecture, and the craft of engineering.
                </p>

                {/* Search & Filter Controls */}
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)]">
                    {/* Search Bar */}
                    <div className="relative flex-1 group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-blue)] transition-colors" />
                        <input
                            type="text"
                            placeholder="Enter a topic or search..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setVisibleCount(POSTS_PER_PAGE); }}
                            className="w-full pl-11 pr-10 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all outline-none"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors outline-none">
                                <X size={15} />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Category Dropdown */}
                        <div className="relative">
                            <select
                                value={activeCategory}
                                onChange={(e) => { setActiveCategory(e.target.value); setVisibleCount(POSTS_PER_PAGE); }}
                                className="w-full sm:w-44 px-4 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] appearance-none cursor-pointer hover:border-[var(--text-muted)] transition-all"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                                <span className="text-[10px]">▼</span>
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                                className="w-full sm:w-40 px-4 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] appearance-none cursor-pointer hover:border-[var(--text-muted)] transition-all"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)] text-[10px]">
                                <span>▼</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
                <AnimatePresence mode="popLayout">
                    {gridPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {gridPosts.map(post => (
                                <CleanCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 rounded-xl bg-[var(--bg-card)] border border-dashed border-[var(--border)]"
                        >
                            <p className="text-[var(--text-muted)] text-sm mb-4 font-medium">No results found</p>
                            <button
                                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                                className="px-5 py-2 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] text-sm transition-colors font-medium"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load More */}
                {hasMore && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setVisibleCount(c => c + POSTS_PER_PAGE)}
                            className="px-6 py-2.5 rounded text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
