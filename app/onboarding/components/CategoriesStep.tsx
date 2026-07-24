import React from "react";
import { HiTag, HiCheck, HiArrowLeft, HiArrowRight } from "react-icons/hi2";

export interface CategoryChild {
  id: string;
  name: string;
  slug: string;
}

export interface ParentCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  children: CategoryChild[];
}

interface CategoriesStepProps {
  categories: ParentCategory[];
  selectedCategoryIds: string[];
  toggleCategory: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CategoriesStep({
  categories,
  selectedCategoryIds,
  toggleCategory,
  onNext,
  onBack,
}: CategoriesStepProps) {
  return (
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
          Continue to Location
          <HiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
