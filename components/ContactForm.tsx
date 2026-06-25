'use client';

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Github, Linkedin, Mail, MessageSquare, User, AtSign, ArrowRight, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Loader from "./Loader";

const ContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!formRef.current) return;

        emailjs
            .sendForm("service_r3d3clv", "template_61u37om", formRef.current, "kCjs4Oa7WYESJHpxp")
            .then(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
            }, () => {
                setIsSubmitting(false);
                alert("Failed to send packet.");
            });
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-start">
                
                {/* Visual/Description Side */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col pt-8 md:pt-12">
                    <AnimatedSection>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[var(--accent-blue)] text-[10px] font-black uppercase tracking-[0.2em] mb-6 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Transmission Active
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] mb-8">
                            Say <br />
                            <span className="text-[var(--accent-blue)]">Hello.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--accent-blue)]/30 pl-6 md:pl-8 mb-12 md:mb-16 py-2 italic font-medium">
                            I'm available for technical collaborations on MLOps, scalability, and automated platforms.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={200}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4">
                            <ContactCard icon={<Mail size={22} />} label="Primary Channel" value="contact@bhawukarora.app" href="mailto:contact@bhawukarora.app" color="blue" />
                            <ContactCard icon={<Github size={22} />} label="Operational Source" value="geeky-bhawuk-arora" href="https://github.com/geeky-bhawuk-arora" color="gray" />
                            <ContactCard icon={<Linkedin size={22} />} label="Human Network" value="bhawuk-arora" href="https://linkedin.com/in/bhawuk-arora" color="indigo" />
                        </div>
                    </AnimatedSection>
                </div>

                {/* Form Side */}
                <div className="lg:col-span-12 xl:col-span-7 mt-8 md:mt-0 w-full">
                    <AnimatedSection delay={300}>
                        <div className="bg-[#0c0c0e] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-14 shadow-2xl relative overflow-hidden group/form">
                            {/* Technical Grid Overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:32px_32px] opacity-[0.1] pointer-events-none" />
                            
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form key="form" ref={formRef} onSubmit={handleSubmit} className="space-y-8 md:space-y-10 relative z-10 w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                                            <FloatingInput label="Your Name" name="name" value={formData.name} onChange={handleInputChange} />
                                            <FloatingInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                                        </div>
                                        <FloatingInput label="Subject Protocol" name="subject" value={formData.subject} onChange={handleInputChange} />
                                        <div className="relative group w-full">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                required
                                                className="w-full bg-transparent border-b-2 border-white/10 py-3 md:py-4 text-base md:text-xl text-[var(--text-primary)] placeholder-white/20 focus:outline-none focus:border-[var(--accent-blue)] transition-all resize-none leading-relaxed peer"
                                                placeholder="Message content..."
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-blue)] transition-all duration-500 peer-focus:w-full" />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-16 md:h-20 rounded-xl md:rounded-2xl bg-[var(--accent-blue)] hover:bg-blue-600 text-white font-black text-lg md:text-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 md:gap-4 shadow-xl shadow-blue-500/10 group overflow-hidden relative"
                                        >
                                            {isSubmitting ? <Loader size="sm" color="white" /> : (
                                                <>
                                                    <Zap size={18} className="group-hover:scale-125 transition-transform text-blue-200" />
                                                    Initialize Send
                                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform opacity-50" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 md:py-20 flex flex-col items-center text-center">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-8 md:mb-10 shadow-[0_0_30px_rgba(34,197,94,0.1)]"><CheckCircle size={40} /></div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Sync Established</h3>
                                        <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-sm mb-10 md:mb-12">I've received your packet and will process it shortly.</p>
                                        <button onClick={() => setIsSubmitted(false)} className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-[10px] font-bold uppercase tracking-widest transition-all">Start New Session</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

const FloatingInput = ({ label, ...props }: any) => (
    <div className="relative group w-full">
        <input
            {...props}
            required
            className="w-full bg-transparent border-b-2 border-white/10 py-3 md:py-4 text-base md:text-xl text-[var(--text-primary)] placeholder-transparent focus:outline-none focus:border-[var(--accent-blue)] transition-all peer"
            placeholder={label}
        />
        <label className="absolute left-0 top-0 text-white/30 text-xs md:text-sm uppercase font-black tracking-widest transition-all peer-focus:-top-6 peer-focus:text-[var(--accent-blue)] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] cursor-text">
            {label}
        </label>
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-blue)] transition-all duration-500 peer-focus:w-full" />
    </div>
);

const ContactCard = ({ icon, label, value, href, color }: any) => {
    const colors: any = {
        blue: 'text-blue-400 group-hover:bg-blue-500/10',
        indigo: 'text-indigo-400 group-hover:bg-indigo-500/10',
        gray: 'text-gray-400 group-hover:bg-gray-500/10'
    };
    
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 p-1 group w-full">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[1rem] md:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 ${colors[color]} shrink-0`}>
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[8px] md:text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-0.5">{label}</p>
                <p className="text-base md:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors tracking-tight truncate">{value}</p>
            </div>
        </a>
    );
};

export default ContactForm;
