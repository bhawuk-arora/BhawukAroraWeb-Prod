'use client';

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle, Github, Linkedin, Mail } from "lucide-react";
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
                alert("Failed to send message.");
            });
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight mb-3">
                    Say <span className="text-[var(--accent-blue)]">Hello.</span>
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                    Feel free to reach out for collaborations, project inquiries, or just to say hello.
                </p>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 shadow-sm">
                {!isSubmitted ? (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-[var(--text-secondary)]">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none text-sm transition-all"
                                placeholder="Name"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-[var(--text-secondary)]">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none text-sm transition-all"
                                placeholder="Email"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-[var(--text-secondary)]">Subject</label>
                            <input
                                required
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none text-sm transition-all"
                                placeholder="Subject"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-[var(--text-secondary)]">Message</label>
                            <textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={5}
                                className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] outline-none text-sm transition-all resize-none leading-relaxed"
                                placeholder="Message"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                        >
                            {isSubmitting ? <Loader size="sm" color="white" /> : 'Send'}
                        </button>
                    </form>
                ) : (
                    <div className="py-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Message sent</h3>
                        <p className="text-[var(--text-secondary)] text-sm max-w-xs mb-6">
                            Your message has been sent. I will get back to you soon.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--text-muted)] text-xs font-medium transition-all cursor-pointer"
                        >
                            Send another message
                        </button>
                    </div>
                )}
            </div>

            {/* Quick Links Footer */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)]">
                <a href="mailto:contact@bhawukarora.app" className="flex items-center gap-1.5 hover:text-white transition-colors" title="Email">
                    <Mail size={14} /> contact@bhawukarora.app
                </a>
                <span className="hidden sm:inline text-[var(--border)]">|</span>
                <a href="https://github.com/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors" title="GitHub">
                    <Github size={14} /> bhawuk-arora
                </a>
                <span className="hidden sm:inline text-[var(--border)]">|</span>
                <a href="https://linkedin.com/in/bhawuk-arora" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin size={14} /> bhawuk-arora
                </a>
            </div>
        </div>
    );
};

export default ContactForm;
