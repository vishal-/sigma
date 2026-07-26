export interface OrganizationLocationItem {
  id?: string;
  title?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  country?: string | null;
}

export interface ImageItem {
  id: string;
  organizationId?: string | null;
  userId?: string | null;
  type: string;
  originalUrl: string;
  mediumUrl: string;
  thumbnailUrl: string;
  altText?: string | null;
  sortOrder?: number;
  createdAt?: Date | string;
}

export interface SubjectItem {
  id: string;
  name: string;
  slug: string;
  category: string;
}

export interface OrganizationProps {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  type: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  website?: string | null;
  verified?: boolean;
  status?: string;
  avgRating?: number;
  reviewCount?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  locations: OrganizationLocationItem[];
  images: ImageItem[];
  category: string;
  subjects: SubjectItem[];
}
