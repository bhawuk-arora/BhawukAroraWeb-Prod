'use client';

export default function Loader({ size = 'md', color = 'blue' }: { size?: 'sm' | 'md' | 'lg', color?: string }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-2'
    };
    const colorClass = color === 'white' 
        ? 'border-white/20 border-t-white' 
        : 'border-[var(--border)] border-t-[var(--accent-blue)]';

    return (
        <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClass}`} />
    );
}

export function LoadingSection({ message }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-6 py-20">
            <Loader size="lg" />
            {message && (
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-[0.3em] text-center">
                    {message}
                </p>
            )}
        </div>
    );
}
