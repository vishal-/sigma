import React from "react";
import { HiMapPin, HiArrowLeft, HiArrowRight } from "react-icons/hi2";

interface LocationStepProps {
  addressLine1: string;
  setAddressLine1: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationStep({
  addressLine1,
  setAddressLine1,
  city,
  setCity,
  state,
  setState,
  onNext,
  onBack,
}: LocationStepProps) {
  return (
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
          onClick={onBack}
          className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold flex items-center gap-2 transition"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="button"
          disabled={!addressLine1.trim() || !city.trim()}
          onClick={onNext}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Continue to Branding
          <HiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
