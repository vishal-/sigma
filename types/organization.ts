export interface OrganizationLocationItem {
  id?: string;
  title?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  country?: string | null;
}

export interface OrganizationMediaItem {
  id: string;
  type: string;
  url: string;
  altText?: string | null;
  sortOrder?: number;
}

export interface OrganizationCategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  parentId?: string | null;
  children?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
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
  media: OrganizationMediaItem[];
  category?: OrganizationCategoryItem | null;
  categories?: Array<{
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}
