import React from "react";
import { HiBuildingOffice2, HiArrowRight } from "react-icons/hi2";

interface BasicInfoStepProps {
  name: string;
  setName: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  whatsapp: string;
  setWhatsapp: (val: string) => void;
  onNext: () => void;
}

export function BasicInfoStep({
  name,
  setName,
  tagline,
  setTagline,
  type,
  setType,
  phone,
  setPhone,
  whatsapp,
  setWhatsapp,
  onNext,
}: BasicInfoStepProps) {
  return (
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
          onClick={onNext}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Continue to Categories
          <HiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
