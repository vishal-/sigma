import React from "react";
import { HiTag, HiCheck, HiArrowLeft, HiArrowRight, HiSparkles } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SubjectOption {
  id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ParentCategory {
  id: string;
  name: string;
  icon?: string;
  subjects: SubjectOption[];
}

interface CategoriesStepProps {
  categories: ParentCategory[];
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  selectedSubjectIds: string[];
  toggleSubject: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CategoriesStep({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubjectIds,
  toggleSubject,
  onNext,
  onBack,
}: CategoriesStepProps) {
  const activeCategory = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <HiTag className="w-7 h-7 text-indigo-400" />
          Primary Category & Subjects
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Select your main category and choose the subjects or classes you offer.
        </p>
      </div>

      {/* 1. Category Dropdown */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-200">
          Primary Category <span className="text-rose-400">*</span>
        </Label>
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger className="h-12 bg-slate-950 border-slate-800 text-white font-medium focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Select a primary category (e.g. Academics, Sports, Music)..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800 text-white">
            {categories.map((parent) => (
              <SelectItem key={parent.id} value={parent.id} className="cursor-pointer hover:bg-indigo-600/20">
                {parent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 2. Subject Pills for Selected Category */}
      {activeCategory ? (
        <div className="space-y-3 bg-slate-950/70 p-6 rounded-2xl border border-indigo-500/20 animate-fadeIn shadow-xl">
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wider text-indigo-300 font-extrabold flex items-center gap-2">
              <HiSparkles className="w-4 h-4 text-indigo-400" />
              Subjects in {activeCategory.name}
            </Label>
            <span className="text-[11px] text-slate-400 font-semibold bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-800/40">
              Select all that apply
            </span>
          </div>

          {activeCategory.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-2.5 pt-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {activeCategory.subjects.map((child) => {
                const isSelected = selectedSubjectIds.includes(child.id);
                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => toggleSubject(child.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 scale-[1.03]"
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {isSelected && <HiCheck className="w-4 h-4 stroke-[3]" />}
                    <span>{child.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic pt-1">
              No subjects listed for this category yet. You can continue to the next step.
            </p>
          )}
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-1">
          <p className="text-xs font-medium text-slate-400">
            Please select a primary category above to choose your subjects & specialties.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
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
          type="button"
          disabled={!selectedCategoryId}
          onClick={onNext}
          className="gap-2"
        >
          <span>Continue to Location</span>
          <HiArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
