"use client";

import React, { useState } from "react";
import {
  HiPhone,
  HiMapPin,
  HiEnvelope,
  HiClock,
  HiXMark,
  HiUserGroup,
  HiTrophy,
  HiSparkles,
  HiPlay,
  HiBars3,
  HiCheckCircle,
  HiArrowRight,
  HiHeart,
  HiCalendar,
  HiClipboardDocumentCheck,
  HiFire,
  HiBolt,
  HiCheck,
  HiStar,
  HiChartBar,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

interface FitnessProfileViewProps {
  organization: OrganizationProps;
}

export default function FitnessProfileView({
  organization: org,
}: FitnessProfileViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);

  // Inquiry Form state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const logoMedia = org.images?.find((m) => m.type === "LOGO");
  const coverMedia = org.images?.find((m) => m.type === "COVER");
  const galleryMedia = org.images?.filter((m) => m.type === "GALLERY") || [];

  const location = org.locations?.[0];
  const fullAddress = location
    ? `${location.city}${location.state ? `, ${location.state}` : ""}`
    : "India";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLead(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: org.id,
          name: inquiryName,
          phone: inquiryPhone,
          message: selectedProgram
            ? `Free Fitness Trial Request for: ${selectedProgram}. ${inquiryMessage}`
            : inquiryMessage,
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setTimeout(() => {
          setLeadSuccess(false);
          setTrialModalOpen(false);
          setInquiryName("");
          setInquiryPhone("");
          setSelectedProgram("");
          setInquiryMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const openTrialForProgram = (programName?: string) => {
    if (programName) setSelectedProgram(programName);
    setTrialModalOpen(true);
  };

  // Fitness programs offered
  const fitnessPrograms: { name: string; subtitle: string; level: string; img?: string }[] =
    org.subjects && org.subjects.length > 0
      ? org.subjects.map((s) => ({
          name: s.name,
          subtitle: "Burn Fat & Build Strength",
          level: "All Levels",
        }))
      : [
          {
            name: "Weight Loss",
            subtitle: "Burn fat & tone your body with effective workouts",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Muscle Building",
            subtitle: "Build lean muscle & increase strength",
            level: "Intermediate to Advanced",
            img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Yoga & Flexibility",
            subtitle: "Improve flexibility, balance & mental well-being",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "HIIT & Conditioning",
            subtitle: "High intensity workouts for stamina & endurance",
            level: "Intermediate to Advanced",
            img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Personal Training",
            subtitle: "1-on-1 dedicated coaching tailored to your body",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "CrossFit & Strength",
            subtitle: "Functional movements for maximum power",
            level: "Advanced",
            img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop",
          },
        ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-600 selection:text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-red-900/30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg shadow-red-950/20">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={org.name}
              className="w-10 h-10 rounded-xl object-cover border border-red-500/40"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-600/40 font-black text-xl italic">
              <HiBolt className="w-6 h-6 fill-current" />
            </div>
          )}
          <div>
            <span className="font-black text-lg text-white tracking-tight leading-tight block uppercase italic">
              {org.name}
            </span>
            <span className="text-[10px] font-extrabold text-red-500 tracking-widest uppercase block">
              Fitness & Health Academy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <a href="#home" className="text-red-500 border-b-2 border-red-500 pb-0.5">
            Home
          </a>
          <a href="#about" className="hover:text-red-500 transition">
            About Us
          </a>
          <a href="#programs" className="hover:text-red-500 transition">
            Programs
          </a>
          <a href="#lifestyle" className="hover:text-red-500 transition">
            Trainers
          </a>
          <a href="#gallery" className="hover:text-red-500 transition">
            Schedule
          </a>
          <a href="#contact" className="hover:text-red-500 transition">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {org.phone && (
            <a
              href={`tel:${org.phone}`}
              className="w-10 h-10 rounded-full border border-red-500/30 bg-red-950/60 text-red-400 flex items-center justify-center hover:bg-red-900/50 transition"
              title="Call Academy"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}

          <Button
            onClick={() => openTrialForProgram()}
            className="hidden sm:inline-flex bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg shadow-red-600/40 transition flex items-center gap-2 uppercase tracking-wider"
          >
            <span>Book a Free Trial</span>
            <HiArrowRight className="w-4 h-4" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-red-900/40 px-6 py-4 space-y-3 animate-fadeIn text-xs font-bold text-slate-300 uppercase tracking-wider">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-red-500">
            Home
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-500">
            About Us
          </a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-500">
            Programs
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-500">
            Contact
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openTrialForProgram();
            }}
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs py-2.5 rounded-full mt-2 uppercase"
          >
            Book a Free Trial
          </Button>
        </div>
      )}

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="home" className="relative min-h-[600px] lg:min-h-[660px] flex items-center px-4 sm:px-8 py-12 overflow-hidden bg-[#0A0507]">
        {/* Crimson Red Glow Backdrops */}
        <div className="absolute right-[-10%] top-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-red-600/20 via-rose-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-black tracking-widest uppercase">
              <HiFire className="w-4 h-4 text-red-500" />
              STRONGER BODY. HEALTHIER YOU.
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] uppercase italic">
              TRAIN TODAY <br />
              <span className="text-red-600 drop-shadow-md">
                TRANSFORM TOMORROW
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              {org.description ||
                org.tagline ||
                "Expert coaching, personalized programs and a supportive community to help you become the best version of yourself."}
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={() => openTrialForProgram()}
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-95 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-red-600/40 transition flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>Explore Programs</span>
                <HiArrowRight className="w-5 h-5" />
              </Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
                  <HiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Hero Bottom 4 Pillars */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                  <HiTrophy className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">Certified Trainers</h5>
                  <p className="text-[10px] text-slate-400">Qualified experts</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                  <HiHeart className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">Personalized Plans</h5>
                  <p className="text-[10px] text-slate-400">Tailored workouts</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                  <HiUserGroup className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">Community</h5>
                  <p className="text-[10px] text-slate-400">Results together</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                  <HiChartBar className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">Proven Results</h5>
                  <p className="text-[10px] text-slate-400">Real people</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Frame with Dark Card Overlay */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-red-600/30 bg-slate-900">
              <img
                src={
                  coverMedia?.originalUrl ||
                  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                }
                alt={org.name}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Floating Dark Fitness Card */}
              <div className="absolute top-6 right-6 bg-[#0E0608]/90 backdrop-blur-md border border-red-600/40 rounded-2xl p-4 text-white shadow-2xl w-48 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-500 block">
                  YOUR FITNESS JOURNEY
                </span>
                <h5 className="font-black text-xs uppercase tracking-tight text-white">
                  STARTS HERE
                </h5>
                <div className="space-y-1.5 pt-1 text-[10px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <HiCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Weight Loss</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Muscle Building</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Flexibility & Yoga</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Better Health</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHITE FEATURE HIGHLIGHTS BAR ---------------- */}
      <section id="about" className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-900">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
              <HiClipboardDocumentCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Fitness Assessment</h4>
              <p className="text-xs text-slate-500 mt-1">Understand your body & goals</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
              <HiSparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Nutrition Guidance</h4>
              <p className="text-xs text-slate-500 mt-1">Eat right. Fuel right. Live right.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
              <HiCalendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Flexible Schedules</h4>
              <p className="text-xs text-slate-500 mt-1">Morning, Evening & Weekend batches</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">All Fitness Levels</h4>
              <p className="text-xs text-slate-500 mt-1">Beginners to Athletes, we coach all</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROGRAMS SECTION ("PROGRAMS FOR EVERY GOAL") ---------------- */}
      <section id="programs" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-red-500 tracking-widest uppercase block mb-1">
              OUR PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Programs for Every Goal
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md">
              Choose from a variety of programs designed by experts to help you reach your goals.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTrialForProgram()}
            className="text-xs font-extrabold text-red-500 hover:text-red-400 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>View All Programs</span>
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Fitness Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fitnessPrograms.map((program, idx) => (
            <div
              key={idx}
              onClick={() => openTrialForProgram(program.name)}
              className="bg-white text-slate-900 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={
                    program.img ||
                    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                  <HiFire className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-black text-slate-900 text-base">{program.name}</h3>
                  <span className="text-xs text-slate-500 font-semibold block">{program.subtitle}</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">
                    {program.level}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition flex items-center justify-center">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DARK LIFESTYLE CALL-TO-ACTION BANNER ---------------- */}
      <section id="lifestyle" className="px-4 sm:px-8 max-w-7xl mx-auto py-6">
        <div className="bg-[#090406] border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 border border-red-600/30">
              <HiHeart className="w-7 h-7 text-red-500 fill-current" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight">
                It&apos;s Not Just a Workout.
              </h3>
              <p className="text-red-500 font-black text-xl uppercase italic">
                It&apos;s a Lifestyle.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><HiCheckCircle className="w-4 h-4 text-red-500" /> Stay Active</span>
            <span className="flex items-center gap-1.5"><HiCheckCircle className="w-4 h-4 text-red-500" /> Eat Clean</span>
            <span className="flex items-center gap-1.5"><HiCheckCircle className="w-4 h-4 text-red-500" /> Train Hard</span>
            <span className="flex items-center gap-1.5"><HiCheckCircle className="w-4 h-4 text-red-500" /> Live Well</span>
          </div>

          <div className="shrink-0">
            <Button
              onClick={() => openTrialForProgram()}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-95 text-white font-extrabold text-xs px-8 py-3.5 rounded-full shadow-lg shadow-red-600/40 uppercase tracking-wider"
            >
              Ready to Transform? Book a Free Trial →
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- VIBRANT RED STATS BANNER ---------------- */}
      <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-12 px-4 sm:px-8 shadow-xl mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-red-500/50">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-3">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">5000+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 mt-1">Happy Members</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-3">
              <HiTrophy className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">50+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 mt-1">Expert Trainers</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-3">
              <HiCalendar className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">100+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 mt-1">Weekly Classes</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-3">
              <HiMapPin className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">4</span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 mt-1">Locations</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-3">
              <HiStar className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">4.9/5</span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-100 mt-1">Average Rating</span>
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY SECTION ---------------- */}
      <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-red-500 tracking-widest uppercase block">
            GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Gym Transformations & Workouts
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryMedia.length > 0
            ? galleryMedia.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveMediaUrl(item.originalUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-800"
                >
                  <img
                    src={item.originalUrl}
                    alt={item.altText || org.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))
            : [
                "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop",
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaUrl(imgUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-800 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Fitness Workout"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ---------------- FOOTER & CONTACT ---------------- */}
      <footer id="contact" className="bg-[#090406] text-slate-300 py-12 px-4 sm:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <HiMapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>{fullAddress}</span>
            </div>

            {org.phone && (
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${org.phone}`} className="hover:text-white">
                  {org.phone}
                </a>
              </div>
            )}

            {org.email && (
              <div className="flex items-center gap-2">
                <HiEnvelope className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${org.email}`} className="hover:text-white">
                  {org.email}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4 text-red-500 shrink-0" />
              <span>Mon - Sun: 6AM - 10PM</span>
            </div>
          </div>

          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} {org.name}. Powered by Tutorog.
          </div>
        </div>
      </footer>

      {/* ---------------- BOOK A TRIAL MODAL ---------------- */}
      {trialModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-900/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn text-white">
            <button
              type="button"
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block">
                Free Fitness Pass
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Book a Free Trial with {org.name}
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Start your transformation journey today.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold text-center space-y-2">
                <HiCheckCircle className="w-8 h-8 mx-auto text-red-500" />
                <p>Thank you! Your fitness trial request has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="trial-name" className="text-xs text-slate-200">
                    Full Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="trial-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="trial-phone" className="text-xs text-slate-200">
                    Phone Number <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="trial-phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="trial-message" className="text-xs text-slate-200">
                    Program / Goal Interest
                  </Label>
                  <Textarea
                    id="trial-message"
                    rows={3}
                    placeholder="Mention goal (e.g. Weight Loss, Muscle Building, Yoga)..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-95 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-red-600/40 uppercase tracking-wider"
                >
                  {submittingLead ? "Submitting..." : "Submit Trial Request"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ---------------- MEDIA PREVIEW LIGHTBOX MODAL ---------------- */}
      {(videoModalOpen || activeMediaUrl) && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => {
            setVideoModalOpen(false);
            setActiveMediaUrl(null);
          }}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 border border-red-900/40 rounded-3xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setVideoModalOpen(false);
                setActiveMediaUrl(null);
              }}
              className="absolute top-4 right-4 z-10 text-white bg-slate-950/80 hover:bg-slate-950 p-2 rounded-full border border-slate-800"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            {activeMediaUrl ? (
              <img
                src={activeMediaUrl}
                alt="Fitness Transformation"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
                  <HiPlay className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold text-white">Gym Transformation Video</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Visit {org.name} or contact us directly to watch client transformation journeys and workout highlights!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
