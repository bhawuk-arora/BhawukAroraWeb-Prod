'use client';

import type { Metadata } from "next";
import { Sparkles, Book, Moon, Coffee, Heart, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center overflow-hidden">
            <div className="w-full max-w-3xl mx-auto px-6 md:px-8 relative">
                
                {/* Decorative floating elements */}
                <motion.div 
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 text-[var(--accent-blue)] opacity-20 hidden md:block"
                >
                    <Sparkles size={120} />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-[var(--text-primary)] leading-[0.9] flex items-end gap-4">
                        <span>The / <br />
                        <span className="text-[var(--accent-blue)]">Architect.</span></span>
                        <motion.span 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="mb-2"
                        >
                            <Star className="text-yellow-400 fill-yellow-400" size={32} />
                        </motion.span>
                    </h1>
                </motion.div>

                <div className="article-body relative">


                    <div className="space-y-12 relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-6 items-start group"
                        >
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 group-hover:rotate-12 transition-transform">
                                <Book size={24} />
                            </div>
                            <div className="relative">
                                <p className="text-2xl font-['Caveat'] text-[var(--text-secondary)] leading-relaxed">
                                    I build ML platforms, but some of the most real parts of me exist far away from screens — in <span className="text-[var(--accent-purple)] font-bold decoration-wavy underline decoration-purple-500/30">highlighted book lines</span>, <span className="opacity-40 line-through decoration-red-500/50 mr-2">endless scrolling</span> unfinished midnight thoughts, and conversations that stay in my head longer than they probably should.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex gap-6 items-start group"
                        >
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 group-hover:-rotate-12 transition-transform">
                                <Moon size={24} />
                            </div>
                            <p className="text-2xl font-['Caveat'] text-[var(--text-secondary)] leading-relaxed">
                                I’m deeply curious about how things work, whether it’s <span className="text-[var(--accent-blue)] font-bold decoration-wavy underline decoration-blue-500/30">distributed systems</span>, human emotions, or the quiet meaning hidden inside ordinary moments. I love learning, writing, reflecting, and slowly becoming more intentional with the way I think, build, and live.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-3xl -z-10 blur-xl" />
                            <div className="flex gap-6 items-start group">
                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                                    <Heart size={24} className="fill-emerald-400/20" />
                                </div>
                                <p className="text-2xl font-['Caveat'] text-[var(--text-primary)] leading-relaxed font-medium">
                                    To me, technology has never been just about code — it’s about creating things that last, connect, and mean something. And somewhere between ambition, overthinking, quiet nights, and endless curiosity, I’m just trying to become someone I’d genuinely be proud of. 🌟
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-16 flex flex-col items-end px-8 gap-4">
                        <motion.div 
                            initial={{ opacity: 0, rotate: -5 }}
                            whileInView={{ opacity: 1, rotate: -2 }}
                            className="text-4xl font-['Architects_Daughter'] text-[var(--accent-blue)] opacity-80"
                        >
                            — Bhawuk
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-xl rotate-1 max-w-[200px] shadow-lg shadow-yellow-500/5 relative"
                        >
                            <div className="absolute -top-3 -left-3 text-yellow-600/30 -rotate-12">
                                <Coffee size={24} />
                            </div>
                            <p className="text-sm font-['Caveat'] text-yellow-500/80 leading-tight">
                                P.S. If you find any bugs on this site, they are actually intentional performance art. 🎨
                            </p>
                        </motion.div>
                    </div>

                    <motion.h2 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 mb-8 text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3"
                    >
                        <MessageCircle size={24} className="text-[var(--accent-blue)]" />
                        Operational Channels
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center gap-4"
                        >
                            <span className="text-[var(--text-muted)] w-16 uppercase font-bold tracking-widest text-[10px]">Email</span>
                            <a href="mailto:contact@bhawukarora.app" className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors truncate">contact@bhawukarora.app</a>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center gap-4"
                        >
                            <span className="text-[var(--text-muted)] w-16 uppercase font-bold tracking-widest text-[10px]">GitHub</span>
                            <a href="https://github.com/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors truncate">bhawuk-arora</a>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center gap-4 md:col-span-2"
                        >
                            <span className="text-[var(--text-muted)] w-16 uppercase font-bold tracking-widest text-[10px]">LinkedIn</span>
                            <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors truncate">linkedin.com/in/bhawuk-arora</a>
                        </motion.div>
                    </div>

                    {/* Cute footer accent */}
                    <div className="mt-24 flex flex-col items-center gap-4 opacity-50">
                        <div className="h-px w-12 bg-[var(--border)]" />
                        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
                            <span>Stay curious</span>
                            <Heart size={10} className="text-red-500 fill-red-500" />
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
