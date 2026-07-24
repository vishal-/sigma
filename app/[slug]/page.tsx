import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicProfileView from "@/components/PublicProfileView";
import { Metadata } from "next";

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic SEO metadata for each tutor landing page
export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const org = await prisma.organization.findUnique({
    where: { slug: slug.toLowerCase() },
    include: {
      locations: true,
      media: true,
      categories: {
        include: { category: true },
      },
    },
  });

  if (!org) {
    return {
      title: "Profile Not Found | Tutorog",
    };
  }

  const primaryCategory = org.categories[0]?.category.name || "Coaching & Tutoring";
  const city = org.locations[0]?.city || "India";
  const coverImage = org.media.find((m) => m.type === "COVER" || m.type === "LOGO")?.url;

  const title = `${org.name} - ${primaryCategory} in ${city} | Tutorog`;
  const description = org.tagline || org.description || `Connect with ${org.name} for top-quality ${primaryCategory} in ${city}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://tutorog.com/${org.slug}`,
      siteName: "Tutorog",
      images: coverImage ? [{ url: coverImage }] : [],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default async function SlugPublicPage({ params }: SlugPageProps) {
  const { slug } = await params;

  const org = await prisma.organization.findUnique({
    where: { slug: slug.toLowerCase() },
    include: {
      locations: true,
      media: true,
      categories: {
        include: { category: true },
      },
    },
  });

  if (!org) {
    notFound();
  }

  const location = org.locations[0];
  const logoMedia = org.media.find((m) => m.type === "LOGO");

  // Schema.org EducationalOrganization structured data for SEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: org.name,
    description: org.tagline || org.description,
    url: `https://tutorog.com/${org.slug}`,
    telephone: org.phone || undefined,
    image: logoMedia?.url || undefined,
    address: location
      ? {
          "@type": "PostalAddress",
          streetAddress: location.addressLine1,
          addressLocality: location.city,
          addressRegion: location.state,
          addressCountry: location.country || "India",
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicProfileView organization={org} />
    </>
  );
}
