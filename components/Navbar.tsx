'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail, Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';

export default function Navbar() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const [isBlogDomain, setIsBlogDomain] = useState(false);

    useEffect(() => {
        setIsBlogDomain(window.location.hostname.includes('blog.'));
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href: string) => {
        // If we are on the blog domain, / represents /blog internally
        if (isBlogDomain) {
            if (href === '/blog') {
                return pathname === '/blog' || pathname.startsWith('/blog/');
            }
            return false;
        }
        return href === '/' ? pathname === '/' : pathname.startsWith(href) && !pathname.startsWith('/blog');
    };

    const getLinkHref = (href: string) => {
        if (!isBlogDomain) {
            if (href === '/blog') return 'https://blog.bhawukarora.app';
            return href;
        } else {
            if (href === '/blog') return '/';
            return `https://bhawukarora.app${href === '/' ? '' : href}`;
        }
    };

    const navLinks = isBlogDomain 
        ? [
            { href: '/', label: 'Home' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
          ]
        : [
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Work' },
            { href: '/blog', label: 'Blog' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5 border-transparent'}`}
            >
                <div className="max-w-5xl md:max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={getLinkHref(isBlogDomain ? '/blog' : '/')} className="flex items-center gap-3 group shrink-0 outline-none">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[var(--border)] group-hover:border-[var(--accent-blue)] transition-all">
                            <img src="/logo.svg" alt="Bhawuk Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                            Bhawuk.                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={getLinkHref(link.href)}
                                className={`text-sm tracking-wide font-medium transition-colors duration-200 outline-none hover:text-[var(--text-primary)] ${isActive(link.href)
                                    ? 'text-[var(--text-primary)]'
                                    : 'text-[var(--text-secondary)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Socials & Clerk Auth & Menu */}
                    <div className="flex items-center gap-4 shrink-0">
                        {/* Clerk Profile / Sign In on Desktop */}
                        <div className="hidden md:flex items-center mr-2">
                            {!isLoaded ? (
                                <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] animate-pulse" />
                            ) : isSignedIn ? (
                                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 border border-[var(--border)]' } }} />
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5">
                                        <LogIn size={12} /> Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </div>

                        <div className="hidden md:flex items-center gap-3 border-l border-[var(--border)] pl-4">
                            <a href="mailto:contact@bhawukarora.app" className="text-[var(--text-secondary)] hover:text-white transition-colors p-1" title="Email">
                                <Mail size={18} />
                            </a>
                            <a href="https://github.com/geeky-bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors p-1" title="GitHub">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors p-1" title="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        </div>

                        {/* Hamburger */}
                        <button
                            className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 transition-colors"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden bg-[var(--bg)]/95 backdrop-blur-md flex flex-col pt-24 pb-8 px-6 border-b border-[var(--border)]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'tween', duration: 0.2 }}
                    >
                        {/* Mobile Auth Section */}
                        <div className="px-4 py-3 border-b border-[var(--border)] mb-4 flex items-center justify-between">
                            {!isLoaded ? (
                                <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] animate-pulse" />
                            ) : isSignedIn ? (
                                <div className="flex items-center gap-3">
                                    <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10 border border-[var(--border)]' } }} />
                                    <div className="text-left">
                                        <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest leading-none mb-0.5">Logged In</p>
                                        <p className="text-sm font-bold text-[var(--text-primary)]">{user.fullName || user.username}</p>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 cursor-pointer">
                                        <LogIn size={14} /> Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={getLinkHref(link.href)}
                                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${isActive(link.href)
                                        ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                                        }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-center gap-6">
                            <a href="mailto:contact@bhawukarora.app" className="text-[var(--text-secondary)] hover:text-white p-2">
                                <Mail size={24} />
                            </a>
                            <a href="https://github.com/geeky-bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white p-2">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white p-2">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
