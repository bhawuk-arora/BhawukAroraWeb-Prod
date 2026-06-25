'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Check, Copy, Share2, ChevronRight, User, LogIn } from 'lucide-react';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { Post, CATEGORY_COLORS, CATEGORY_BG } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import Engagement from './Engagement';

/* ── Inline Code renderer ─────────────────────────────────── */
function InlineCode({ children }: { children: string }) {
    return <code className="inline-code">{children}</code>;
}

/* ── Full Code Block ──────────────────────────────────────── */
function CodeBlock({ code, language = 'code' }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split('\n');

    return (
        <div className="my-8 rounded-lg overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border)]">
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-card)] border-b border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--accent-blue)]">{language}</span>
                <button
                    onClick={copy}
                    className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                    {copied ? <Check size={14} className="text-blue-400" /> : <Copy size={13} />}
                </button>
            </div>
            <div className="overflow-x-auto p-4 md:p-6">
                <pre className="font-mono text-sm leading-relaxed m-0 text-white/90">
                    {lines.map((line, i) => (
                        <div key={i} className="flex">
                            <span className="text-white/20 select-none min-w-[2.5rem] text-right pr-4 shrink-0">{i + 1}</span>
                            <span>{colorLine(line)}</span>
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
}

function colorLine(line: string) {
    if (!line.trim()) return '\u00A0';
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
        return <span className="text-white/40 italic">{line}</span>;
    }
    return line;
}

/* ── Markdown parser ──────────────────────────────────────── */
type Block =
    | { type: 'h2'; id: string; text: string }
    | { type: 'h3'; id: string; text: string }
    | { type: 'p'; text: string }
    | { type: 'img'; alt: string; url: string }
    | { type: 'code'; lang: string; code: string }
    | { type: 'ul'; items: string[] }
    | { type: 'checkbox'; items: Array<{ done: boolean; text: string }> };

function parseBlocks(src: string): Block[] {
    const blocks: Block[] = [];
    const lines = src.trim().split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('![')) {
            const match = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)/);
            if (match) {
                blocks.push({ type: 'img', alt: match[1], url: match[2].trim() });
                i++; continue;
            }
        }

        if (line.startsWith('```')) {
            const lang = line.slice(3).trim() || 'code';
            const buf: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) { buf.push(lines[i]); i++; }
            blocks.push({ type: 'code', lang, code: buf.join('\n') });
            i++; continue;
        }

        if (line.startsWith('## ')) {
            const text = line.slice(3).trim();
            blocks.push({ type: 'h2', id: slugify(text), text });
            i++; continue;
        }

        if (line.startsWith('### ')) {
            const text = line.slice(4).trim();
            blocks.push({ type: 'h3', id: slugify(text), text });
            i++; continue;
        }

        if (line.match(/^- \[[ x]\]/)) {
            const items: Array<{ done: boolean; text: string }> = [];
            while (i < lines.length && lines[i].match(/^- \[[ x]\]/)) {
                items.push({ done: lines[i][3] === 'x', text: lines[i].slice(6) });
                i++;
            }
            blocks.push({ type: 'checkbox', items });
            continue;
        }

        if (line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\. /)) {
            const items: string[] = [];
            while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* ') || lines[i].match(/^\d+\. /))) {
                items.push(lines[i].replace(/^[-*]\s|^\d+\.\s/, ''));
                i++;
            }
            blocks.push({ type: 'ul', items });
            continue;
        }

        if (line.trim()) {
            blocks.push({ type: 'p', text: line.trim() });
        }
        i++;
    }
    return blocks;
}

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
    return parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>;
        if (p.startsWith('`') && p.endsWith('`')) return <InlineCode key={i}>{p.slice(1, -1)}</InlineCode>;
        return p;
    });
}

function SimpleRelatedCard({ post }: { post: Post }) {
    return (
        <Link href={`/blog/${post.slug}`} className="flex flex-col p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-colors">
            <h4 className="text-base font-medium leading-snug line-clamp-2 text-[var(--text-primary)] mb-2">
                {post.title}
            </h4>
            <p className="text-xs mt-auto text-[var(--text-secondary)] font-mono">
                {post.readingTime} min · {formatDate(post.publishedAt)}
            </p>
        </Link>
    );
}

interface EngagementData {
    postId: string;
    slug: string;
    comments: any[];
    score: number;
    totalVotes: number;
}

export default function ArticleClient({ post, relatedPosts = [], engagement }: { post: Post, relatedPosts?: Post[], engagement: EngagementData }) {
    const blocks = useMemo(() => parseBlocks(post.content), [post.content]);
    const tocItems = useMemo(() => blocks.filter((b): b is Extract<Block, { type: 'h2' | 'h3' }> => b.type === 'h2' || b.type === 'h3').map(b => ({ id: b.id, text: b.text, level: b.type === 'h2' ? 2 : 3 })), [blocks]);
    const related = relatedPosts.slice(0, 2);

    return (
        <main className="min-h-screen pt-32 pb-32">
            <div className="max-w-4xl lg:max-w-6xl mx-auto px-6 md:px-8">

                {/* Back Link */}
                <div className="mb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 relative">

                    {/* Left Column: Read Area centered and clean */}
                    <article className="lg:w-[70%] max-w-3xl shrink-0">

                        {/* Optional Banner Image */}
                        {post.bannerUrl && (
                            <div className="mb-12 rounded-2xl overflow-hidden border border-[var(--border)] aspect-video relative group">
                                <img 
                                    src={post.bannerUrl} 
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-60" />
                            </div>
                        )}

                        <div className="mb-12 border-b border-[var(--border)] pb-8">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-[var(--text-primary)] leading-[1.1]">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--text-muted)]">
                                <span className="bg-[var(--bg-elevated)] border border-[var(--border)] px-2 py-0.5 rounded text-[var(--accent-blue)] font-bold">
                                    {post.category}
                                </span>
                                <span>{formatDate(post.publishedAt)}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5"><Clock size={12} />{post.readingTime} min read</span>
                            </div>
                        </div>

                        {/* Article Body Content */}
                        <div className="article-body">
                            {blocks.map((block, i) => {
                                if (block.type === 'h2') return <h2 key={i} id={block.id}>{block.text}</h2>;
                                if (block.type === 'h3') return <h3 key={i} id={block.id}>{block.text}</h3>;
                                if (block.type === 'p') return <p key={i}>{renderInline(block.text)}</p>;
                                if (block.type === 'img') return (
                                    <div key={i} className="my-10">
                                        <figure className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)]">
                                            <img src={block.url} alt={block.alt} className="w-full object-contain" />
                                            {block.alt && <figcaption className="text-center py-3 text-xs text-[var(--text-muted)] border-t border-[var(--border)] italic font-mono">{block.alt}</figcaption>}
                                        </figure>
                                    </div>
                                );
                                if (block.type === 'code') return <CodeBlock key={i} code={block.code} language={block.lang} />;
                                if (block.type === 'ul') return <ul key={i}>{block.items.map((item, j) => <li key={j} className="flex"><span className="text-[var(--accent-blue)] mr-3 font-mono">-</span><span>{renderInline(item)}</span></li>)}</ul>;
                                if (block.type === 'checkbox') return (
                                    <ul key={i} className="mb-6 space-y-3">
                                        {block.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <span className={`mt-1 font-mono text-[11px] ${item.done ? 'text-[var(--accent-blue)]' : 'text-[var(--text-muted)]'}`}>
                                                    [{item.done ? 'x' : ' '}]
                                                </span>
                                                <span className="text-[var(--text-secondary)]">{renderInline(item.text)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                );
                                return null;
                            })}
                        </div>

                        {/* Author Minimal Footer Placeholder */}
                        <div className="mt-16 pt-8 border-t border-[var(--border)]">
                            <h4 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Bhawuk Arora</h4>
                            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                                {post.authorBio}
                            </p>
                        </div>

                        {/* Engagement: Ratings and Comments */}
                        <Engagement 
                            postId={engagement.postId} 
                            slug={engagement.slug} 
                            comments={engagement.comments} 
                            score={engagement.score} 
                            totalVotes={engagement.totalVotes} 
                        />

                        {/* Related posts */}
                        {related.length > 0 && (
                            <section className="mt-16">
                                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] mb-6">
                                    Related Writing
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {related.map(p => <SimpleRelatedCard key={p.slug} post={p} />)}
                                </div>
                            </section>
                        )}

                    </article>

                    {/* Right column: Sticky Desktop Sidebar */}
                    <aside className="hidden lg:block lg:w-[30%]">
                        <div className="sticky top-32 flex flex-col gap-8">
                            {tocItems.length > 0 && <TableOfContents items={tocItems} />}

                            <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
                                <h3 className="text-xs font-mono font-bold text-[var(--text-secondary)] mb-4">Share</h3>
                                <ShareButtons url={`https://bhawuk.dev/blog/${post.slug}`} title={post.title} />
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
