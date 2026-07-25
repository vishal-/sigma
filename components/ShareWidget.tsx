"use client";

import React, { useState } from "react";
import { HiClipboardDocumentCheck, HiClipboard, HiShare } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ShareWidgetProps {
  orgName: string;
  slug: string;
}

export default function ShareWidget({ slug }: ShareWidgetProps) {
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
          <Input
            type="text"
            readOnly
            value={publicUrl}
            className="pr-28 font-mono text-indigo-300 select-all"
          />
          <Button
            type="button"
            size="sm"
            onClick={copyLink}
            className="absolute right-1.5 h-8 gap-1.5 text-xs"
          >
            {copied ? (
              <>
                <HiClipboardDocumentCheck className="w-4 h-4 text-emerald-300" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <HiClipboard className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </Button>
        </div>

        <Button
          type="button"
          onClick={shareWhatsApp}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2 shrink-0 shadow-lg shadow-emerald-600/20"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span>Share on WhatsApp</span>
        </Button>
      </div>
    </div>
  );
}
