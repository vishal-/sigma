"use client";

import React, { useState } from "react";
import {
  HiPhone,
  HiMapPin,
  HiGlobeAlt,
  HiEnvelope,
  HiCheckBadge,
  HiShare,
  HiPaperAirplane,
  HiBuildingOffice2,
  HiPhoto,
  HiXMark,
  HiCheck,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AcademicProfileView from "@/components/profile/AcademicProfileView";
import DanceProfileView from "@/components/profile/DanceProfileView";
import SportsProfileView from "@/components/profile/SportsProfileView";
import { OrganizationProps } from "@/types/organization";

interface PublicProfileProps {
  organization: OrganizationProps;
}

export default function PublicProfileView({ organization: org }: PublicProfileProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Inquiry Form state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const categoryEnum = (org.category || "").toUpperCase();

  const isSports =
    org.type === "SPORTS" ||
    categoryEnum === "SPORTS" ||
    org.name.toLowerCase().includes("sport") ||
    org.name.toLowerCase().includes("athletic");

  if (isSports) {
    return <SportsProfileView organization={org} />;
  }

  const isDance =
    org.type === "DANCE" ||
    categoryEnum === "DANCE" ||
    org.name.toLowerCase().includes("dance") ||
    org.name.toLowerCase().includes("studio");

  if (isDance) {
    return <DanceProfileView organization={org} />;
  }

  const isAcademic =
    org.type === "ACADEMY" ||
    org.type === "COACHING" ||
    org.type === "INDIVIDUAL" ||
    categoryEnum === "ACADEMICS" ||
    org.name.toLowerCase().includes("academic") ||
    org.name.toLowerCase().includes("tuition");

  if (isAcademic) {
    return <AcademicProfileView organization={org} />;
  }

  const logoMedia = org.images.find((m) => m.type === "LOGO");
  const coverMedia = org.images.find((m) => m.type === "COVER");
  const galleryMedia = org.images.filter((m) => m.type === "GALLERY");

  const location = org.locations[0];
  const publicUrl = typeof window !== "undefined" ? window.location.href : `https://tutorog.com/${org.slug}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: org.name,
        text: `Check out ${org.name} on Tutorog!`,
        url: publicUrl,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

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
          message: inquiryMessage,
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setTimeout(() => {
          setLeadSuccess(false);
          setShowInquiryModal(false);
          setInquiryName("");
          setInquiryPhone("");
          setInquiryMessage("");
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const mapQuery = location ? encodeURIComponent(`${location.addressLine1}, ${location.city}`) : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-16">
      {/* Top Banner & Header */}
      <div className="relative w-full h-64 md:h-80 bg-slate-900 overflow-hidden">
        {coverMedia?.originalUrl ? (
          <img src={coverMedia.originalUrl} alt={org.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
            <HiBuildingOffice2 className="w-16 h-16 text-slate-800" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10 space-y-8">
        {/* Profile Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Logo Avatar */}
              <div className="w-28 h-28 rounded-3xl bg-slate-950 border-4 border-slate-900 overflow-hidden shadow-2xl shrink-0 flex items-center justify-center -mt-14">
                {logoMedia?.originalUrl ? (
                  <img src={logoMedia.originalUrl} alt={org.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center font-black text-3xl text-white">
                    {org.name[0]}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{org.name}</h1>
                  {org.verified && (
                    <HiCheckBadge className="w-6 h-6 text-indigo-400" title="Verified Academy" />
                  )}
                </div>
                {org.tagline && <p className="text-slate-300 text-sm mt-1">{org.tagline}</p>}

                {/* Category Pills & Location */}
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  {location && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
                      <HiMapPin className="w-3.5 h-3.5 text-rose-400" />
                      {location.city}
                    </span>
                  )}

                  {org.category && (
                    <span
                      className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider"
                    >
                      {org.category}
                    </span>
                  )}
                  {org.subjects?.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Top CTA Buttons */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
              >
                <HiShare className="w-4 h-4 text-indigo-400" />
                {copied ? "Copied!" : "Share Profile"}
              </button>

              <button
                type="button"
                onClick={() => setShowInquiryModal(true)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
              >
                <HiPaperAirplane className="w-4 h-4" />
                Inquire Now
              </button>
            </div>
          </div>

          {/* Quick Action Contact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            {org.whatsapp && (
              <a
                href={`https://wa.me/${org.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                WhatsApp
              </a>
            )}

            {org.phone && (
              <a
                href={`tel:${org.phone}`}
                className="px-4 py-3 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <HiPhone className="w-4 h-4 text-indigo-400" />
                Call Now
              </a>
            )}

            {org.email && (
              <a
                href={`mailto:${org.email}`}
                className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <HiEnvelope className="w-4 h-4 text-purple-400" />
                Email Us
              </a>
            )}

            {org.website && (
              <a
                href={org.website.startsWith("http") ? org.website : `https://${org.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <HiGlobeAlt className="w-4 h-4 text-sky-400" />
                Website
              </a>
            )}
          </div>
        </div>

        {/* About & Description */}
        {org.description && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">About Academy</h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{org.description}</p>
          </div>
        )}

        {/* Gallery Section */}
        {galleryMedia.length > 0 && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <HiPhoto className="w-6 h-6 text-emerald-400" />
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item.originalUrl)}
                  className="cursor-pointer aspect-square rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden group relative"
                >
                  <img
                    src={item.originalUrl}
                    alt={item.altText || org.name}
                    className="w-full h-full object-cover transition group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Map Section */}
        {location && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <HiMapPin className="w-6 h-6 text-purple-400" />
              Address & Location
            </h2>
            <p className="text-slate-300 text-sm">
              {location.addressLine1}, {location.city}, {location.state}
            </p>

            {/* Embedded OpenStreetMap / Google Map iFrame */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl w-full max-h-[90vh]">
            <img src={activeImage} alt="Full view" className="w-full h-full object-contain rounded-2xl" />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800"
            >
              <HiXMark className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 md:p-8 space-y-6 relative">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white">Inquire with {org.name}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the form below to get in touch regarding classes and batches.
              </p>
            </div>

            {leadSuccess ? (
              <div className="p-6 text-center space-y-3">
                <HiCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-lg">Inquiry Submitted!</h4>
                <p className="text-slate-300 text-xs">
                  {org.name} will contact you shortly on your phone number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <Label htmlFor="inquiry-name">Your Name</Label>
                  <Input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <Label htmlFor="inquiry-phone">Phone Number</Label>
                  <Input
                    id="inquiry-phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <Label htmlFor="inquiry-message">Message / Requirements</Label>
                  <Textarea
                    id="inquiry-message"
                    rows={3}
                    placeholder="Which class or subject are you interested in?"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full h-11 font-bold shadow-lg shadow-indigo-600/30"
                >
                  {submittingLead ? "Submitting..." : "Send Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Public Footer */}
      <footer className="mt-16 text-center text-xs text-slate-600">
        Powered by <span className="font-semibold text-slate-400">Tutorog</span> • Professional Educator Profiles
      </footer>
    </div>
  );
}
