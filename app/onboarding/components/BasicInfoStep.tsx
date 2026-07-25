import React from "react";
import { HiBuildingOffice2, HiArrowRight } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

      <div className="space-y-2">
        <Label htmlFor="academy-name">
          Academy or Tutor Name <span className="text-rose-400">*</span>
        </Label>
        <Input
          id="academy-name"
          type="text"
          required
          placeholder="e.g. Bharat Dance Academy or Prof. Sharma Classes"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Short Tagline</Label>
        <Input
          id="tagline"
          type="text"
          placeholder="e.g. Premium Classical Dance & Music Academy in Indiranagar"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Profile Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Profile Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INDIVIDUAL">Individual Tutor / Coach</SelectItem>
              <SelectItem value="ACADEMY">Academy / Institute</SelectItem>
              <SelectItem value="COACHING">Coaching Center</SelectItem>
              <SelectItem value="SPORTS">Sports Club / Academy</SelectItem>
              <SelectItem value="DANCE">Dance Studio</SelectItem>
              <SelectItem value="MUSIC">Music School</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone / Contact No.</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Direct Number</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="e.g. +91 98765 43210 (For instant inquiries)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          disabled={!name.trim()}
          onClick={onNext}
          className="gap-2"
        >
          <span>Continue to Categories</span>
          <HiArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
