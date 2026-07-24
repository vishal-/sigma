import React from "react";

interface StepIndicatorProps {
  step: number;
}

export function StepIndicator({ step }: StepIndicatorProps) {
  const stepTitles: Record<number, string> = {
    1: "Basic Information",
    2: "Categories & Subjects",
    3: "Location & Address",
    4: "Branding & Images",
    5: "Choose Public Link",
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Step {step} of 5
        </span>
        <span className="text-xs text-slate-400 font-medium">
          {stepTitles[step]}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step
                ? "bg-indigo-500 shadow-md shadow-indigo-500/50"
                : i < step
                ? "bg-indigo-700/60"
                : "bg-slate-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
