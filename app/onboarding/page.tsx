"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiBuildingOffice2,
  HiTag,
  HiMapPin,
  HiPhoto,
  HiLink,
  HiCheckCircle,
  HiArrowRight,
  HiArrowLeft,
  HiSparkles,
  HiCloudArrowUp,
  HiCheck,
  HiExclamationCircle,
} from "react-icons/hi2";

interface CategoryChild {
  id: string;
  name: string;
  slug: string;
}

interface ParentCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  children: CategoryChild[];
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [type, setType] = useState("INDIVIDUAL");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string>("");

  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [slugReason, setSlugReason] = useState("");
  const [suggestedSlug, setSuggestedSlug] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  // Auto-generate slug when name changes if user hasn't typed custom slug
  useEffect(() => {
    if (name && step === 1) {
      const generated = name
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
      setSlug(generated);
    }
  }, [name, step]);

  // Real-time slug validation
  useEffect(() => {
    if (!slug) {
      setSlugStatus("idle");
      return;
    }

    const timer = setTimeout(() => {
      setSlugStatus("checking");
      fetch(`/api/slug/check?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.available) {
            setSlugStatus("available");
            setSlugReason("");
          } else {
            setSlugStatus(data.reason?.includes("taken") ? "taken" : "invalid");
            setSlugReason(data.reason || "Handle not available");
            if (data.suggestedSlug) setSuggestedSlug(data.suggestedSlug);
          }
        })
        .catch(() => setSlugStatus("idle"));
    }, 400);

    return () => clearTimeout(timer);
  }, [slug]);

  // Upload image handler
  const uploadImage = async (file: File, folder: "logos" | "covers"): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let finalLogoUrl = logoUrl;
      let finalCoverUrl = coverUrl;

      if (logoFile) {
        finalLogoUrl = await uploadImage(logoFile, "logos");
      }
      if (coverFile) {
        finalCoverUrl = await uploadImage(coverFile, "covers");
      }

      const payload = {
        name,
        tagline,
        type,
        slug,
        phone,
        whatsapp,
        categoryIds: selectedCategoryIds,
        addressLine1,
        city,
        state,
        logoUrl: finalLogoUrl,
        coverUrl: finalCoverUrl,
      };

      const res = await fetch("/api/organization/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create profile");
      }

      // Redirect to newly created public page or dashboard
      router.push(`/dashboard`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
            T
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
            Tutorog
          </span>
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          5-Min Setup
        </span>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-2xl w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Step {step} of 5
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {step === 1 && "Basic Information"}
              {step === 2 && "Categories & Subjects"}
              {step === 3 && "Location & Address"}
              {step === 4 && "Branding & Images"}
              {step === 5 && "Choose Public Link"}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? "bg-indigo-500 shadow-md shadow-indigo-500/50"
                    : i < step
                    ? "bg-indigo-700/60"
                    : "bg-slate-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3">
              <HiExclamationCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <HiBuildingOffice2 className="w-7 h-7 text-indigo-400" />
                  Tell us about your Academy or Coaching
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Whether you are an individual tutor or a multi-trainer academy, set up your public profile here.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Academy or Tutor Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bharat Dance Academy or Prof. Sharma Classes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Short Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium Classical Dance & Music Academy in Indiranagar"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Profile Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  >
                    <option value="INDIVIDUAL">Individual Tutor / Coach</option>
                    <option value="ACADEMY">Academy / Institute</option>
                    <option value="COACHING">Coaching Center</option>
                    <option value="SPORTS">Sports Club / Academy</option>
                    <option value="DANCE">Dance Studio</option>
                    <option value="MUSIC">Music School</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Phone / Contact No.
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  WhatsApp Direct Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210 (For instant inquiries)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!name.trim()}
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Continue to Categories
                  <HiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Categories */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <HiTag className="w-7 h-7 text-indigo-400" />
                  Select your Categories & Subjects
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Choose one or more categories that describe your teaching services.
                </p>
              </div>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((parent) => (
                  <div key={parent.id} className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
                    <div className="font-bold text-indigo-300 text-sm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {parent.name}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {parent.children.map((child) => {
                        const isSelected = selectedCategoryIds.includes(child.id);
                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => toggleCategory(child.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20"
                                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                            }`}
                          >
                            {isSelected && <HiCheck className="w-3.5 h-3.5" />}
                            {child.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 transition"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
                >
                  Continue to Location
                  <HiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <HiMapPin className="w-7 h-7 text-indigo-400" />
                  Location & Address
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Where do you conduct classes? Students use this to find local tutors.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Street Address / Area <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1st Floor, #45 10th Main, Indiranagar"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    City <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru, Mumbai, Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Karnataka, Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 transition"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="button"
                  disabled={!addressLine1.trim() || !city.trim()}
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Continue to Branding
                  <HiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Branding & Images */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <HiPhoto className="w-7 h-7 text-indigo-400" />
                  Branding & Images
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Upload your academy logo and a banner photo to make your page look professional.
                </p>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Logo / Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                    ) : (
                      <HiPhoto className="w-8 h-8 text-slate-600" />
                    )}
                  </div>
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-2">
                    <HiCloudArrowUp className="w-4 h-4" />
                    Choose Logo File
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                  </label>
                </div>
              </div>

              {/* Cover Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Cover / Banner Image
                </label>
                <div className="relative w-full h-32 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <HiPhoto className="w-8 h-8 text-slate-600 mx-auto mb-1" />
                      <span className="text-xs text-slate-500">Recommended size: 1200 x 400</span>
                    </div>
                  )}
                  <label className="absolute bottom-3 right-3 cursor-pointer px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-slate-200 text-xs font-semibold border border-slate-700 backdrop-blur-md transition flex items-center gap-1.5">
                    <HiCloudArrowUp className="w-4 h-4 text-indigo-400" />
                    Upload Banner
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 transition"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
                >
                  Continue to Handle
                  <HiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Handle / Slug & Confirmation */}
          {step === 5 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <HiLink className="w-7 h-7 text-indigo-400" />
                  Choose your Tutorog URL Handle
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  This will be your shareable public profile link.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Public Profile Handle <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 text-sm font-semibold select-none">
                    tutorog.com/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="bharatdance"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    className={`w-full pl-28 pr-12 py-3.5 rounded-2xl bg-slate-950 border text-white font-semibold placeholder-slate-600 focus:outline-none transition ${
                      slugStatus === "available"
                        ? "border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20"
                        : slugStatus === "taken" || slugStatus === "invalid"
                        ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                        : "border-slate-800 focus:border-indigo-500"
                    }`}
                  />
                  <div className="absolute right-4">
                    {slugStatus === "checking" && (
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {slugStatus === "available" && (
                      <HiCheckCircle className="w-6 h-6 text-emerald-400" />
                    )}
                    {(slugStatus === "taken" || slugStatus === "invalid") && (
                      <HiExclamationCircle className="w-6 h-6 text-rose-400" />
                    )}
                  </div>
                </div>

                {/* Status Message */}
                {slugStatus === "available" && (
                  <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center gap-1">
                    <HiCheck className="w-4 h-4" /> Handle is available!
                  </p>
                )}
                {(slugStatus === "taken" || slugStatus === "invalid") && (
                  <div className="mt-2 text-xs text-rose-400 font-medium">
                    <span>{slugReason}</span>
                    {suggestedSlug && (
                      <button
                        type="button"
                        onClick={() => setSlug(suggestedSlug)}
                        className="ml-2 underline text-indigo-400 font-bold hover:text-indigo-300"
                      >
                        Use "{suggestedSlug}"?
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Summary Box */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-white text-sm mb-2 flex items-center gap-1.5">
                  <HiSparkles className="w-4 h-4 text-indigo-400" /> Ready to publish
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academy Name:</span>
                  <span className="font-semibold text-white">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-white">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Public Page:</span>
                  <span className="font-mono text-indigo-400 font-bold">tutorog.com/{slug}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 transition"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || slugStatus !== "available"}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      Publish Profile
                      <HiSparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-600">
        © 2026 Tutorog. Fast profile creation for educators.
      </footer>
    </div>
  );
}
