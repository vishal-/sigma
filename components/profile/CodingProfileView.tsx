"use client";

import React, { useState } from "react";
import {
  HiPhone,
  HiMapPin,
  HiEnvelope,
  HiClock,
  HiXMark,
  HiUserGroup,
  HiPlay,
  HiBars3,
  HiCheckCircle,
  HiArrowRight,
  HiAcademicCap,
  HiCodeBracket,
  HiCommandLine,
  HiBriefcase,
  HiRocketLaunch,
  HiAcademicCap as HiCertificate,
  HiComputerDesktop,
  HiBuildingOffice2,
  HiStar,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrganizationProps } from "@/types/organization";

interface CodingProfileViewProps {
  organization: OrganizationProps;
}

export default function CodingProfileView({
  organization: org,
}: CodingProfileViewProps) {
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
            ? `Free Trial Request for Tech Course: ${selectedCourse}. ${inquiryMessage}`
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

  // Coding courses offered
  const codingCourses: { name: string; subtitle: string; level: string; img?: string }[] =
    org.subjects && org.subjects.length > 0
      ? org.subjects.map((s) => ({
          name: s.name,
          subtitle: "Full Stack & Modern Tech",
          level: "Beginner to Advanced",
        }))
      : [
          {
            name: "Web Development",
            subtitle: "HTML, CSS, JavaScript, React & Node",
            level: "Beginner to Advanced",
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "App Development",
            subtitle: "Flutter, React Native, iOS & Android",
            level: "Beginner to Advanced",
            img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Data Science & AI",
            subtitle: "Python, Machine Learning & AI",
            level: "Intermediate to Advanced",
            img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Cyber Security",
            subtitle: "Ethical Hacking, Network & Defense",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "Cloud & DevOps",
            subtitle: "AWS, Docker, Kubernetes & CI/CD",
            level: "Intermediate",
            img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "UI/UX Design",
            subtitle: "Figma, Prototyping & Design Systems",
            level: "All Levels",
            img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
          },
        ];

  return (
    <div className="min-h-screen bg-[#040817] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-[#040817]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg shadow-cyan-950/30">
        <div className="flex items-center gap-3">
          {logoMedia ? (
            <img
              src={logoMedia.originalUrl}
              alt={org.name}
              className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30 font-black text-xl">
              <HiCodeBracket className="w-6 h-6 stroke-[3]" />
            </div>
          )}
          <div>
            <span className="font-black text-lg text-white tracking-tight leading-tight block uppercase">
              {org.name}
            </span>
            <span className="text-[10px] font-extrabold text-cyan-400 tracking-widest uppercase block">
              Coding & Tech Academy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <a href="#home" className="text-cyan-400 border-b-2 border-cyan-400 pb-0.5">
            Home
          </a>
          <a href="#about" className="hover:text-cyan-400 transition">
            About Us
          </a>
          <a href="#courses" className="hover:text-cyan-400 transition">
            Courses
          </a>
          <a href="#bootcamps" className="hover:text-cyan-400 transition">
            Bootcamps
          </a>
          <a href="#why-us" className="hover:text-cyan-400 transition">
            Mentors
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {org.phone && (
            <a
              href={`tel:${org.phone}`}
              className="w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-400 flex items-center justify-center hover:bg-cyan-900/50 transition"
              title="Call Academy"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}

          <Button
            onClick={() => openTrialForCourse()}
            className="hidden sm:inline-flex bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg shadow-cyan-500/30 transition flex items-center gap-2"
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
        <div className="md:hidden bg-[#060D26] border-b border-cyan-500/20 px-6 py-4 space-y-3 animate-fadeIn text-xs font-bold text-slate-300 uppercase tracking-wider">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-cyan-400">
            Home
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-cyan-400">
            About Us
          </a>
          <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-cyan-400">
            Courses
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-cyan-400">
            Contact
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openTrialForCourse();
            }}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs py-2.5 rounded-full mt-2"
          >
            Book a Free Trial
          </Button>
        </div>
      )}

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="home" className="relative min-h-[600px] lg:min-h-[660px] flex items-center px-4 sm:px-8 py-12 overflow-hidden bg-gradient-to-b from-[#040817] via-[#060E2A] to-[#040817]">
        {/* Glowing Cyber Orbs */}
        <div className="absolute right-[-10%] top-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-600/15 to-purple-600/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black tracking-widest uppercase">
              <HiCodeBracket className="w-4 h-4 text-cyan-400" />
              LEARN. BUILD. INNOVATE.
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
              CODE TODAY. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                CREATE TOMORROW.
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              {org.description ||
                org.tagline ||
                "Future-ready coding & tech education for students, professionals & innovators."}
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={() => openTrialForCourse()}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-cyan-500/30 transition flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <HiArrowRight className="w-5 h-5" />
              </Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#091230] hover:bg-[#0E1A45] border border-cyan-500/30 text-white font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <HiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Frame with Code Overlay */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 bg-[#060D26]">
              <img
                src={
                  coverMedia?.originalUrl ||
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
                }
                alt={org.name}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040817] via-transparent to-transparent" />

              {/* Floating Dark Cyber Badge */}
              <div className="absolute bottom-6 right-6 bg-[#040817]/90 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 text-center text-white shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <HiUserGroup className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xl font-black text-cyan-400 block leading-none">10K+</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mt-1">
                    Students Empowered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURE HIGHLIGHTS BAR ---------------- */}
      <section id="about" className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="bg-[#071133]/90 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Expert Mentors</h4>
              <p className="text-xs text-slate-400 mt-1">Industry professionals as your mentors</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <HiCommandLine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Hands-on Learning</h4>
              <p className="text-xs text-slate-400 mt-1">Real projects & practical experience</p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <HiBriefcase className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Placement Support</h4>
              <p className="text-xs text-slate-400 mt-1">Dedicated support for your dream career</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TECH STACK MARQUEE / GRID ---------------- */}
      <section id="bootcamps" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-slate-900">
          <div className="shrink-0 text-center md:text-left">
            <span className="text-xs font-black text-cyan-700 tracking-widest uppercase block">
              SKILLS YOU LEARN
            </span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              In-Demand Tech Stack
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black">
            {["HTML5", "CSS3", "JavaScript", "Python", "React", "Node.js", "SQL", "Docker", "AWS"].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-cyan-50 hover:text-cyan-700 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COURSES SECTION ("FROM BASICS TO BREAKTHROUGHS") ---------------- */}
      <section id="courses" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-cyan-400 tracking-widest uppercase block mb-1">
              OUR COURSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              From Basics to Breakthroughs
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md">
              Whether you&apos;re a beginner or looking to level up, we have the perfect path for you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTrialForCourse()}
            className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>View All Courses</span>
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Coding Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {codingCourses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => openTrialForCourse(course.name)}
              className="bg-[#071133]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:border-cyan-500/40 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={
                    course.img ||
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071133] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-[#040817] text-cyan-400 border border-cyan-500/30 flex items-center justify-center shadow-md">
                  <HiCodeBracket className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-black text-white text-base">{course.name}</h3>
                  <span className="text-xs text-slate-400 font-semibold block">{course.subtitle}</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                    {course.level}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cyan-950 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition flex items-center justify-center">
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US SECTION ---------------- */}
      <section id="why-us" className="py-16 px-4 sm:px-8 bg-[#060D2A] border-y border-cyan-500/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-cyan-400 tracking-widest uppercase block">
              WHY CHOOSE US?
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Building Coders. Building Futures.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-[#040817] p-6 rounded-3xl border border-slate-800 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <HiRocketLaunch className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Project Based Learning</h4>
              <p className="text-xs text-slate-400">Build real-world production ready projects</p>
            </div>

            <div className="bg-[#040817] p-6 rounded-3xl border border-slate-800 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <HiUserGroup className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-white">1:1 Mentorship</h4>
              <p className="text-xs text-slate-400">Personalized guidance at every step</p>
            </div>

            <div className="bg-[#040817] p-6 rounded-3xl border border-slate-800 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <HiCertificate className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Industry Recognized Certificates</h4>
              <p className="text-xs text-slate-400">Boost your career credibility</p>
            </div>

            <div className="bg-[#040817] p-6 rounded-3xl border border-slate-800 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <HiComputerDesktop className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-white">Career Support</h4>
              <p className="text-xs text-slate-400">Resume, interview & placement help</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- DARK TECH STATS BANNER ---------------- */}
      <section className="bg-[#020512] text-white py-12 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <HiUserGroup className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">500+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Expert Mentors</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <HiAcademicCap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">10K+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Students Enrolled</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <HiCodeBracket className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">200+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Courses & Programs</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">1000+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Hiring Partners</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <HiStar className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black tracking-tight">95%</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Placement Rate</span>
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY SECTION ---------------- */}
      <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-cyan-400 tracking-widest uppercase block">
            GALLERY & HACKATHONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Hackathons & Coding Demos
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
                  <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))
            : [
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaUrl(imgUrl)}
                  className="aspect-square rounded-2xl bg-slate-900 overflow-hidden cursor-pointer relative group border border-slate-800 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Coding Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ---------------- FOOTER & CONTACT ---------------- */}
      <footer id="contact" className="bg-[#020512] text-slate-400 py-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <HiMapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{fullAddress}</span>
            </div>

            {org.phone && (
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${org.phone}`} className="hover:text-white">
                  {org.phone}
                </a>
              </div>
            )}

            {org.email && (
              <div className="flex items-center gap-2">
                <HiEnvelope className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${org.email}`} className="hover:text-white">
                  {org.email}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Mon - Sun: 8AM - 10PM</span>
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
          <div className="bg-[#060D26] border border-cyan-500/30 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn text-white">
            <button
              type="button"
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">
                Free Tech Demo Class
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Book a Free Trial with {org.name}
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Experience our hands-on coding & tech bootcamps.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold text-center space-y-2">
                <HiCheckCircle className="w-8 h-8 mx-auto text-cyan-400" />
                <p>Thank you! Your trial request has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="trial-name" className="text-xs text-slate-200">
                    Student / Learner Name <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="trial-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="bg-[#040817] border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="trial-phone" className="text-xs text-slate-200">
                    Phone Number <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="trial-phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="bg-[#040817] border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="trial-message" className="text-xs text-slate-200">
                    Course / Tech Interest
                  </Label>
                  <Textarea
                    id="trial-message"
                    rows={3}
                    placeholder="Mention domain (e.g. Web Dev, Data Science, Cyber Security)..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="bg-[#040817] border-slate-800 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-cyan-500/30"
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
            className="relative max-w-3xl w-full bg-[#060D26] border border-cyan-500/30 rounded-3xl overflow-hidden p-2 shadow-2xl"
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
                alt="Coding Showcase"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-[#040817] flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <HiPlay className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg font-bold text-white">Coding Demo & Project Showcase</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  Visit {org.name} or contact us directly to watch full hackathon demos and student project walkthroughs!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
