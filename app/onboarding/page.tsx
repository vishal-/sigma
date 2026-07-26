"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiExclamationCircle } from "react-icons/hi2";
import slugify from "@sindresorhus/slugify";

import { StepIndicator } from "./components/StepIndicator";
import { BasicInfoStep } from "./components/BasicInfoStep";
import { CategoriesStep, ParentCategory } from "./components/CategoriesStep";
import { LocationStep } from "./components/LocationStep";
import { BrandingStep } from "./components/BrandingStep";
import { PublicLinkStep } from "./components/PublicLinkStep";

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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

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
      const timer = setTimeout(() => setSlug(slugify(name)), 0);
      return () => clearTimeout(timer);
    }
  }, [name, step]);

  // Real-time slug validation
  useEffect(() => {
    if (!slug) {
      const timer = setTimeout(() => setSlugStatus("idle"), 0);
      return () => clearTimeout(timer);
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
  const uploadImage = async (file: File, type: "LOGO" | "COVER"): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.image.originalUrl;
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

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    setSelectedSubjectIds([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let finalLogoUrl = "";
      let finalCoverUrl = "";

      if (logoFile) {
        finalLogoUrl = await uploadImage(logoFile, "LOGO");
      }
      if (coverFile) {
        finalCoverUrl = await uploadImage(coverFile, "COVER");
      }

      const payload = {
        name,
        tagline,
        type,
        slug,
        phone,
        whatsapp,
        category: selectedCategoryId,
        subjectIds: selectedSubjectIds,
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
        <StepIndicator step={step} />

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
            <BasicInfoStep
              name={name}
              setName={setName}
              tagline={tagline}
              setTagline={setTagline}
              type={type}
              setType={setType}
              phone={phone}
              setPhone={setPhone}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
              onNext={() => setStep(2)}
            />
          )}

          {/* STEP 2: Categories */}
          {step === 2 && (
            <CategoriesStep
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={handleCategoryChange}
              selectedSubjectIds={selectedSubjectIds}
              toggleSubject={toggleSubject}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <LocationStep
              addressLine1={addressLine1}
              setAddressLine1={setAddressLine1}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {/* STEP 4: Branding & Images */}
          {step === 4 && (
            <BrandingStep
              logoPreview={logoPreview}
              coverPreview={coverPreview}
              handleLogoChange={handleLogoChange}
              handleCoverChange={handleCoverChange}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}

          {/* STEP 5: Handle / Slug & Confirmation */}
          {step === 5 && (
            <PublicLinkStep
              name={name}
              city={city}
              slug={slug}
              setSlug={setSlug}
              slugStatus={slugStatus}
              slugReason={slugReason}
              suggestedSlug={suggestedSlug}
              loading={loading}
              onSubmit={handleSubmit}
              onBack={() => setStep(4)}
            />
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
