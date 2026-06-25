'use client';

import React from 'react';

export default function Loader({ size = 'md', color = 'blue' }: { size?: 'sm' | 'md' | 'lg', color?: string }) {
    const dotSizes = {
        sm: 'w-1 h-1',
        md: 'w-1.5 h-1.5',
        lg: 'w-2 h-2'
    };
    
    const colorClass = color === 'white' 
        ? 'bg-white' 
        : 'bg-[var(--text-secondary)]';

    return (
        <div className="flex items-center justify-center gap-1 py-1">
            <div className={`animate-bounce rounded-full ${dotSizes[size]} ${colorClass}`} style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
            <div className={`animate-bounce rounded-full ${dotSizes[size]} ${colorClass}`} style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
            <div className={`animate-bounce rounded-full ${dotSizes[size]} ${colorClass}`} style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
        </div>
    );
}

export function LoadingSection({ message }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Loader size="lg" />
            {message && (
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-[0.3em] text-center">
                    {message}
                </p>
            )}
        </div>
    );
}
