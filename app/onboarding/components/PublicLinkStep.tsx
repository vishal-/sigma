import React from "react";
import {
  HiLink,
  HiCheckCircle,
  HiExclamationCircle,
  HiCheck,
  HiSparkles,
  HiArrowLeft,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PublicLinkStepProps {
  name: string;
  city: string;
  slug: string;
  setSlug: (val: string) => void;
  slugStatus: "idle" | "checking" | "available" | "taken" | "invalid";
  slugReason: string;
  suggestedSlug: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function PublicLinkStep({
  name,
  city,
  slug,
  setSlug,
  slugStatus,
  slugReason,
  suggestedSlug,
  loading,
  onSubmit,
  onBack,
}: PublicLinkStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <HiLink className="w-7 h-7 text-indigo-400" />
          Choose your Tutorog URL Handle
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          This will be your shareable public profile link.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug-input">
          Public Profile Handle <span className="text-rose-400">*</span>
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-500 text-sm font-semibold select-none z-10">
            tutorog.com/
          </span>
          <Input
            id="slug-input"
            type="text"
            required
            placeholder="bharatdance"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className={`pl-28 pr-12 h-12 font-semibold ${
              slugStatus === "available"
                ? "border-emerald-500/80 focus-visible:ring-emerald-500/20"
                : slugStatus === "taken" || slugStatus === "invalid"
                ? "border-rose-500/80 focus-visible:ring-rose-500/20"
                : ""
            }`}
          />
          <div className="absolute right-4 z-10">
            {slugStatus === "checking" && (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                className="ml-2 underline text-indigo-400 font-bold hover:text-indigo-300 cursor-pointer"
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
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="gap-2"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
        <Button
          type="submit"
          disabled={loading || slugStatus !== "available"}
          className="gap-2 font-extrabold px-8 h-12 shadow-xl shadow-indigo-600/30"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Profile...</span>
            </>
          ) : (
            <>
              <span>Publish Profile</span>
              <HiSparkles className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
