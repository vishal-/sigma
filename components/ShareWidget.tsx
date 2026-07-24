"use client";

import React, { useState } from "react";
import { HiClipboardDocumentCheck, HiClipboard, HiShare, HiQrCode } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";

interface ShareWidgetProps {
  orgName: string;
  slug: string;
}

export default function ShareWidget({ orgName, slug }: ShareWidgetProps) {
  const [copied, setCopied] = useState(false);
  const publicUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/${slug}`
    : `https://tutorog.com/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out my professional academy profile page on Tutorog:\n${publicUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <HiShare className="w-5 h-5 text-indigo-400" />
          Share Your Tutorog Page
        </h3>
        <span className="text-xs text-indigo-300 font-semibold bg-indigo-950 px-2.5 py-1 rounded-full border border-indigo-800">
          Instant Share
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full flex-1 relative flex items-center">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono text-sm focus:outline-none select-all"
          />
          <button
            type="button"
            onClick={copyLink}
            className="absolute right-2 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            {copied ? (
              <>
                <HiClipboardDocumentCheck className="w-4 h-4 text-emerald-300" />
                Copied!
              </>
            ) : (
              <>
                <HiClipboard className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={shareWhatsApp}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shrink-0 shadow-lg shadow-emerald-600/20"
        >
          <FaWhatsapp className="w-4 h-4" />
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
}
