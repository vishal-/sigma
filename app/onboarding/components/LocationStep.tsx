import React from "react";
import { HiMapPin, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

      <div className="space-y-2">
        <Label htmlFor="address">
          Street Address / Area <span className="text-rose-400">*</span>
        </Label>
        <Input
          id="address"
          type="text"
          required
          placeholder="e.g. 1st Floor, #45 10th Main, Indiranagar"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-rose-400">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            required
            placeholder="e.g. Bengaluru, Mumbai, Delhi"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            type="text"
            placeholder="e.g. Karnataka, Maharashtra"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
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
          type="button"
          disabled={!addressLine1.trim() || !city.trim()}
          onClick={onNext}
          className="gap-2"
        >
          <span>Continue to Branding</span>
          <HiArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
