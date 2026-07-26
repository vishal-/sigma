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
  HiStar,
  HiSparkles,
  HiPlay,
  HiBars3,
  HiCheckCircle,
  HiHeart,
  HiCalendarDays,
  HiAcademicCap,
  HiArrowRight,
} from "react-icons/hi2";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

interface DanceProfileViewProps {
  organization: OrganizationProps;
}

export default function DanceProfileView({
  organization: org,
}: DanceProfileViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
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
          message: selectedClass
            ? `Interested in Class: ${selectedClass}. ${inquiryMessage}`
            : inquiryMessage,
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setTimeout(() => {
          setLeadSuccess(false);
          setLeadModalOpen(false);
          setInquiryName("");
          setInquiryPhone("");
          setSelectedClass("");
          setInquiryMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const openInquiryForClass = (className?: string) => {
    if (className) setSelectedClass(className);
    setLeadModalOpen(true);
  };

  // Subjects or Dance Styles offered
  const danceStyles =
    org.subjects && org.subjects.length > 0
      ? org.subjects.map((s) => s.name)
      : ["Classical Bharatanatyam", "Bollywood Fusion", "Hip Hop & Urban", "Contemporary & Jazz"];

  // Default moments / gallery highlights if gallery is empty
  const defaultMoments = [
    {
      title: "Annual Showcase",
      type: "video",
      icon: "play",
      img: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Hip Hop Workshop",
      type: "video",
      icon: "play",
      img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Behind The Scenes",
      type: "photo",
      icon: "instagram",
      img: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Bollywood Night",
      type: "video",
      icon: "play",
      img: "https://images.unsplash.com/photo-1535525153412-5a42439e210d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-pink-600 selection:text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={org.name}
              className="w-10 h-10 rounded-xl object-cover border border-pink-500/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/30">
              <HiSparkles className="w-5 h-5" />
            </div>
          )}
          <div>
            <span className="font-black text-lg text-white tracking-tight leading-tight block">
              {org.name}
            </span>
            <span className="text-[10px] font-bold text-pink-400 tracking-wider uppercase block">
              Dance Academy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#about" className="hover:text-pink-400 transition">
            About
          </a>
          <a href="#why-us" className="hover:text-pink-400 transition">
            Why Us
          </a>
          <a href="#classes" className="hover:text-pink-400 transition">
            Classes
          </a>
          <a href="#moments" className="hover:text-pink-400 transition">
            Moments
          </a>
          <a href="#contact" className="hover:text-pink-400 transition">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {org.phone && (
            <a
              href={`tel:${org.phone}`}
              className="w-10 h-10 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 transition"
              title="Call Academy"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}

          <Button
            onClick={() => openInquiryForClass()}
            className="hidden sm:inline-flex bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-pink-600/30 transition border border-pink-400/20"
          >
            Enquire Now
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0E15] border-b border-slate-800 px-6 py-4 space-y-3 animate-fadeIn text-sm font-medium text-slate-300">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-pink-400"
          >
            About
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-pink-400"
          >
            Why Us
          </a>
          <a
            href="#classes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-pink-400"
          >
            Classes
          </a>
          <a
            href="#moments"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-pink-400"
          >
            Moments
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-pink-400"
          >
            Contact
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openInquiryForClass();
            }}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs py-2.5 rounded-full mt-2"
          >
            Enquire Now
          </Button>
        </div>
      )}

      {/* ---------------- HERO SECTION ---------------- */}
      <section
        id="about"
        className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center px-4 sm:px-8 pt-10 pb-16 overflow-hidden"
      >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              coverMedia?.originalUrl ||
              "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1600&auto=format&fit=crop"
            }
            alt={org.name}
            className="w-full h-full object-cover object-center opacity-35 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/90 via-transparent to-[#0A0A0F]/90" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-widest uppercase">
            <HiSparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            MOVE • EXPRESS • INSPIRE
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Where Passion Takes the{" "}
            <span className="font-serif italic text-amber-300 drop-shadow-[0_2px_10px_rgba(252,211,77,0.3)] block sm:inline">
              First Step
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            {org.description ||
              `${org.name} is a place where every step creates confidence, discipline and memories.`}
          </p>

          {/* Hero Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => openInquiryForClass()}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 hover:opacity-90 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-pink-600/40 transition flex items-center justify-center gap-2 border border-pink-400/30"
            >
              <HiUserGroup className="w-5 h-5" />
              <span>Explore Classes</span>
            </Button>

            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition flex items-center justify-center gap-2.5 backdrop-blur-md"
            >
              <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <HiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch Video</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- STATS HIGHLIGHTS BAR ---------------- */}
      <section className="px-4 sm:px-8 max-w-5xl mx-auto -mt-6 relative z-20">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-2">
              <HiUserGroup className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">250+</span>
            <span className="text-xs font-semibold text-slate-400 mt-1">Happy Students</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
              <HiTrophy className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">25+</span>
            <span className="text-xs font-semibold text-slate-400 mt-1">Events & Shows</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
              <HiStar className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">10+</span>
            <span className="text-xs font-semibold text-slate-400 mt-1">Years of Excellence</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
              <HiAcademicCap className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">15+</span>
            <span className="text-xs font-semibold text-slate-400 mt-1">Awards Won</span>
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US SECTION ---------------- */}
      <section id="why-us" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-pink-400 tracking-widest uppercase block">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            More Than Just Dance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 rounded-3xl p-6 space-y-4 transition duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/15 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Expert Trainers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learn from passionate & experienced choreographers dedicated to bringing out your best form.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 rounded-3xl p-6 space-y-4 transition duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/15 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition">
              <HiStar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">All Age Groups</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programs specially designed for Kids, Teens & Adults from beginner to stage level.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 rounded-3xl p-6 space-y-4 transition duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/15 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition">
              <HiCalendarDays className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Flexible Batches</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multiple batch timings to fit seamlessly with your school, college & work schedule.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 rounded-3xl p-6 space-y-4 transition duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/15 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition">
              <HiHeart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Personal Growth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build confidence, stage presence, body fitness, and artistic creativity with every routine.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- DANCE CLASSES OFFERED ---------------- */}
      <section id="classes" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-pink-400 tracking-widest uppercase block mb-1">
              DISCOVER PROGRAMS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">Our Dance Batches</h2>
          </div>
          <p className="text-slate-400 text-xs max-w-md">
            Join structured classes tailored for beginners, hobbyists, and performance artists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {danceStyles.map((styleName, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-5 hover:border-pink-500/30 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[11px] font-bold">
                    All Levels
                  </span>
                  <span className="text-slate-500 text-xs font-medium">Weekday & Weekend</span>
                </div>
                <h3 className="text-xl font-bold text-white">{styleName}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Master rhythm, footwork, and expressive choreography under expert dance masters.
                </p>
              </div>

              <Button
                type="button"
                onClick={() => openInquiryForClass(styleName)}
                className="w-full bg-slate-800 hover:bg-pink-600 text-slate-200 hover:text-white font-bold text-xs py-2.5 rounded-2xl transition gap-2"
              >
                <span>Join This Batch</span>
                <HiArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- GLIMPSES OF OUR JOURNEY / MOMENTS ---------------- */}
      <section id="moments" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-pink-400 tracking-widest uppercase block">
            GLIMPSES OF OUR JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Moments That Move Us
          </h2>
        </div>

        {/* Gallery / Moments Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {galleryMedia.length > 0
            ? galleryMedia.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveMediaUrl(item.originalUrl)}
                  className="group relative aspect-[3/4] rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer shadow-lg"
                >
                  <img
                    src={item.originalUrl}
                    alt={item.altText || org.name}
                    className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">
                      {item.altText || "Gallery Moment"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-md">
                      <HiPlay className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              ))
            : defaultMoments.map((moment, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaUrl(moment.img)}
                  className="group relative aspect-[3/4] rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer shadow-lg"
                >
                  <img
                    src={moment.img}
                    alt={moment.title}
                    className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-70 transition" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {moment.title}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-md shrink-0">
                      {moment.icon === "instagram" ? (
                        <FaInstagram className="w-4 h-4" />
                      ) : (
                        <HiPlay className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ---------------- CTA / BE A PART OF OUR DANCE FAMILY ---------------- */}
      <section className="py-12 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-pink-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight relative z-10">
            Be a Part of Our Dance Family
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed relative z-10">
            Join {org.name} today and start your journey of rhythm, joy and transformation.
          </p>

          <div className="pt-2 relative z-10">
            <Button
              onClick={() => openInquiryForClass()}
              className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 hover:opacity-90 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-pink-600/30 transition border border-pink-400/30 inline-flex items-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5 text-emerald-300" />
              <span>Enquire Now</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER INFO BAR ---------------- */}
      <footer id="contact" className="border-t border-slate-800/80 bg-[#07070B] py-8 px-4 sm:px-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <HiMapPin className="w-4 h-4 text-pink-400 shrink-0" />
              <span>{fullAddress}</span>
            </div>

            {org.phone && (
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-amber-400 shrink-0" />
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
              <HiClock className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Mon - Sun: 6AM - 9PM</span>
            </div>
          </div>

          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} {org.name}. Powered by Tutorog.
          </div>
        </div>
      </footer>

      {/* ---------------- LEAD INQUIRY MODAL ---------------- */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Enquire with {org.name}</h3>
              <p className="text-slate-400 text-xs mt-1">
                Fill out the details below and our dance masters will contact you shortly.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-center space-y-2">
                <HiCheckCircle className="w-8 h-8 mx-auto text-emerald-400" />
                <p>Thank you! Your inquiry has been sent to the academy.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-name" className="text-xs">
                    Your Name <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lead-phone" className="text-xs">
                    Phone Number <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lead-message" className="text-xs">
                    Message / Batch Preference
                  </Label>
                  <Textarea
                    id="lead-message"
                    rows={3}
                    placeholder="Ask about batch timings, fee structure, or age groups..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs py-3 rounded-2xl shadow-lg shadow-pink-600/30"
                >
                  {submittingLead ? "Sending..." : "Submit Inquiry"}
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
                alt="Dance Moment"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-pink-600/20 text-pink-400 flex items-center justify-center">
                  <HiPlay className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold text-white">Dance Performance Preview</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Visit {org.name} or contact us directly to watch full stage performances and workshop recordings!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
