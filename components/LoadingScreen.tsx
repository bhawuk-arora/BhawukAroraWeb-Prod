'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Fast fade-out for optimal UX
        const timer = setTimeout(() => setIsVisible(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0f19] pointer-events-none"
                >
                    <Loader size="lg" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
