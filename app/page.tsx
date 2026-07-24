"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import {
  HiAcademicCap,
  HiMagnifyingGlass,
  HiMapPin,
  HiShieldCheck,
  HiHandThumbUp,
  HiSparkles,
  HiTag,
  HiBookOpen,
  HiMusicalNote,
  HiPaintBrush,
  HiComputerDesktop,
  HiLanguage,
  HiChatBubbleLeftEllipsis,
  HiRocketLaunch,
  HiArrowTrendingUp,
  HiInboxStack,
  HiChartBar,
  HiUserGroup,
  HiSquares2X2,
  HiFaceSmile,
  HiArrowRight,
  HiUser,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaBasketball,
} from "react-icons/fa6";

export default function LandingPage() {
  const [searchSubject, setSearchSubject] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for "${searchSubject || "All subjects"}" in "${searchLocation || "All locations"}"`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  const categories = [
    {
      id: "academics",
      title: "Academics",
      description: "School Subjects, Coaching, Competitive Exams & More",
      icon: <HiBookOpen className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50 border-indigo-100",
      iconBg: "bg-indigo-100/80",
    },
    {
      id: "sports",
      title: "Sports",
      description: "Cricket, Football, Badminton, Yoga & Many More",
      icon: <FaBasketball className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
      iconBg: "bg-emerald-100/80",
    },
    {
      id: "music",
      title: "Music",
      description: "Guitar, Piano, Vocals, Drums & More",
      icon: <HiMusicalNote className="w-6 h-6 text-pink-600" />,
      bg: "bg-pink-50 border-pink-100",
      iconBg: "bg-pink-100/80",
    },
    {
      id: "arts",
      title: "Arts & Dance",
      description: "Drawing, Painting, Dance, Theatre & More",
      icon: <HiPaintBrush className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50 border-amber-100",
      iconBg: "bg-amber-100/80",
    },
    {
      id: "technology",
      title: "Technology",
      description: "Coding, Robotics, AI, Computers & More",
      icon: <HiComputerDesktop className="w-6 h-6 text-sky-600" />,
      bg: "bg-sky-50 border-sky-100",
      iconBg: "bg-sky-100/80",
    },
    {
      id: "languages",
      title: "Languages",
      description: "Spoken English, Hindi, Foreign Languages & More",
      icon: <HiLanguage className="w-6 h-6 text-teal-600" />,
      bg: "bg-teal-50 border-teal-100",
      iconBg: "bg-teal-100/80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* ----------------- NAVBAR ----------------- */}
      <Header />

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        {/* Soft Background Radial Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-indigo-200/30 via-purple-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="mb-6 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                LEARN ANYTHING. ANYWHERE.
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                Find the{" "}
                <span className="text-indigo-600 font-extrabold">right tutor.</span>
                <br />
                Learn what{" "}
                <span className="text-indigo-600 font-extrabold">you love.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed mb-8">
                Discover trusted tutors, coaching centers and mentors near you or online for academics, sports, arts and more.
              </p>

              {/* Search Form Card */}
              <form
                onSubmit={handleSearch}
                className="w-full max-w-2xl bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl shadow-indigo-900/5 border border-indigo-100/80 flex flex-col md:flex-row items-stretch gap-3 mb-8"
              >
                {/* Search Field 1 */}
                <div className="flex-1 flex flex-col justify-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    What do you want to learn?
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchSubject}
                      onChange={(e) => setSearchSubject(e.target.value)}
                      placeholder="e.g. Maths, Guitar, Cricket..."
                      className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                    />
                    <HiMagnifyingGlass className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Search Field 2 */}
                <div className="flex-1 flex flex-col justify-center px-3 py-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Where?
                  </label>
                  <div className="flex items-center gap-2">
                    <HiMapPin className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      placeholder="Enter your location"
                      className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-4 rounded-xl sm:rounded-2xl shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                >
                  <HiMagnifyingGlass className="w-5 h-5" />
                  <span>Search Classes</span>
                </button>
              </form>

              {/* Trust Badges */}
              <div className="w-full grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">
                  <HiShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Verified Tutors & Institutes</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">
                  <HiHandThumbUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Real Reviews</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">
                  <HiSparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Easy to Connect</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">
                  <HiTag className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>100% Free to Join</span>
                </div>
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Soft Circular Backdrop */}
              <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-indigo-200 via-purple-100 to-indigo-100 blur-2xl opacity-75 animate-pulse duration-[7000ms]" />

              <div className="relative w-full max-w-[440px] aspect-square rounded-3xl overflow-visible p-4 flex items-center justify-center">
                {/* Hero Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white bg-white">
                  <img
                    src="/hero-students.png"
                    alt="Happy students learning with Tutorog"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Floating Category Badges */}
                {/* 1. Academics (Top Left) */}
                <div className="absolute -top-3 left-0 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 font-bold text-xs text-slate-800 animate-float-slow z-20">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <HiAcademicCap className="w-4 h-4" />
                  </div>
                  <span>Academics</span>
                </div>

                {/* 2. Arts (Top Right) */}
                <div className="absolute top-6 -right-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 font-bold text-xs text-slate-800 animate-float-reverse z-20">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <HiPaintBrush className="w-4 h-4" />
                  </div>
                  <span>Arts</span>
                </div>

                {/* 3. Sports (Middle Left) */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 font-bold text-xs text-slate-800 animate-float-reverse z-20">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FaBasketball className="w-4 h-4" />
                  </div>
                  <span>Sports</span>
                </div>

                {/* 4. Music (Middle Right) */}
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 font-bold text-xs text-slate-800 animate-float-slow z-20">
                  <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <HiMusicalNote className="w-4 h-4" />
                  </div>
                  <span>Music</span>
                </div>

                {/* 5. Languages (Bottom Right) */}
                <div className="absolute -bottom-3 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 font-bold text-xs text-slate-800 animate-float-slow z-20">
                  <div className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                    <HiLanguage className="w-4 h-4" />
                  </div>
                  <span>Languages</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- EXPLORE TOP CATEGORIES ----------------- */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Tag Header */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-3">
            EXPLORE TOP CATEGORIES
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
            Start exploring by what <span className="text-indigo-600">interests you</span>
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`p-6 rounded-2xl text-center border transition-all duration-300 cursor-pointer flex flex-col items-center justify-between group hover:-translate-y-1 hover:shadow-xl ${activeCategory === cat.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xl"
                    : "bg-slate-50/60 border-slate-100 hover:bg-white hover:border-indigo-100"
                  }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${activeCategory === cat.id ? "bg-white/20 text-white" : cat.iconBg
                      }`}
                  >
                    {cat.icon}
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 ${activeCategory === cat.id ? "text-white" : "text-slate-900 group-hover:text-indigo-600"
                      }`}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed max-w-xs ${activeCategory === cat.id ? "text-indigo-100" : "text-slate-500"
                      }`}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95 cursor-pointer">
            View All Categories
          </button>
        </div>
      </section>

      {/* ----------------- HOW TUTOROG WORKS ----------------- */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Tag */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-3">
            HOW TUTOROG WORKS
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-16">
            Simple steps to start learning
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-100/70 border border-purple-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-sm">
                  <HiMagnifyingGlass className="w-9 h-9" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Search & Discover</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                Find the best tutors and institutes near you or online.
              </p>
            </div>

            {/* Connecting Arc Line 1 */}
            <div className="hidden md:block absolute top-10 left-[22%] w-[16%] border-t-2 border-dashed border-indigo-200/80 pointer-events-none" />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-100/70 border border-purple-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-sm">
                  <HiUser className="w-9 h-9" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Explore & Compare</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                Check profiles, courses, reviews and ratings.
              </p>
            </div>

            {/* Connecting Arc Line 2 */}
            <div className="hidden md:block absolute top-10 left-[47%] w-[16%] border-t-2 border-dashed border-indigo-200/80 pointer-events-none" />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-100/70 border border-purple-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-sm">
                  <HiChatBubbleLeftEllipsis className="w-9 h-9" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Connect Easily</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                Contact tutors directly via call, chat or demo class request.
              </p>
            </div>

            {/* Connecting Arc Line 3 */}
            <div className="hidden md:block absolute top-10 left-[72%] w-[16%] border-t-2 border-dashed border-indigo-200/80 pointer-events-none" />

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-100/70 border border-purple-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-sm">
                  <HiRocketLaunch className="w-9 h-9" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  4
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Start Learning</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                Begin your learning journey and achieve your goals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- ARE YOU A TUTOR OR COACH? ----------------- */}
      <section id="tutors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-100 via-indigo-50/70 to-purple-100/60 rounded-3xl p-8 sm:p-12 lg:p-14 border border-indigo-100/60 relative overflow-hidden shadow-xl shadow-indigo-900/5">

            <div className="grid lg:grid-cols-12 gap-10 items-center">

              {/* Left Details */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                  Are you a tutor or coach?
                </h2>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-600 leading-tight mb-6">
                  Grow your classes with Tutorog.
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-md">
                  Create your free profile, get discovered by more students and grow your coaching business.
                </p>
                <Link
                  href="#list-classes"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>List Your Classes – It&apos;s Free</span>
                  <HiArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Right Graphics Mockup */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl bg-white p-3 sm:p-4 shadow-2xl border border-slate-200/80 overflow-hidden">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src="/dashboard-preview.png"
                      alt="Tutor Dashboard Mockup"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Floating Feature Badges */}
                <div className="hidden sm:flex flex-col gap-3 absolute -right-4 top-1/2 -translate-y-1/2">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:scale-105 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <HiArrowTrendingUp className="w-4 h-4" />
                    </div>
                    <span>Get More Visibility</span>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:scale-105 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <HiInboxStack className="w-4 h-4" />
                    </div>
                    <span>Receive Quality Leads</span>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:scale-105 transition-transform">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <HiChartBar className="w-4 h-4" />
                    </div>
                    <span>Grow Your Business</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ----------------- STATS BAR ----------------- */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 shadow-xl shadow-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

            {/* Stat 1 */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HiUserGroup className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">10,000+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500">Tutors & Institutes</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HiSquares2X2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">50+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500">Categories</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HiFaceSmile className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">1,00,000+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500">Students Trust Us</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HiMapPin className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">500+</div>
                <div className="text-xs sm:text-sm font-medium text-slate-500">Cities Covered</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-[#0b1329] text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">

            {/* Col 1: Brand Info */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <HiAcademicCap className="w-5 h-5" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Tutor<span className="text-indigo-400">og</span>
                </span>
              </Link>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                India&apos;s trusted platform to discover tutors, coaching institutes and mentors for academics, sports, arts and more.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Explore */}
            <div className="lg:col-span-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Find Classes</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Top Tutors</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Top Institutes</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">All Categories</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">All Cities</Link></li>
              </ul>
            </div>

            {/* Col 3: For Tutors */}
            <div className="lg:col-span-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">For Tutors</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">List Your Classes</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Tutor Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>

            {/* Col 4: Company */}
            <div className="lg:col-span-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Col 5: Stay Updated Newsletter */}
            <div className="lg:col-span-2 flex flex-col">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Stay Updated</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Subscribe to get tips, updates and learning resources.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>

          </div>

          {/* Copyright Bottom */}
          <div className="pt-8 text-center text-xs text-slate-500">
            © 2026 Tutorog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
