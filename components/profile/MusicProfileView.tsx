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
  HiAcademicCap,
  HiMusicalNote,
  HiAdjustmentsVertical,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

interface MusicProfileViewProps {
  organization: OrganizationProps;
}

export default function MusicProfileView({
  organization: org,
}: MusicProfileViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
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
          message: selectedCourse
            ? `Free Trial Request for Course: ${selectedCourse}. ${inquiryMessage}`
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
          setSelectedCourse("");
          setInquiryMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const openTrialForCourse = (courseName?: string) => {
    if (courseName) setSelectedCourse(courseName);
    setTrialModalOpen(true);
  };

  // Music courses offered
  const musicCourses: { name: string; subtitle: string; level: string; img?: string }[] =
    org.subjects && org.subjects.length > 0
      ? org.subjects.map((s) => ({
          name: s.name,
          subtitle: "Classical & Western",
          level: "All Levels",
        }))
      : [
          {
            name: "Guitar",
            subtitle: "Acoustic & Electric",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Piano & Keyboard",
            subtitle: "Classical & Western",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Vocal Music",
            subtitle: "Hindustani & Western",
            level: "Beginner to Advanced",
            img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Violin",
            subtitle: "Classical & Contemporary",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Indian Classical",
            subtitle: "Tabla, Flute & Sitar",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Drums & Percussion",
            subtitle: "Rock, Jazz & Beats",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop",
          },
        ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-600 selection:text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={org.name}
              className="w-10 h-10 rounded-xl object-cover border border-purple-400/40"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <HiMusicalNote className="w-6 h-6" />
            </div>
          )}
          <div>
            <span className="font-black text-lg text-slate-900 tracking-tight leading-tight block uppercase">
              {org.name}
            </span>
            <span className="text-[10px] font-extrabold text-purple-600 tracking-widest uppercase block">
              Music Academy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <a href="#home" className="text-purple-600 border-b-2 border-purple-600 pb-0.5">
            Home
          </a>
          <a href="#about" className="hover:text-purple-600 transition">
            About Us
          </a>
          <a href="#courses" className="hover:text-purple-600 transition">
            Courses
          </a>
          <a href="#instruments" className="hover:text-purple-600 transition">
            Instruments
          </a>
          <a href="#gallery" className="hover:text-purple-600 transition">
            Faculty
          </a>
          <a href="#contact" className="hover:text-purple-600 transition">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {org.phone && (
            <a
              href={`tel:${org.phone}`}
              className="w-10 h-10 rounded-full border border-purple-300 bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition"
              title="Call Academy"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}

          <Button
            onClick={() => openTrialForCourse()}
            className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-90 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg shadow-purple-600/30 transition flex items-center gap-2"
          >
            <span>Book a Free Trial</span>
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
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-purple-600">
            Home
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-purple-600">
            About Us
          </a>
          <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-purple-600">
            Courses
          </a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-purple-600">
            Gallery
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-purple-600">
            Contact
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openTrialForCourse();
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs py-2.5 rounded-full mt-2"
          >
            Book a Free Trial
          </Button>
        </div>
      )}

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex items-center px-4 sm:px-8 py-12 overflow-hidden bg-gradient-to-br from-purple-100/70 via-pink-50/50 to-indigo-100/60">
        {/* Dynamic Curved Glow Orbs */}
        <div className="absolute right-[-10%] top-[-20%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-700 text-xs font-black tracking-widest uppercase">
              <HiMusicalNote className="w-4 h-4 text-purple-600" />
              FEEL THE MUSIC. LIVE THE RHYTHM.
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
              DISCOVER. <br />
              LEARN. <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                PLAY YOUR WAY.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              {org.description ||
                org.tagline ||
                "Nurturing passion and talent through world-class music education for all ages and levels."}
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={() => openTrialForCourse()}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-95 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-purple-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <HiArrowRight className="w-5 h-5" />
              </Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-slate-100 border border-purple-300 text-purple-900 font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-purple-600/15 text-purple-600 flex items-center justify-center">
                  <HiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Frame with Circular Ring */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={
                  coverMedia?.originalUrl ||
                  "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop"
                }
                alt={org.name}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Floating Dark Circle Badge */}
              <div className="absolute bottom-6 right-6 bg-[#0B051D]/90 backdrop-blur-md border border-purple-500/40 rounded-full w-32 h-32 p-3 text-center text-white shadow-2xl flex flex-col items-center justify-center">
                <HiMusicalNote className="w-6 h-6 text-pink-400 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-200 block leading-tight">
                  WHERE TALENT FINDS STAGE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURE HIGHLIGHTS BAR ---------------- */}
      <section id="about" className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="bg-white border border-purple-200/80 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <HiMusicalNote className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Expert Faculty</h4>
              <p className="text-xs text-slate-500 mt-1">Trained & experienced musicians</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">For All Ages</h4>
              <p className="text-xs text-slate-500 mt-1">Kids, teens & adults welcome</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <HiAdjustmentsVertical className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Personalized Learning</h4>
              <p className="text-xs text-slate-500 mt-1">Courses designed to suit your goals</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <HiTrophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Performance Opportunities</h4>
              <p className="text-xs text-slate-500 mt-1">Recitals, events & competitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- COURSES SECTION ("FIND YOUR PERFECT NOTE") ---------------- */}
      <section id="courses" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-purple-600 tracking-widest uppercase block mb-1">
              OUR PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Find Your Perfect Note
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
              From classical to contemporary, choose from a variety of courses crafted for every music lover.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTrialForCourse()}
            className="text-xs font-extrabold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>View All Courses</span>
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Music Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {musicCourses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => openTrialForCourse(course.name)}
              className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={
                    course.img ||
                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md">
                  <HiMusicalNote className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-black text-slate-900 text-base">{course.name}</h3>
                  <span className="text-xs text-slate-500 font-semibold block">{course.subtitle}</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold">
                    {course.level}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition flex items-center justify-center">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DARK PURPLE STATS BANNER ---------------- */}
      <section className="bg-[#13072E] text-white py-12 px-4 sm:px-8 border-y border-purple-900/60">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-purple-900/50">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-pink-400 flex items-center justify-center mb-3">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">2000+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mt-1">Happy Students</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-pink-400 flex items-center justify-center mb-3">
              <HiAcademicCap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">25+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mt-1">Expert Teachers</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-pink-400 flex items-center justify-center mb-3">
              <HiMusicalNote className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">50+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mt-1">Courses</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-pink-400 flex items-center justify-center mb-3">
              <HiSparkles className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">100+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mt-1">Performances</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-pink-400 flex items-center justify-center mb-3">
              <HiTrophy className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">15+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mt-1">Awards Won</span>
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY & HIGHLIGHTS ---------------- */}
      <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-purple-600 tracking-widest uppercase block">
            GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Stage Performances & Recitals
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
                  <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))
            : [
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaUrl(imgUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-200 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Music Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ---------------- FOOTER & CONTACT ---------------- */}
      <footer id="contact" className="bg-[#0B051D] text-slate-300 py-12 px-4 sm:px-8 border-t border-purple-900/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <HiMapPin className="w-4 h-4 text-pink-400 shrink-0" />
              <span>{fullAddress}</span>
            </div>

            {org.phone && (
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`tel:${org.phone}`} className="hover:text-white">
                  {org.phone}
                </a>
              </div>
            )}

            {org.email && (
              <div className="flex items-center gap-2">
                <HiEnvelope className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={`mailto:${org.email}`} className="hover:text-white">
                  {org.email}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Mon - Sun: 7AM - 9PM</span>
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
          <div className="bg-white border border-purple-200 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block">
                Free Music Trial
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Book a Free Trial with {org.name}
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Experience our instrument & vocal training firsthand.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold text-center space-y-2">
                <HiCheckCircle className="w-8 h-8 mx-auto text-purple-600" />
                <p>Thank you! Your music trial request has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="trial-name" className="text-xs">
                    Student / Parent Name <span className="text-rose-500">*</span>
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
                    Instrument / Course Interest
                  </Label>
                  <Textarea
                    id="trial-message"
                    rows={3}
                    placeholder="Mention instrument (e.g. Guitar, Piano, Vocal) & current skill level..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-purple-600/30"
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
                alt="Music Performance"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <HiPlay className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold text-white">Music Recital & Performance Preview</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Visit {org.name} or contact us directly to watch full concert performances and student recitals!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
