'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminSignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // Honeypot field — bots fill this, humans don't
    const [honeypot, setHoneypot] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // If honeypot is filled, silently reject (bot detected)
        if (honeypot) {
            setError('Access denied.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: 'admin' // Automatically assign admin role on creation
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data.session) {
                // If auto-login is enabled after sign up
                router.push('/admin');
                router.refresh();
            } else {
                // If email confirmation is required
                setSuccess('Account created! Please check your email to verify your account before logging in.');
                setEmail('');
                setPassword('');
            }
        } catch (e: any) {
            setError(e.message ?? 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060d18] flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/* Subtle grid background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(16,166,233,1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(16,166,233,1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-sm">

                {/* Logo / badge */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(16,166,233,0.15)]">
                        <ShieldCheck className="w-7 h-7 text-brand" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">Create Admin</h1>
                    <p className="text-sm text-gray-500 mt-1">Register a new administrator account</p>
                </div>

                <form
                    onSubmit={handleSignup}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl space-y-5"
                    noValidate
                >
                    {/* Honeypot — hidden from real users */}
                    <div className="hidden" aria-hidden="true">
                        <label htmlFor="website">Leave this field empty</label>
                        <input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="admin-email" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                            Email
                        </label>
                        <input
                            id="admin-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="admin-password" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="admin-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2.5 text-red-300 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="flex items-start gap-2.5 text-green-300 text-sm bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand text-white text-sm font-bold shadow-[0_6px_20px_-6px_rgba(16,166,233,0.5)] hover:bg-brand-light hover:shadow-[0_8px_24px_-6px_rgba(16,166,233,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="h-4 w-4" />
                                Create Admin
                            </>
                        )}
                    </button>
                    
                    {/* Link to login */}
                    <p className="text-center text-xs text-gray-500 mt-4 pt-4 border-t border-white/10">
                        Already have an account?{' '}
                        <Link href="/admin-login" className="text-brand hover:text-brand-light transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </form>

                <p className="text-center text-xs text-gray-700 mt-6">
                    <Link href="/" className="hover:text-gray-500 transition-colors">← Return to website</Link>
                </p>
            </div>
        </div>
    );
}
