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
  HiPaintBrush,
  HiLightBulb,
  HiFaceSmile,
  HiStar,
  HiComputerDesktop,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

interface ArtsProfileViewProps {
  organization: OrganizationProps;
}

export default function ArtsProfileView({
  organization: org,
}: ArtsProfileViewProps) {
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
            ? `Free Trial Request for Art Program: ${selectedCourse}. ${inquiryMessage}`
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

  // Art courses offered
  const artCourses: { name: string; subtitle: string; level: string; img?: string }[] =
    org.subjects && org.subjects.length > 0
      ? org.subjects.map((s) => ({
          name: s.name,
          subtitle: "Watercolor, Acrylic & Sketching",
          level: "All Levels",
        }))
      : [
          {
            name: "Painting",
            subtitle: "Watercolor, Acrylic, Oil & More",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Crafting",
            subtitle: "Paper Craft, DIY, Mixed Media",
            level: "All Ages",
            img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Drawing",
            subtitle: "Pencil Sketching, Charcoal & More",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Sculpture & Pottery",
            subtitle: "Clay Modeling, Pottery & 3D Art",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Digital Art",
            subtitle: "Illustration, Photoshop & iPad Art",
            level: "Intermediate",
            img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Calligraphy & Lettering",
            subtitle: "Brush Pen, Gothic & Modern",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
          },
        ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={org.name}
              className="w-10 h-10 rounded-xl object-cover border border-orange-400/40"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
              <HiPaintBrush className="w-6 h-6" />
            </div>
          )}
          <div>
            <span className="font-black text-lg text-slate-900 tracking-tight leading-tight block uppercase">
              {org.name}
            </span>
            <span className="text-[10px] font-extrabold text-orange-600 tracking-widest uppercase block">
              Art & Craft Academy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <a href="#home" className="text-orange-600 border-b-2 border-orange-600 pb-0.5">
            Home
          </a>
          <a href="#about" className="hover:text-orange-600 transition">
            About Us
          </a>
          <a href="#courses" className="hover:text-orange-600 transition">
            Courses
          </a>
          <a href="#why-us" className="hover:text-orange-600 transition">
            Workshops
          </a>
          <a href="#gallery" className="hover:text-orange-600 transition">
            Gallery
          </a>
          <a href="#contact" className="hover:text-orange-600 transition">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {org.phone && (
            <a
              href={`tel:${org.phone}`}
              className="w-10 h-10 rounded-full border border-orange-300 bg-orange-50 text-orange-700 flex items-center justify-center hover:bg-orange-100 transition"
              title="Call Studio"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}

          <Button
            onClick={() => openTrialForCourse()}
            className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:opacity-95 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 transition flex items-center gap-2"
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
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-orange-600">
            Home
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-orange-600">
            About Us
          </a>
          <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-orange-600">
            Courses
          </a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-orange-600">
            Gallery
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-orange-600">
            Contact
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openTrialForCourse();
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs py-2.5 rounded-full mt-2"
          >
            Book a Free Trial
          </Button>
        </div>
      )}

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex items-center px-4 sm:px-8 py-12 overflow-hidden bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-teal-50/70">
        {/* Artistic Splashes */}
        <div className="absolute right-[-10%] top-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-teal-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-600/10 border border-teal-600/20 text-teal-700 text-xs font-black tracking-widest uppercase">
              <HiSparkles className="w-4 h-4 text-teal-600" />
              IMAGINE. CREATE. INSPIRE.
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Unleash <br />
              <span className="text-teal-700 font-extrabold">Your </span>
              <span className="font-serif italic text-orange-600 drop-shadow-sm">
                Creativity
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              {org.description ||
                org.tagline ||
                "Nurturing creativity in every age through exciting art & craft programs, expert guidance, and hands-on learning."}
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={() => openTrialForCourse()}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:opacity-95 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-orange-500/30 transition flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <HiArrowRight className="w-5 h-5" />
              </Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-slate-100 border border-orange-300 text-orange-900 font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500/15 text-orange-600 flex items-center justify-center">
                  <HiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Frame */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={
                  coverMedia?.originalUrl ||
                  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop"
                }
                alt={org.name}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

              {/* Floating Teal Circle Badge */}
              <div className="absolute top-6 right-6 bg-teal-800/90 backdrop-blur-md border border-teal-400/40 rounded-full w-24 h-24 p-2 text-center text-white shadow-2xl flex flex-col items-center justify-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-100 block leading-tight">
                  For <br />
                  <span className="text-sm font-extrabold text-white">All Ages</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURE HIGHLIGHTS BAR ---------------- */}
      <section id="about" className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="bg-white border border-orange-100 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
              <HiPaintBrush className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Expert Instructors</h4>
              <p className="text-xs text-slate-500 mt-1">Experienced & passionate art educators</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <HiSparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Creative Learning</h4>
              <p className="text-xs text-slate-500 mt-1">Fun, engaging & hands-on sessions</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">All Age Groups</h4>
              <p className="text-xs text-slate-500 mt-1">Programs for kids, teens & adults</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
              <HiAcademicCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Exhibit & Shine</h4>
              <p className="text-xs text-slate-500 mt-1">Showcase your artwork in exhibitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- COURSES SECTION ("EXPLORE. LEARN. CREATE.") ---------------- */}
      <section id="courses" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-teal-600 tracking-widest uppercase block mb-1">
              OUR PROGRAMS ~~~
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore. Learn. Create.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
              A wide range of art & craft courses designed to bring out the artist in you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTrialForCourse()}
            className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>View All Courses</span>
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Art Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artCourses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => openTrialForCourse(course.name)}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={
                    course.img ||
                    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-md">
                  <HiPaintBrush className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-black text-slate-900 text-base">{course.name}</h3>
                  <span className="text-xs text-slate-500 font-semibold block">{course.subtitle}</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                    {course.level}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 group-hover:bg-orange-500 group-hover:text-white transition flex items-center justify-center">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WHY JOIN US SECTION (WARM CANVAS BANNER) ---------------- */}
      <section id="why-us" className="py-16 px-4 sm:px-8 bg-amber-50/80 border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-teal-700 tracking-widest uppercase block">
              WHY JOIN US?
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Empowering Creative Minds
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <HiStar className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Boosts Creativity</h4>
              <p className="text-[11px] text-slate-500">Encourages imagination & self-expression</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <HiFaceSmile className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Builds Confidence</h4>
              <p className="text-[11px] text-slate-500">Helps learners grow and believe in themselves</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <HiLightBulb className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Develops Skills</h4>
              <p className="text-[11px] text-slate-500">Enhances fine motor skills & artistic techniques</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <HiUserGroup className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Fun & Relaxing</h4>
              <p className="text-[11px] text-slate-500">A perfect way to relax and unwind</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col items-center space-y-2 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <HiTrophy className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Achievement</h4>
              <p className="text-[11px] text-slate-500">Opportunities to participate & win recognition</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- DARK TEAL STATS BANNER ---------------- */}
      <section className="bg-teal-900 text-white py-12 px-4 sm:px-8 border-y border-teal-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-teal-800">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-800/60 text-teal-300 flex items-center justify-center mb-3">
              <HiFaceSmile className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">1500+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 mt-1">Happy Students</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-800/60 text-teal-300 flex items-center justify-center mb-3">
              <HiAcademicCap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">25+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 mt-1">Expert Instructors</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-800/60 text-teal-300 flex items-center justify-center mb-3">
              <HiComputerDesktop className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">60+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 mt-1">Courses</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-800/60 text-teal-300 flex items-center justify-center mb-3">
              <HiPaintBrush className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">500+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 mt-1">Artworks Created</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-teal-800/60 text-teal-300 flex items-center justify-center mb-3">
              <HiTrophy className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">30+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 mt-1">Exhibitions & Events</span>
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY SECTION ---------------- */}
      <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-orange-600 tracking-widest uppercase block">
            GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Art Gallery & Student Exhibition
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
                  <div className="absolute inset-0 bg-teal-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))
            : [
                "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop",
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaUrl(imgUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-200 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Art Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-teal-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
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
              <HiMapPin className="w-4 h-4 text-orange-400 shrink-0" />
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
                <HiEnvelope className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`mailto:${org.email}`} className="hover:text-white">
                  {org.email}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mon - Sun: 9AM - 8PM</span>
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
          <div className="bg-white border border-orange-200 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">
                Free Art Trial
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Book a Free Trial with {org.name}
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Experience our hands-on painting & craft workshop.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold text-center space-y-2">
                <HiCheckCircle className="w-8 h-8 mx-auto text-orange-600" />
                <p>Thank you! Your trial workshop request has been submitted.</p>
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
                    Program / Art Form Interest
                  </Label>
                  <Textarea
                    id="trial-message"
                    rows={3}
                    placeholder="Mention art form (e.g. Painting, Pottery, Sketching)..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-orange-500/30"
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
                alt="Art Showcase"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <HiPlay className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold text-white">Art Studio Workshop Video</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Visit {org.name} or contact us directly to watch full workshop tutorials and exhibition highlights!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
