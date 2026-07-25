import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      tagline,
      description,
      phone,
      whatsapp,
      website,
      addressLine1,
      city,
      state,
      logoUrl,
      coverUrl,
    } = body;

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    });

    if (!membership) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    const orgId = membership.organizationId;

    await prisma.$transaction(async (tx) => {
      // 1. Update Organization
      await tx.organization.update({
        where: { id: orgId },
        data: {
          name,
          tagline,
          description,
          phone,
          whatsapp,
          website,
        },
      });

      // 2. Update Location
      const existingLoc = await tx.organizationLocation.findFirst({
        where: { organizationId: orgId },
      });

      if (existingLoc) {
        await tx.organizationLocation.update({
          where: { id: existingLoc.id },
          data: { addressLine1, city, state },
        });
      } else {
        await tx.organizationLocation.create({
          data: {
            organizationId: orgId,
            title: "Main Branch",
            addressLine1,
            city,
            state: state || "State",
          },
        });
      }

      // 3. Link uploaded logo image to the organization
      if (logoUrl) {
        await tx.image.updateMany({
          where: { organizationId: orgId, type: "LOGO" },
          data: { originalUrl: logoUrl },
        });
        // If no existing logo is linked yet, link the freshly uploaded one by URL
        await tx.image.updateMany({
          where: { originalUrl: logoUrl, organizationId: null },
          data: { organizationId: orgId },
        });
      }

      // 4. Link uploaded cover image to the organization
      if (coverUrl) {
        await tx.image.updateMany({
          where: { organizationId: orgId, type: "COVER" },
          data: { originalUrl: coverUrl },
        });
        // If no existing cover is linked yet, link the freshly uploaded one by URL
        await tx.image.updateMany({
          where: { originalUrl: coverUrl, organizationId: null },
          data: { organizationId: orgId },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
