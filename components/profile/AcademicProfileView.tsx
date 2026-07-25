"use client";

import React, { useState } from "react";
import {
  HiAcademicCap,
  HiPhone,
  HiMapPin,
  HiEnvelope,
  HiClock,
  HiCheck,
  HiXMark,
  HiUserGroup,
  HiTrophy,
  HiBookOpen,
  HiSparkles,
  HiArrowRight,
  HiPencilSquare,
  HiPlay,
  HiChatBubbleLeftRight,
  HiCheckBadge,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

export default function AcademicProfileView({
  organization,
}: {
  organization: OrganizationProps;
}) {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryCourse, setInquiryCourse] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const location = organization.locations[0];
  const logoMedia = organization.images.find((m) => m.type === "LOGO");
  const coverMedia = organization.images.find((m) => m.type === "COVER");

  const heroImage = coverMedia?.originalUrl || "/images/academic_hero_student.png";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLead(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: organization.id,
          name: inquiryName,
          phone: inquiryPhone,
          message: inquiryCourse ? `Course: ${inquiryCourse}. ${inquiryMessage}` : inquiryMessage,
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setTimeout(() => {
          setLeadSuccess(false);
          setLeadModalOpen(false);
          setInquiryName("");
          setInquiryPhone("");
          setInquiryCourse("");
          setInquiryMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const subjectsList = organization.category?.children
    ? organization.category.children.map((c) => c.name)
    : organization.category
    ? [organization.category.name]
    : organization.categories
    ? organization.categories.map((c) => c.category.name)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={organization.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-600/20">
              <HiBookOpen className="w-6 h-6" />
            </div>
          )}
          <div>
            <h1 className="font-extrabold text-lg text-slate-900 leading-tight">
              {organization.name}
            </h1>
            <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              {organization.tagline || "Academic Excellence Institute"}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#hero" className="hover:text-blue-600 transition">Home</a>
          <a href="#courses" className="hover:text-blue-600 transition">Courses</a>
          <a href="#features" className="hover:text-blue-600 transition">Why Choose Us</a>
          <a href="#testimonial" className="hover:text-blue-600 transition">Success Stories</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {organization.phone && (
            <a
              href={`tel:${organization.phone}`}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              <HiPhone className="w-4 h-4 text-blue-600" />
              <span>{organization.phone}</span>
            </a>
          )}
          <Button
            onClick={() => setLeadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-lg shadow-blue-600/25"
          >
            Enquire Now
          </Button>
        </div>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="hero" className="relative pt-8 pb-16 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wide">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <span>ADMISSIONS OPEN FOR {new Date().getFullYear()} - {new Date().getFullYear() + 1}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Learn Today, <br />
              <span className="text-blue-600">Lead Tomorrow</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {organization.description || organization.tagline || "Expert guidance, personalized learning and proven results to help you achieve your academic goals."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                onClick={() => setLeadModalOpen(true)}
                className="h-12 px-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 gap-2"
              >
                <HiBookOpen className="w-5 h-5" />
                <span>Explore Courses</span>
              </Button>
              {organization.phone && (
                <a
                  href={`tel:${organization.phone}`}
                  className="h-12 px-6 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold text-sm flex items-center gap-2.5 transition shadow-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <HiPhone className="w-4 h-4" />
                  </div>
                  <span>Call Us Now</span>
                </a>
              )}
            </div>

            {/* Social Proof Pill */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80 max-w-md">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <div className="w-8 h-8 rounded-full bg-amber-400 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                  1.5K+
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Students learning & growing with <span className="font-bold text-slate-900">{organization.name}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/20 via-amber-400/20 to-indigo-600/20 blur-xl opacity-70"></div>

              {/* Main Student Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3]">
                <img
                  src={heroImage}
                  alt="Student learning"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Book Stack Graphics Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] hidden sm:block animate-float-slow">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Class Subjects</span>
                </div>
                <div className="space-y-1">
                  <div className="bg-blue-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg">PHYSICS</div>
                  <div className="bg-cyan-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg">CHEMISTRY</div>
                  <div className="bg-indigo-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg">MATHEMATICS</div>
                </div>
              </div>

              {/* Floating Excellence Badge */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[180px] text-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-1">
                  <HiTrophy className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Achieve Excellence Together</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Inspiring minds. Building futures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- METRICS & HIGHLIGHTS STRIP ---------------- */}
      <section className="bg-white border-y border-slate-200/80 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Top Row: 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                <HiUserGroup className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">1500+</div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">Students Enrolled</div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HiTrophy className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">98%</div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">Success Rate</div>
            </div>

            <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                <HiBookOpen className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">30+</div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">Courses Offered</div>
            </div>

            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <HiCheckBadge className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">10+</div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">Years of Excellence</div>
            </div>
          </div>

          {/* Bottom Row: 4 Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <HiAcademicCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Expert Faculty</h4>
                <p className="text-xs text-slate-500 mt-0.5">Experienced educators dedicated to your success.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <HiSparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Personalized Learning</h4>
                <p className="text-xs text-slate-500 mt-0.5">Custom study plans that fit your academic goals.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <HiTrophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Proven Results</h4>
                <p className="text-xs text-slate-500 mt-0.5">High success rate with consistent performance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <HiClock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Continuous Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">We&apos;re here to guide you every step of the way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- OUR COURSES SECTION ---------------- */}
      <section id="courses" className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">OUR COURSES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Programs Designed for Every Learner
            </h2>
          </div>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="text-sm font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition"
          >
            <span>View All Programs</span>
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <HiBookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-slate-900">School Tuitions</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Subjects simplified for better understanding and strong fundamental concepts across all boards.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
                Class 5 - 12
              </span>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition"
              >
                Enquire &rarr;
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <HiPencilSquare className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-slate-900">Competitive Exams</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Focused preparation for JEE, NEET, CET, Olympiads & Board rank-booster test series.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                JEE • NEET • CET
              </span>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition"
              >
                Enquire &rarr;
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <HiAcademicCap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-slate-900">Foundation Courses</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Build strong basics in Mathematics and Sciences for a bright academic & career future.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200/60">
                Class 6 - 10
              </span>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="text-xs font-bold text-purple-600 group-hover:translate-x-1 transition"
              >
                Enquire &rarr;
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <HiPlay className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-slate-900">Online Classes</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Learn from anywhere with interactive live sessions, doubt resolution & recorded lectures.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                Live • Recorded
              </span>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition"
              >
                Enquire &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Subjects Tags Pill Cloud */}
        {subjectsList.length > 0 && (
          <div className="mt-10 bg-slate-100/70 p-6 rounded-3xl border border-slate-200/80">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-3">
              Offered Subjects & Specializations
            </span>
            <div className="flex flex-wrap gap-2">
              {subjectsList.map((subject, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold shadow-xs border border-slate-200/80 flex items-center gap-1.5"
                >
                  <HiCheck className="w-3.5 h-3.5 text-blue-600" />
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-8 bg-amber-50/40 border-y border-amber-100/80">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">WHY CHOOSE US</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              A Learning Experience That Makes A Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <HiAcademicCap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Student Focused</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We focus on your strengths and individual growth with tailored mentorship.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <HiPencilSquare className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Regular Assessments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Weekly tests and detailed performance feedback to track continuous progress.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <HiBookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Study Resources</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                High-quality chapter notes, practice question banks & previous year papers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <HiChatBubbleLeftRight className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Parent Updates</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Stay informed with regular parent-teacher meetings and digital progress reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIAL / SUCCESS STORY ---------------- */}
      <section id="testimonial" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
            <img
              src="/images/academic_testimonial_student.png"
              alt="Ananya S."
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto md:mx-0 shadow-md shadow-blue-600/30">
              “
            </div>
            <p className="text-slate-800 text-lg sm:text-xl font-bold leading-relaxed">
              &quot;{organization.name} helped me build confidence and achieve my competitive dream. The teachers truly care and clarify every doubt!&quot;
            </p>
            <div>
              <div className="font-black text-slate-900 text-base">– Ananya S.</div>
              <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider mt-0.5">
                JEE Advanced Qualifier
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- READY TO START CTA BANNER ---------------- */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-600/25">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Ready to Start Your Success Journey?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Join {organization.name} today and take the first step towards a brighter academic future.
            </p>
          </div>

          <Button
            onClick={() => setLeadModalOpen(true)}
            className="bg-white text-blue-700 hover:bg-blue-50 font-black text-base h-13 px-8 rounded-2xl shadow-lg shrink-0 gap-2 cursor-pointer"
          >
            <span>Enquire Now</span>
            <HiArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ---------------- FOOTER & CONTACT INFORMATION ---------------- */}
      <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  <HiBookOpen className="w-5 h-5" />
                </div>
                <span className="font-black text-white text-lg">{organization.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {organization.tagline || "Providing quality academic coaching and personalized tutoring for students."}
              </p>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">Location</h4>
              {location && (
                <div className="text-xs text-slate-400 space-y-1 flex items-start gap-2">
                  <HiMapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    {location.addressLine1}, {location.city}, {location.state}
                  </span>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">Contact Us</h4>
              {organization.phone && (
                <a href={`tel:${organization.phone}`} className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition">
                  <HiPhone className="w-4 h-4 text-blue-500" />
                  <span>{organization.phone}</span>
                </a>
              )}
              {organization.email && (
                <a href={`mailto:${organization.email}`} className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition">
                  <HiEnvelope className="w-4 h-4 text-blue-500" />
                  <span>{organization.email}</span>
                </a>
              )}
            </div>

            {/* Timings */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">Timings</h4>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <HiClock className="w-4 h-4 text-blue-500" />
                <span>Mon - Sun: 8:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} {organization.name}. Powered by <span className="text-slate-300 font-bold">Tutorog</span>.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition"><FaFacebookF className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition"><FaInstagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition"><FaYoutube className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition"><FaLinkedinIn className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------- LEAD INQUIRY MODAL ---------------- */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 animate-fadeIn text-left">
            <button
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">INQUIRE TODAY</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Get in Touch with {organization.name}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your details below and our counseling team will get back to you shortly.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <HiCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Submitted!</h4>
                <p className="text-slate-600 text-xs">
                  Thank you! Our counselor will reach out to you on {inquiryPhone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-name" className="text-xs font-bold text-slate-700">Student / Parent Name *</Label>
                  <Input
                    id="lead-name"
                    required
                    placeholder="Enter your name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lead-phone" className="text-xs font-bold text-slate-700">Phone Number *</Label>
                  <Input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="Enter 10-digit phone number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lead-course" className="text-xs font-bold text-slate-700">Interested Program / Subject</Label>
                  <Input
                    id="lead-course"
                    placeholder="e.g. Class 10 Maths, JEE Physics..."
                    value={inquiryCourse}
                    onChange={(e) => setInquiryCourse(e.target.value)}
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lead-msg" className="text-xs font-bold text-slate-700">Message / Questions</Label>
                  <Textarea
                    id="lead-msg"
                    rows={3}
                    placeholder="Any specific requirement or timing preference..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {submittingLead ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
