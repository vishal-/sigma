import React from "react";
import Link from "next/link";
import { HiBuildingOffice2, HiMagnifyingGlass, HiArrowLeft } from "react-icons/hi2";

export default function NotFoundSlug() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-indigo-950 border border-indigo-800 flex items-center justify-center mb-6 text-indigo-400">
        <HiBuildingOffice2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight">Profile Not Found</h1>
      <p className="text-slate-400 max-w-md mt-2 text-sm">
        The tutor or academy handle you are looking for does not exist or has been changed.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-600/30"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Tutorog Home
        </Link>
        <Link
          href="/onboarding"
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition"
        >
          Claim this Handle
        </Link>
      </div>
    </div>
  );
}
