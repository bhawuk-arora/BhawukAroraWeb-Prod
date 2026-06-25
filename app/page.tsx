import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Calendar, MapPin, GraduationCap, Award, Heart } from "lucide-react";
import { Post, projects } from "@/lib/data";
import { workExperience, education, certifications } from "@/lib/experience";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import AnimatedSection from "@/components/AnimatedSection";
import HeroHandshake from "@/components/HeroHandshake";
import { Cpu, Terminal, Database, Cloud, Code, BarChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Bhawuk Arora ( ^__^ )",
  description: "Corporate Kid in Tech ;)",
};



export default async function HomePage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, description, category, tags, reading_time, published_at, featured, emoji, pattern_type, accent_color, author, author_bio")
    .eq("enabled", true)
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(2);

  const mapPost = (p: any): Post => ({
    ...p,
    readingTime: p.reading_time || 5,
    publishedAt: p.published_at,
    patternType: p.pattern_type || 'dots',
    accentColor: p.accent_color || '#6366f1',
    authorBio: p.author_bio || ''
  });

  const typedPosts = (posts || []).map(mapPost);
  const featured = typedPosts.find(p => p.featured) || typedPosts[0];
  const recentPosts = typedPosts.filter(p => p.slug !== featured?.slug).slice(0, 4);

  return (
    <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">

        <section className="mb-24 mt-8 relative">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,var(--border)_1px,transparent_0)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          <div className="relative z-10">


            <div className="max-w-4xl">
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-6 text-[var(--text-primary)] leading-[0.85]">
                Bhawuk <span className="text-[var(--accent-blue)]">Arora.</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[var(--text-secondary)]">
                MLOps & Systems Engineering.
              </h2>

              <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mb-12 font-medium">
                Corporate Kid in Tech ;)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
              <Link
                href="/projects"
                className="relative overflow-hidden px-10 py-4.5 rounded-2xl text-white bg-blue-600 hover:bg-blue-500 transition-all font-bold shadow-[0_0_25px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.45)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group border border-blue-400/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                <span className="relative z-10">View My Work</span>
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform relative z-10" />
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://res.cloudinary.com/bhawuk-prod/image/upload/v1759812546/bhawuk-portfolio-react/bhawuk_resume.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-4 rounded-2xl text-[var(--accent-blue)] bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10 backdrop-blur-sm transition-all font-bold text-center flex items-center justify-center gap-2 group/btn shadow-sm"
                >
                  <span className="text-sm sm:text-base">Resume</span>
                  <ExternalLink size={16} className="opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-y-[-1px] transition-all" />
                </a>
                <Link
                  href="/blog"
                  className="px-6 sm:px-8 py-4 rounded-2xl text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-card)] backdrop-blur-sm transition-all font-bold text-center text-sm sm:text-base flex items-center justify-center gap-2 group/blog shadow-sm"
                >
                  <Calendar size={16} className="text-[var(--text-muted)] group-hover/blog:text-[var(--accent-blue)] transition-colors" />
                  <span>Blog</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED POST */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">My Thoughts</h2>
            <Link href="/blog" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors group">
              View Blog <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {typedPosts.slice(0, 4).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block h-full outline-none">
                  <article className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col hover:shadow-2xl hover:shadow-blue-500/5 group/card">
                    {/* Technical Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] opacity-0 group-hover/card:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 mb-6 font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                      <span className="text-[var(--accent-blue)] font-bold border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 px-2.5 py-1 rounded-md tracking-wider">{post.category}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover/card:text-[var(--accent-blue)] transition-colors mb-4 tracking-tight leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--accent-blue)] font-bold uppercase tracking-widest">
                        Examine Logic <ArrowRight size={12} className="group-hover/card:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-tighter opacity-70">{post.readingTime}m runtime</span>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
        <AnimatedSection>
          <div className="mb-24">
            <HeroHandshake />
          </div>
        </AnimatedSection>

        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Recent Work</h2>
            <Link href="/projects" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors group">
              All Projects <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map(proj => (
              <div key={proj.title} className="flex flex-col p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 group/card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] opacity-0 group-hover/card:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] group-hover/card:text-[var(--accent-blue)] transition-colors tracking-tight leading-tight">
                    {proj.title}
                  </h3>
                  <div className="flex gap-3 text-[var(--text-muted)] shrink-0">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]"><Github size={18} /></a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]"><ExternalLink size={18} /></a>
                    )}
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 h-full font-medium">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Explore More Card */}
            <div className="flex flex-col p-8 rounded-2xl bg-[var(--bg-elevated)] border-2 border-dashed border-[var(--border)] hover:border-[var(--accent-blue)]/50 transition-all duration-300 relative overflow-hidden group/card justify-center items-center text-center h-full min-h-[300px]">
              <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 group-hover/card:scale-110 transition-transform shadow-lg shadow-blue-500/5">
                  <Github size={24} className="text-[var(--accent-blue)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">More Coming Soon</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-xs mx-auto font-medium">
                  Currently architecting high-throughput systems and distributed modules.
                  <span className="block mt-2">More implementations arriving shortly.</span>
                </p>
                <a
                  href="https://github.com/bhawuk-arora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-all group/link shadow-sm"
                >
                  Explore GitHub <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL JOURNEY & EDUCATION GRID */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">

            {/* Experience Column */}
            <div className="space-y-10">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-4">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Experience</h2>
                </div>
              </AnimatedSection>

              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <AnimatedSection key={index} delay={index * 100}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-8 rounded-2xl transition-all duration-300 hover:border-[var(--accent-blue)]/50 hover:shadow-2xl hover:shadow-blue-500/5 relative group/card overflow-hidden h-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] opacity-0 group-hover/card:opacity-100 transition-opacity" />

                      <div className="relative z-10">
                        <div className="mb-4">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{job.title}</h3>
                            {job.period.toLowerCase().includes('present') && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] shrink-0">Current</span>
                            )}
                          </div>
                          <p className="text-[var(--accent-blue)] font-bold text-sm tracking-wide">{job.company}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--text-muted)] mb-4 font-medium">
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> {job.period}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={12} /> {job.location}</span>
                        </div>

                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">{job.description}</p>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                          {job.highlights.map((h, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)]">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
            {/* Education Column */}
            <div className="space-y-10">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-4">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Education</h2>
                </div>
              </AnimatedSection>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <AnimatedSection key={index} delay={index * 120}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-8 rounded-2xl transition-all duration-300 hover:border-[var(--accent-purple)]/50 hover:shadow-2xl hover:shadow-purple-500/5 group/card overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover/card:border-[var(--accent-purple)] transition-colors duration-300 shadow-lg">
                          <GraduationCap size={28} className="text-[var(--accent-purple)]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <h4 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{edu.degree}</h4>
                            <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-[10px]">{edu.grade}</span>
                          </div>
                          <p className="text-sm text-[var(--accent-purple)] font-bold mb-2 tracking-wide">{edu.field}</p>
                          <p className="text-xs text-[var(--text-muted)] mb-4 font-medium">{edu.institution} • {edu.location}</p>

                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed border-l-2 border-purple-500/20 pl-4 py-1 italic font-medium">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION - FULL WIDTH */}
        <section className="mb-24">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Certifications</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <AnimatedSection key={index} delay={index * 120}>
                <div className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:border-[var(--accent-blue)]/50 hover:shadow-xl hover:shadow-blue-500/5 group/card relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[40px] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover/card:scale-105 transition-transform duration-300">
                    <Award size={18} className="text-white" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[13px] font-bold text-[var(--text-primary)] leading-snug group-hover/card:text-[var(--accent-blue)] transition-colors mb-0.5">{cert.name}</p>
                    <p className="text-[10px] font-medium text-[var(--text-muted)]">{cert.issuer}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* <section className="mb-24">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8 border-b border-[var(--border)] pb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Technical Arsenal</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'MLOps', icon: <Cpu size={20} />, items: ['TensorFlow', 'PyTorch', 'MLflow', 'Kubeflow'] },
              { label: 'Cloud Infrastructure', icon: <Cloud size={20} />, items: ['Azure', 'AWS', 'Terraform', 'Kubernetes'] },
              { label: 'Data Engineering', icon: <Database size={20} />, items: ['PostgreSQL', 'Redis', 'Vector DBs', 'Airflow'] },
              { label: 'Backend Systems', icon: <Terminal size={20} />, items: ['Python', 'Node.js', 'Go', 'FastAPI'] },
              { label: 'Frontend & UI', icon: <Code size={20} />, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
              { label: 'Analytics', icon: <BarChart size={20} />, items: ['PowerBI', 'ELK Stack', 'Prometheus', 'Grafana'] }
            ].map((skill, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] h-full hover:border-[var(--accent-blue)]/50 transition-all group/skill">
                  <div className="text-[var(--accent-blue)] mb-4 p-2.5 rounded-xl bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/10 w-fit group-hover/skill:bg-[var(--accent-blue)]/10 transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)] mb-3">{skill.label}</h3>
                  <div className="space-y-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                    {skill.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--accent-blue)] opacity-50" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section> */}
      </div>
    </main >
  );
}
