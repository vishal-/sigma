import React from "react";
import { HiPhoto, HiCloudArrowUp, HiArrowLeft, HiArrowRight } from "react-icons/hi2";

interface BrandingStepProps {
  logoPreview: string | null;
  coverPreview: string | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BrandingStep({
  logoPreview,
  coverPreview,
  handleLogoChange,
  handleCoverChange,
  onNext,
  onBack,
}: BrandingStepProps) {
  return (
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
          onClick={onBack}
          className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 transition"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
        >
          Continue to Handle
          <HiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
