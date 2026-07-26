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
  HiShieldCheck,
  HiAcademicCap,
  HiChartBar,
  HiBuildingLibrary,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

interface SportsProfileViewProps {
  organization: OrganizationProps;
}

export default function SportsProfileView({
  organization: org,
}: SportsProfileViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string>("");
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
          message: selectedSport
            ? `Trial Request for Sport: ${selectedSport}. ${inquiryMessage}`
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
          setSelectedSport("");
          setInquiryMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const openTrialForSport = (sportName?: string) => {
    if (sportName) setSelectedSport(sportName);
    setTrialModalOpen(true);
  };

  // Sports programs offered
  const sportsList: { name: string; age: string; img?: string }[] =
    org.subjects && org.subjects.length > 0
      ? org.subjects.map((s) => ({ name: s.name, age: "6–18 Years" }))
      : [
          { name: "Football", age: "4–18 Years", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop" },
          { name: "Cricket", age: "6–18 Years", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop" },
          { name: "Basketball", age: "6–18 Years", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop" },
          { name: "Athletics", age: "6–18 Years", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop" },
          { name: "Badminton", age: "5–18 Years", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop" },
          { name: "Swimming", age: "4–18 Years", img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop" },
        ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={org.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 font-black text-xl">
              <HiShieldCheck className="w-6 h-6" />
            </div>
          )}
          <div>
            <span className="font-black text-lg text-slate-900 tracking-tight leading-tight block uppercase">
              {org.name}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase block">
              Sports Academy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <a href="#home" className="text-emerald-600 border-b-2 border-emerald-600 pb-0.5">
            Home
          </a>
          <a href="#about" className="hover:text-emerald-600 transition">
            About Us
          </a>
          <a href="#programs" className="hover:text-emerald-600 transition">
            Programs
          </a>
          <a href="#facilities" className="hover:text-emerald-600 transition">
            Facilities
          </a>
          <a href="#gallery" className="hover:text-emerald-600 transition">
            Gallery
          </a>
          <a href="#contact" className="hover:text-emerald-600 transition">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {org.phone && (
            <a
              href={`tel:${org.phone}`}
              className="w-10 h-10 rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 transition"
              title="Call Academy"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}

          <Button
            onClick={() => openTrialForSport()}
            className="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <span>Book a Trial</span>
            <HiArrowRight className="w-4 h-4" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
          >
            {mobileMenuOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 animate-fadeIn text-xs font-bold text-slate-700 uppercase tracking-wider">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-emerald-600">
            Home
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
            About Us
          </a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
            Programs
          </a>
          <a href="#facilities" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
            Facilities
          </a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
            Gallery
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
            Contact
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openTrialForSport();
            }}
            className="w-full bg-emerald-600 text-white font-extrabold text-xs py-2.5 rounded-full mt-2"
          >
            Book a Trial
          </Button>
        </div>
      )}

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex items-center px-4 sm:px-8 py-12 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-emerald-100/40">
        {/* Dynamic Graphic Diagonal Backdrop Lines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-600/10 to-transparent pointer-events-none hidden lg:block" />
        <div className="absolute -right-20 top-0 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 text-xs font-black tracking-widest uppercase">
              <HiSparkles className="w-4 h-4 text-emerald-600" />
              TRAIN • PLAY • WIN
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
              Building <br className="hidden sm:inline" />
              <span className="text-emerald-600">Champions</span> <br />
              For Life
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              {org.description ||
                org.tagline ||
                "Professional coaching, world-class facilities and a passion for sports – helping every athlete reach their full potential."}
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={() => openTrialForSport()}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Explore Programs</span>
                <HiArrowRight className="w-5 h-5" />
              </Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600/20 text-emerald-700 flex items-center justify-center">
                  <HiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={
                  coverMedia?.originalUrl ||
                  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop"
                }
                alt={org.name}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-3.5 text-center text-white shadow-xl">
                <span className="text-2xl font-black text-emerald-400 block leading-none">25+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mt-1">
                  Sports Programs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURE HIGHLIGHTS BAR ---------------- */}
      <section id="about" className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <HiTrophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Expert Coaches</h4>
              <p className="text-xs text-slate-500 mt-1">Experienced & certified coaches</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <HiBuildingLibrary className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">World-Class Facilities</h4>
              <p className="text-xs text-slate-500 mt-1">Premium infrastructure for every sport</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <HiChartBar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Proven Results</h4>
              <p className="text-xs text-slate-500 mt-1">Developing winners on and off the field</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">All Age Groups</h4>
              <p className="text-xs text-slate-500 mt-1">Programs for kids, teens & adults</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROGRAMS SECTION ("FIND YOUR GAME") ---------------- */}
      <section id="programs" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block mb-1">
              OUR PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Find Your Game
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
              Discover a wide range of sports programs designed for every passion and age group.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTrialForSport()}
            className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>View All Programs</span>
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sportsList.map((sport, idx) => (
            <div
              key={idx}
              onClick={() => openTrialForSport(sport.name)}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={
                    sport.img ||
                    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-md">
                  <HiShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">{sport.name}</h3>
                  <span className="text-xs text-slate-500 font-semibold">{sport.age}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition flex items-center justify-center">
                  <HiArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DARK EMERALD STATS BANNER ---------------- */}
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-8 border-y border-emerald-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/60">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/40 text-emerald-400 flex items-center justify-center mb-3">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">1500+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 mt-1">Happy Athletes</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/40 text-emerald-400 flex items-center justify-center mb-3">
              <HiAcademicCap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">50+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 mt-1">Expert Coaches</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/40 text-emerald-400 flex items-center justify-center mb-3">
              <HiBuildingLibrary className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">5</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 mt-1">Sports Complexes</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/40 text-emerald-400 flex items-center justify-center mb-3">
              <HiTrophy className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">200+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 mt-1">Events Won</span>
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY & HIGHLIGHTS ---------------- */}
      <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block">
            GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Athletic Moments
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryMedia.length > 0
            ? galleryMedia.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveMediaUrl(item.originalUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-200"
                >
                  <img
                    src={item.originalUrl}
                    alt={item.altText || org.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))
            : [
                "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaUrl(imgUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-200 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Sports Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ---------------- FOOTER & CONTACT ---------------- */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <HiMapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{fullAddress}</span>
            </div>

            {org.phone && (
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${org.phone}`} className="hover:text-white">
                  {org.phone}
                </a>
              </div>
            )}

            {org.email && (
              <div className="flex items-center gap-2">
                <HiEnvelope className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${org.email}`} className="hover:text-white">
                  {org.email}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mon - Sun: 5AM - 9PM</span>
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
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                Free Trial Session
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Book a Trial with {org.name}
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Experience our professional sports training firsthand.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center space-y-2">
                <HiCheckCircle className="w-8 h-8 mx-auto text-emerald-600" />
                <p>Thank you! Your trial request has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="trial-name" className="text-xs">
                    Athlete / Parent Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="trial-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="trial-phone" className="text-xs">
                    Phone Number <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="trial-phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="trial-message" className="text-xs">
                    Selected Sport & Details
                  </Label>
                  <Textarea
                    id="trial-message"
                    rows={3}
                    placeholder="Mention preferred sport (e.g. Football, Cricket) & age group..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-emerald-600/30"
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
            className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-2 shadow-2xl"
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
                alt="Sports Moment"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <HiPlay className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold text-white">Sports Training Video</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Visit {org.name} or contact us directly to watch full training sessions and tournament highlights!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
