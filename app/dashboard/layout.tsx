import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  HiSquares2X2,
  HiUser,
  HiPhoto,
  HiArrowTopRightOnSquare,
  HiBuildingOffice2,
  HiMagnifyingGlass,
  HiArrowRight,
} from "react-icons/hi2";
import SignOutButton from "./SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  // Check if user has an organization membership
  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: {
      organization: {
        include: {
          images: true,
        },
      },
    },
  });

  // If user has no organization yet, show choice screen instead of auto-redirecting
  if (!membership || !membership.organization) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12 font-sans relative overflow-hidden">
        {/* Soft Background Radial Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Header */}
        <header className="max-w-5xl mx-auto w-full flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/25">
              T
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              Tutorog
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-white">{session.user.name || "User"}</span>
              <span className="text-[11px] text-slate-400">{session.user.email}</span>
            </div>
            <SignOutButton />
          </div>
        </header>

        {/* Main Choice Body */}
        <main className="max-w-4xl mx-auto w-full my-auto py-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <span>Provider Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Welcome to Tutorog
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-12">
            You don't have a Tuition Center or Academy profile associated with your account yet. What would you like to do?
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {/* Card 1: Become a Provider */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <HiBuildingOffice2 className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Create a Tuition / Academy Page</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Are you a tutor, coaching institute, or skill academy? Set up your profile, list courses, upload photos, and receive student inquiries.
                </p>
              </div>
              <Link
                href="/onboarding"
                className="w-full px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
              >
                <span>Start Provider Onboarding</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Student / Learner */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <HiMagnifyingGlass className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Explore Tutors & Academies</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Looking to learn academics, sports, music, or arts? Browse top-rated tuition providers near you, leave reviews, and connect directly.
                </p>
              </div>
              <Link
                href="/"
                className="w-full px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                <span>Back to Home & Search</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto w-full text-center text-xs text-slate-500 relative z-10">
          Need help? Return to <Link href="/" className="text-slate-400 hover:text-white underline">tutorog.com</Link>
        </footer>
      </div>
    );
  }

  const org = membership.organization;
  const logoMedia = org.images.find((m) => m.type === "LOGO");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
                T
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                Tutorog
              </span>
            </Link>
          </div>

          {/* Organization Pill */}
          <div className="p-4 mx-3 my-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center overflow-hidden shrink-0">
              {logoMedia?.originalUrl ? (
                <img src={logoMedia.originalUrl} alt={org.name} className="w-full h-full object-cover" />
              ) : (
                <HiBuildingOffice2 className="w-5 h-5 text-indigo-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-white truncate">{org.name}</p>
              <p className="text-xs text-slate-400 truncate">tutorog.com/{org.slug}</p>
            </div>
          </div>

          {/* Quick Action: View Public Page */}
          <div className="px-3 mb-4">
            <a
              href={`/${org.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>View Live Public Page</span>
              <HiArrowTopRightOnSquare className="w-4 h-4" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
            >
              <HiSquares2X2 className="w-5 h-5 text-indigo-400" />
              Overview
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
            >
              <HiUser className="w-5 h-5 text-purple-400" />
              Edit Profile
            </Link>
            <Link
              href="/dashboard/gallery"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
            >
              <HiPhoto className="w-5 h-5 text-emerald-400" />
              Photo Gallery
            </Link>
          </nav>
        </div>

        {/* User Footer & Sign Out */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
              {session.user.name?.[0] || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{session.user.name || "Tutor User"}</p>
              <p className="text-[10px] text-slate-400 truncate">{session.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
