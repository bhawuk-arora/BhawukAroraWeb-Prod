'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, MessageSquare, Send, User, ThumbsUp } from 'lucide-react';
import { addComment, addRating } from '@/app/blog/[slug]/engagement-actions';
import Loader from '@/components/Loader';
import { useUser, useClerk, SignInButton, UserButton } from '@clerk/nextjs';

interface Comment {
    id: string;
    parent_id?: string | null;
    user_name: string;
    content: string;
    created_at: string;
}

interface EngagementProps {
    postId: string;
    slug: string;
    comments: Comment[];
    score: number;
    totalVotes: number;
}

function CommentItem({ 
    comment, 
    onReply, 
    replies = [] 
}: { 
    comment: Comment; 
    onReply: (parentId: string, name: string) => void;
    replies?: Comment[];
}) {
    return (
        <div className="flex flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, y: 10, backgroundColor: 'rgba(0,0,0,0)' }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className="p-5 rounded-2xl bg-[var(--bg-card)]/50 border border-[var(--border)] group transition-colors duration-300"
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                        <span className="font-bold text-[var(--text-primary)]">{comment.user_name}</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {comment.content}
                </p>
                <button 
                    onClick={() => onReply(comment.id, comment.user_name)}
                    className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-blue)] hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Reply
                </button>
            </motion.div>

            {replies.length > 0 && (
                <div className="ml-8 pl-8 border-l border-[var(--border)] flex flex-col gap-4">
                    {replies.map(reply => (
                        <CommentItem key={reply.id} comment={reply} onReply={onReply} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Engagement({ postId, slug, comments, score, totalVotes }: EngagementProps) {
    const { isSignedIn, user, isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const [userVote, setUserVote] = useState<number>(0);
    const [isVoting, setIsVoting] = useState(false);
    const [voteError, setVoteError] = useState<string | null>(null);

    const [message, setMessage] = useState('');
    const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleVote = async (val: number) => {
        if (isVoting) return;
        if (!isSignedIn) {
            openSignIn();
            return;
        }

        setIsVoting(true);
        setVoteError(null);
        try {
            await addRating(postId, slug, val);
            setUserVote(val);
        } catch (e: any) {
            setVoteError(e.message || "Something went wrong while voting");
        } finally {
            setIsVoting(false);
        }
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) {
            openSignIn();
            return;
        }
        if (!message || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addComment(postId, slug, message, replyTo?.id);
            setMessage('');
            setReplyTo(null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const topLevelComments = comments.filter(c => !c.parent_id);
    const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

    return (
        <section className="mt-20 pt-20 border-t border-[var(--border)]">
            <div className="flex flex-col gap-12 sm:gap-20">
                
                {/* Minimal Voting Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-6 p-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] shadow-sm mb-6">
                        <button
                            type="button"
                            disabled={userVote !== 0 || isVoting}
                            onClick={() => handleVote(1)}
                            className={`p-3 rounded-xl transition-all ${userVote === 1 ? 'bg-green-500/10 text-green-500' : 'hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-green-500'}`}
                            title={isSignedIn ? "Upvote article" : "Sign in to upvote"}
                        >
                            <ArrowUp size={22} className={userVote === 1 ? 'fill-green-500' : ''} />
                        </button>
                        
                        <div className="flex flex-col">
                            <span className={`text-2xl font-black tabular-nums transition-colors ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>
                                {score > 0 ? `+${score}` : score}
                            </span>
                        </div>

                        <button
                            type="button"
                            disabled={userVote !== 0 || isVoting}
                            onClick={() => handleVote(-1)}
                            className={`p-3 rounded-xl transition-all ${userVote === -1 ? 'bg-red-500/10 text-red-500' : 'hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-red-500'}`}
                            title={isSignedIn ? "Downvote article" : "Sign in to downvote"}
                        >
                            <ArrowDown size={22} className={userVote === -1 ? 'fill-red-500' : ''} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {voteError && (
                            <motion.p 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-xs text-red-500 font-medium mb-3"
                            >
                                {voteError}
                            </motion.p>
                        )}
                        {userVote !== 0 && (
                            <motion.p 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-bold text-[var(--accent-blue)]"
                            >
                                Thanks for your feedback!
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <div className="mt-4 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-widest">
                        {totalVotes} community votes cast
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
                    {/* Comment Form Section */}
                    <div id="comment-form">
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                            <MessageSquare className="text-blue-500" size={24} />
                            {replyTo ? `Replying to @${replyTo.name}` : 'Join the Discussion'}
                        </h3>
                        {!isLoaded ? (
                            <div className="flex justify-center items-center py-10">
                                <Loader size="sm" />
                            </div>
                        ) : isSignedIn ? (
                            <form onSubmit={handleComment} className="flex flex-col gap-4">
                                {replyTo && (
                                    <div className="flex items-center justify-between px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-400">
                                        <span>Replying to {replyTo.name}</span>
                                        <button onClick={() => setReplyTo(null)} className="hover:text-white underline">Cancel</button>
                                    </div>
                                )}
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="shrink-0">
                                        <UserButton appearance={{ elements: { avatarBox: 'w-12 h-12 border border-[var(--border)]' } }} />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest block mb-0.5">Signed In As</span>
                                        <span className="text-sm font-bold text-[var(--text-primary)]">{user.fullName || user.username || user.primaryEmailAddress?.emailAddress}</span>
                                    </div>
                                </div>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Share your perspective..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-5 py-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-blue-500 transition-all text-sm resize-none shadow-inner mt-2"
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 min-h-[58px] bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? <Loader size="sm" color="white" /> : (
                                        <>
                                            {replyTo ? 'Post Reply' : 'Post Comment'}
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] text-center space-y-4 shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto">
                                    <User size={24} />
                                </div>
                                <p className="text-sm text-[var(--text-secondary)]">Sign in to participate in comments and vote on articles.</p>
                                <SignInButton mode="modal">
                                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] cursor-pointer">
                                        Sign In with Clerk
                                    </button>
                                </SignInButton>
                            </div>
                        )}
                    </div>

                    <div className="hidden lg:flex items-center justify-center p-8 rounded-3xl bg-[var(--bg-elevated)]/30 border border-dashed border-[var(--border)]">
                        <div className="text-center space-y-4 max-w-xs">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto">
                                <ThumbsUp size={32} />
                            </div>
                            <h4 className="font-bold text-[var(--text-primary)]">Community Guidelines</h4>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                Share your thoughts with the community. Be respectful, supportive, and curious.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="mt-24 max-w-4xl">
                <div className="flex items-center justify-between mb-12">
                    <h4 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                        Responses ({comments.length})
                    </h4>
                </div>
                
                <div className="flex flex-col gap-8">
                    {topLevelComments.length > 0 ? (
                        topLevelComments.map((comment) => (
                            <CommentItem 
                                key={comment.id} 
                                comment={comment} 
                                onReply={(id, name) => {
                                    setReplyTo({ id, name });
                                    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                replies={getReplies(comment.id)}
                            />
                        ))
                    ) : (
                        <div className="py-12 px-6 rounded-3xl border border-dashed border-[var(--border)] text-center">
                            <p className="text-sm text-[var(--text-muted)] italic">No responses yet. Be the first to start the conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
