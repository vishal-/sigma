import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  HiCheckCircle,
  HiShare,
  HiPencilSquare,
  HiPhoto,
  HiMapPin,
  HiArrowTopRightOnSquare,
  HiSparkles,
  HiEye,
  HiBuildingOffice2,
} from "react-icons/hi2";
import ShareWidget from "@/components/ShareWidget";

export default async function DashboardOverview() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: {
      organization: {
        include: {
          locations: true,
          media: true,
          category: true,
        },
      },
    },
  });

  if (!membership || !membership.organization) return null;

  const org = membership.organization;
  const location = org.locations[0];
  const galleryCount = org.media.filter((m) => m.type === "GALLERY").length;

  const publicUrl = `http://localhost:3000/${org.slug}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-6 md:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <HiCheckCircle className="w-4 h-4" />
              Public Page Live & Shareable
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {session.user.name || "Tutor"}!
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Your professional page for <span className="font-bold text-white">{org.name}</span> is live. Anyone can view your profile at:
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1.5 rounded-xl border border-indigo-800/80 text-sm font-semibold">
                tutorog.com/{org.slug}
              </span>
              <a
                href={`/${org.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
                title="View live page"
              >
                <HiArrowTopRightOnSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3">
            <Link
              href="/dashboard/profile"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-600/30"
            >
              <HiPencilSquare className="w-5 h-5" />
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Share Widget Component */}
      <ShareWidget orgName={org.name} slug={org.slug} />

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Primary Category</span>
            <HiBuildingOffice2 className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-xl font-extrabold text-white truncate">{org.category?.name || "None"}</p>
          <p className="text-xs text-slate-400 mt-1">
            {org.category?.name ? "Primary classification set" : "No category selected"}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Gallery Photos</span>
            <HiPhoto className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{galleryCount}</p>
          <Link href="/dashboard/gallery" className="text-xs text-emerald-400 hover:underline mt-1 inline-block font-semibold">
            Manage gallery &rarr;
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Primary Location</span>
            <HiMapPin className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-lg font-bold text-white truncate">{location?.city || "Not set"}</p>
          <p className="text-xs text-slate-400 truncate mt-1">{location?.addressLine1 || "No address added"}</p>
        </div>
      </div>
    </div>
  );
}
