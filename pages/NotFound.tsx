import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, 36, 0], y: [0, -24, 0], scale: [1, 1.12, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-brand-magenta/20 blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -42, 0], y: [0, 26, 0], scale: [1.05, 0.95, 1.05] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-brand-magenta/15 blur-3xl"
                />
                <motion.div
                    animate={{ rotate: [0, 8, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-magenta/20"
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-5xl [perspective:1800px]">
                    <motion.div
                        initial={{ opacity: 0, y: 24, rotateX: 9 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-morphism relative overflow-hidden rounded-[2.8rem] border border-gray-200 bg-white/85 p-8 text-center shadow-[0_35px_100px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:p-12 md:p-16 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,0,160,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,_rgba(255,0,160,0.12),transparent_40%)]" />
                        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />

                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="relative"
                        >
                            <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-brand-magenta">404</p>
                            <h1 className="mb-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-5xl font-display font-black leading-[0.9] tracking-tight text-transparent sm:text-6xl md:text-7xl dark:from-white dark:via-white dark:to-white/60">
                                PAGE NOT FOUND
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-gray-600 md:text-lg dark:text-white/65">
                                The page you requested does not exist. Let&apos;s get you back to Mediaboss Africa.
                            </p>
                        </motion.div>

                        <div className="relative mb-10 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-gray-500 dark:text-white/45">
                            <span>Creative</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
                            <span>Studio</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
                            <span>Media</span>
                        </div>

                        <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <motion.button
                                whileHover={{ y: -3, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/')}
                                className="rounded-2xl bg-brand-magenta px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] transition-all"
                            >
                                Go Home
                            </motion.button>
                            <motion.button
                                whileHover={{ y: -3, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/studio')}
                                className="rounded-2xl border border-gray-300 bg-white/60 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-gray-900 transition-all hover:border-brand-magenta hover:text-brand-magenta dark:border-white/15 dark:bg-white/5 dark:text-white"
                            >
                                Visit Studio
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
