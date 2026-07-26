"use client";

import React from "react";
import AcademicProfileView from "@/components/profile/AcademicProfileView";
import DanceProfileView from "@/components/profile/DanceProfileView";
import SportsProfileView from "@/components/profile/SportsProfileView";
import MusicProfileView from "@/components/profile/MusicProfileView";
import ArtsProfileView from "@/components/profile/ArtsProfileView";
import CodingProfileView from "@/components/profile/CodingProfileView";
import FitnessProfileView from "@/components/profile/FitnessProfileView";
import { OrganizationProps } from "@/types/organization";

interface PublicProfileProps {
  organization: OrganizationProps;
}

/**
 * PublicProfileView serves as a clean dispatcher component.
 * It routes directly to the dedicated Category Profile View based on the organization's primary Category enum.
 */
export default function PublicProfileView({ organization: org }: PublicProfileProps) {
  const category = (org.category || "ACADEMICS").toUpperCase();

  switch (category) {
    case "SPORTS":
      return <SportsProfileView organization={org} />;
    case "DANCE":
      return <DanceProfileView organization={org} />;
    case "MUSIC":
      return <MusicProfileView organization={org} />;
    case "ARTS":
      return <ArtsProfileView organization={org} />;
    case "CODING":
      return <CodingProfileView organization={org} />;
    case "FITNESS":
      return <FitnessProfileView organization={org} />;
    case "ACADEMICS":
    default:
      return <AcademicProfileView organization={org} />;
  }
}
