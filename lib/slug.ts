import externalSlugify from "@sindresorhus/slugify";
import { prisma } from "./prisma";

/**
 * Convert string into a URL-friendly slug
 */
export function slugify(text: string): string {
  return externalSlugify(text);
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): { valid: boolean; reason?: string } {
  if (!slug || slug.length < 3) {
    return { valid: false, reason: "Slug must be at least 3 characters long." };
  }
  if (slug.length > 50) {
    return { valid: false, reason: "Slug cannot exceed 50 characters." };
  }
  const reservedSlugs = [
    "admin",
    "onboarding",
    "dashboard",
    "login",
    "register",
    "api",
    "settings",
    "profile",
    "auth",
    "terms",
    "privacy",
  ];
  if (reservedSlugs.includes(slug.toLowerCase())) {
    return { valid: false, reason: "This handle is reserved by Tutorog." };
  }
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return { valid: false, reason: "Only lowercase letters, numbers, and single hyphens allowed." };
  }
  return { valid: true };
}

/**
 * Check if a slug is currently available in the database
 */
export async function isSlugAvailable(slug: string, currentOrganizationId?: string): Promise<boolean> {
  const existing = await prisma.organization.findUnique({
    where: { slug: slug.toLowerCase() },
    select: { id: true },
  });

  if (!existing) return true;
  if (currentOrganizationId && existing.id === currentOrganizationId) return true;
  return false;
}

/**
 * Generate a unique available slug based on a name
 */
export async function generateUniqueSlug(baseName: string): Promise<string> {
  let baseSlug = slugify(baseName);
  if (!baseSlug) baseSlug = "tutor";
  
  let candidate = baseSlug;
  let counter = 1;

  while (!(await isSlugAvailable(candidate))) {
    candidate = `${baseSlug}-${counter}`;
    counter++;
  }

  return candidate;
}
