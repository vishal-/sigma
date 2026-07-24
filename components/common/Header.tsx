"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { HiAcademicCap, HiBars3, HiXMark } from "react-icons/hi2";

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <HiAcademicCap className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Tutor<span className="text-indigo-600">og</span>
          </span>
        </Link>

        {/* Desktop Navigation Tree */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#classes" className="hover:text-indigo-600 transition-colors">
            Find Classes
          </Link>
          <Link href={session?.user ? "/onboarding" : "/login?callbackUrl=/onboarding"} className="hover:text-indigo-600 transition-colors">
            For Tutors
          </Link>
          <Link href="#resources" className="hover:text-indigo-600 transition-colors">
            Resources
          </Link>
          <Link href="#about" className="hover:text-indigo-600 transition-colors">
            About Us
          </Link>
          <Link href="#contact" className="hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-slate-100 border border-slate-200/80 transition-all duration-200 group"
              title="View Account / Dashboard"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-300 shadow-xs"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 truncate max-w-[120px]">
                {session.user.name || "My Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 transition-colors"
            >
              Log in
            </Link>
          )}
          <Link
            href={session?.user ? "/onboarding" : "/login?callbackUrl=/onboarding"}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95"
          >
            List Your Classes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-indigo-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiXMark className="w-7 h-7" /> : <HiBars3 className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <Link href="#classes" className="text-sm font-medium text-slate-700 hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            Find Classes
          </Link>
          <Link href={session?.user ? "/onboarding" : "/login?callbackUrl=/onboarding"} className="text-sm font-medium text-slate-700 hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            For Tutors
          </Link>
          <Link href="#resources" className="text-sm font-medium text-slate-700 hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            Resources
          </Link>
          <Link href="#about" className="text-sm font-medium text-slate-700 hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link href="#contact" className="text-sm font-medium text-slate-700 hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          <hr className="border-slate-100" />
          <div className="flex flex-col gap-2 pt-1">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-indigo-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                    {session.user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800 truncate">{session.user.name || "User"}</p>
                  <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                </div>
              </Link>
            ) : (
              <Link href="/login" className="text-center text-sm font-semibold text-slate-700 py-2 border border-slate-200 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </Link>
            )}
            <Link href={session?.user ? "/onboarding" : "/login?callbackUrl=/onboarding"} className="text-center text-sm font-semibold text-white bg-indigo-600 py-2.5 rounded-xl shadow-sm" onClick={() => setMobileMenuOpen(false)}>
              List Your Classes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
