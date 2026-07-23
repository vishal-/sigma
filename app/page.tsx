import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaGithub } from "react-icons/fa";

export default async function Home() {
  // Check session server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden flex flex-col justify-between">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />

      {/* Header / Navbar */}
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/10">
            <span className="text-md font-bold">Σ</span>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Sigma</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm flex items-center gap-1.5"
          >
            <FaGithub className="text-lg" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full px-6 py-16 text-center flex flex-col items-center justify-center relative z-10 flex-1">
        
        {/* Badge */}
        <div className="mb-6 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          Better Auth OAuth Integration
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none max-w-3xl">
          Secure, Sleek & Modern{" "}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Authentication
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
          Experience standard-compliant authentication using Better Auth, Next.js 16, and Prisma. Unified social provider flows with UUID identifiers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {session ? (
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-200 active:scale-[0.98] group cursor-pointer"
              >
                <span>Go to Console</span>
                <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-zinc-500 text-xs">
                Signed in as <span className="text-zinc-300 font-medium">{session.user.email}</span>
              </span>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-sm transition-all duration-200 active:scale-[0.98] group cursor-pointer"
            >
              <span>Get Started</span>
              <FaArrowRight className="text-xs text-zinc-600 group-hover:translate-x-0.5 group-hover:text-zinc-950 transition-transform" />
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-6 py-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 relative z-10">
        <div>
          © {new Date().getFullYear()} Sigma Authentication. All rights reserved.
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
