import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSlugAvailable, isValidSlug } from "@/lib/slug";
import { OrganizationType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      tagline,
      type,
      slug,
      categoryId,
      categoryIds,
      addressLine1,
      city,
      state,
      phone,
      whatsapp,
      logoUrl,
      coverUrl,
    } = body;

    const targetCategoryId = categoryId || (Array.isArray(categoryIds) && categoryIds[0]) || null;

    if (!name || !slug || !city || !addressLine1) {
      return NextResponse.json(
        { error: "Name, slug, city, and address line 1 are required." },
        { status: 400 }
      );
    }

    const validCheck = isValidSlug(slug);
    if (!validCheck.valid) {
      return NextResponse.json({ error: validCheck.reason }, { status: 400 });
    }

    const available = await isSlugAvailable(slug);
    if (!available) {
      return NextResponse.json(
        { error: "This profile handle is already taken. Please choose another." },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    const organization = await prisma.$transaction(async (tx) => {
      // 1. Create Organization
      const org = await tx.organization.create({
        data: {
          name,
          tagline,
          slug: slug.toLowerCase(),
          type: (type as OrganizationType) || OrganizationType.INDIVIDUAL,
          status: "PUBLISHED",
          phone,
          whatsapp,
          email: session.user.email,
          categoryId: targetCategoryId,
        },
      });

      // 2. Create Owner Membership
      await tx.membership.create({
        data: {
          userId,
          organizationId: org.id,
          role: "OWNER",
        },
      });

      // 3. Create Location
      await tx.organizationLocation.create({
        data: {
          organizationId: org.id,
          title: "Main Branch",
          addressLine1,
          city,
          state: state || "State",
          country: "India",
        },
      });

      // 5. Link uploaded images to the organization
      if (logoUrl) {
        await tx.image.updateMany({
          where: { userId, originalUrl: logoUrl, organizationId: null },
          data: { organizationId: org.id },
        });
      }

      if (coverUrl) {
        await tx.image.updateMany({
          where: { userId, originalUrl: coverUrl, organizationId: null },
          data: { organizationId: org.id },
        });
      }

      return org;
    });

    return NextResponse.json({ success: true, slug: organization.slug });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during onboarding." },
      { status: 500 }
    );
  }
}
