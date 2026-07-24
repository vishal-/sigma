"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { FaGoogle, FaFacebook, FaMicrosoft } from "react-icons/fa";

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOAuthLogin = async (provider: "google" | "facebook" | "microsoft") => {
    try {
      setLoadingProvider(provider);
      setError(null);
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
      setLoadingProvider(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 overflow-hidden font-sans">
      {/* Decorative Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Auth Card */}
      <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl shadow-2xl relative z-10 mx-4 transition-all duration-300 hover:border-zinc-700/80">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
            <span className="text-xl font-bold tracking-wider">Σ</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Welcome to Sigma
          </h1>
          <p className="mt-2.5 text-zinc-400 text-sm">
            Sign in or create your account using your social identity.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-900/50 bg-red-950/20 text-red-400 text-xs leading-relaxed animate-in fade-in slide-in-from-top-1 duration-255">
            <span className="font-semibold">Authentication Error:</span> {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-4">
          {/* Google */}
          <button
            onClick={() => handleOAuthLogin("google")}
            disabled={loadingProvider !== null}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-100 font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
          >
            {loadingProvider === "google" ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <FaGoogle className="text-red-500 text-lg transition-transform duration-200 group-hover:scale-110" />
            )}
            <span>Continue with Google</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleOAuthLogin("facebook")}
            disabled={loadingProvider !== null}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-100 font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
          >
            {loadingProvider === "facebook" ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <FaFacebook className="text-blue-500 text-lg transition-transform duration-200 group-hover:scale-110" />
            )}
            <span>Continue with Facebook</span>
          </button>

          {/* Microsoft */}
          {/* <button
            onClick={() => handleOAuthLogin("microsoft")}
            disabled={loadingProvider !== null}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-100 font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
          >
            {loadingProvider === "microsoft" ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <FaMicrosoft className="text-blue-400 text-lg transition-transform duration-200 group-hover:scale-110" />
            )}
            <span>Continue with Microsoft</span>
          </button> */}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-zinc-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
