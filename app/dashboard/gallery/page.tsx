"use client";

import React, { useState, useEffect } from "react";
import { HiPhoto, HiCloudArrowUp, HiTrash, HiSparkles } from "react-icons/hi2";

interface GalleryMedia {
  id: string;
  url: string;
  altText?: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = () => {
    fetch("/api/organization/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.organization?.media) {
          const galleryItems = data.organization.media.filter(
            (m: any) => m.type === "GALLERY"
          );
          setGallery(galleryItems);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "gallery");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

        await fetch("/api/organization/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: uploadData.url, altText: file.name }),
        });
      }

      fetchGallery();
    } catch (err: any) {
      setError(err.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/organization/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGallery((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <HiPhoto className="w-8 h-8 text-emerald-400" />
            Photo Gallery
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Showcase classroom photos, student achievements, events, and facilities.
          </p>
        </div>

        <label className="cursor-pointer px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition shrink-0">
          <HiCloudArrowUp className="w-5 h-5" />
          {uploading ? "Uploading..." : "Upload Photos"}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {gallery.length === 0 ? (
        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <HiPhoto className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No photos in gallery yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Upload photos of your studio, classes, performance stages, or trophies to make your landing page stand out.
          </p>
          <label className="inline-flex cursor-pointer px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm items-center gap-2 transition shadow-lg shadow-indigo-600/30">
            <HiCloudArrowUp className="w-5 h-5" />
            Select Photos to Upload
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden"
            >
              <img
                src={item.url}
                alt={item.altText || "Academy photo"}
                className="w-full h-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition backdrop-blur-xs flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-3 rounded-2xl bg-rose-600/80 hover:bg-rose-600 text-white transition shadow-lg"
                  title="Delete image"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
