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
  HiMapPin,
  HiArrowTopRightOnSquare,
  HiBuildingOffice2,
  HiCog6Tooth,
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
          media: true,
        },
      },
    },
  });

  // If user has no organization yet, redirect to onboarding wizard
  if (!membership || !membership.organization) {
    redirect("/onboarding");
  }

  const org = membership.organization;
  const logoMedia = org.media.find((m) => m.type === "LOGO");

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
              {logoMedia?.url ? (
                <img src={logoMedia.url} alt={org.name} className="w-full h-full object-cover" />
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
