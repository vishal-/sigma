"use client";

import React, { useState, useEffect } from "react";
import {
  HiBuildingOffice2,
  HiMapPin,
  HiPhoto,
  HiCloudArrowUp,
  HiCheck,
  HiExclamationCircle,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageItem } from "@/types/organization";
import { Button } from "@/components/ui/button";

export default function ProfileEditPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [website, setWebsite] = useState("");

  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [coverPreview, setCoverPreview] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [slug, setSlug] = useState("");

  useEffect(() => {
    fetch("/api/organization/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.organization) {
          const org = data.organization;
          setName(org.name || "");
          setTagline(org.tagline || "");
          setDescription(org.description || "");
          setPhone(org.phone || "");
          setWhatsapp(org.whatsapp || "");
          setWebsite(org.website || "");
          setSlug(org.slug || "");

          const loc = org.locations?.[0];
          if (loc) {
            setAddressLine1(loc.addressLine1 || "");
            setCity(loc.city || "");
            setState(loc.state || "");
          }

          const logo = org.images?.find((m: ImageItem) => m.type === "LOGO");
          if (logo) setLogoPreview(logo.originalUrl);

          const cover = org.images?.find((m: ImageItem) => m.type === "COVER");
          if (cover) setCoverPreview(cover.originalUrl);
        }
      })
      .catch(() => setError("Failed to load profile data"))
      .finally(() => setLoading(false));
  }, []);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);

    try {
      let finalLogoUrl = logoPreview;
      let finalCoverUrl = coverPreview;

      if (logoFile) {
        finalLogoUrl = await uploadImage(logoFile, "LOGO");
      }
      if (coverFile) {
        finalCoverUrl = await uploadImage(coverFile, "COVER");
      }

      const res = await fetch("/api/organization/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          tagline,
          description,
          phone,
          whatsapp,
          website,
          addressLine1,
          city,
          state,
          logoUrl: finalLogoUrl,
          coverUrl: finalCoverUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Academy Profile</h1>
          <p className="text-slate-400 text-sm mt-1">
            Update your public page information, contact details, and branding.
          </p>
        </div>
        {slug && (
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition shrink-0"
          >
            <span>View Live Page</span>
            <HiArrowTopRightOnSquare className="w-4 h-4 text-indigo-400" />
          </a>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3">
          <HiExclamationCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-3">
          <HiCheck className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HiBuildingOffice2 className="w-6 h-6 text-indigo-400" />
            Academy Details
          </h2>

          <div className="space-y-2">
            <Label htmlFor="academy-name">Academy Name</Label>
            <Input
              id="academy-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Short Tagline</Label>
            <Input
              id="tagline"
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About & Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe your teaching experience, courses offered, accomplishments, and batch timings..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-xl font-bold text-white">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HiMapPin className="w-6 h-6 text-purple-400" />
            Address & Location
          </h2>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Branding Images */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HiPhoto className="w-6 h-6 text-emerald-400" />
            Logo & Cover Banner
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Academy Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <HiPhoto className="w-8 h-8 text-slate-600" />
                  )}
                </div>
                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-2">
                  <HiCloudArrowUp className="w-4 h-4 text-indigo-400" />
                  <span>Change Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setLogoFile(file);
                        setLogoPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Banner</Label>
              <div className="relative w-full h-24 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-500">No cover banner set</span>
                )}
                <label className="absolute bottom-2 right-2 cursor-pointer px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-200 text-xs font-semibold border border-slate-700 backdrop-blur-md transition flex items-center gap-1.5">
                  <HiCloudArrowUp className="w-4 h-4 text-indigo-400" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCoverFile(file);
                        setCoverPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="px-8 h-12 text-base font-extrabold shadow-xl shadow-indigo-600/30"
          >
            {saving ? "Saving Changes..." : "Save Profile Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
