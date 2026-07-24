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

      // 3. Update Media (Logo)
      if (logoUrl) {
        const existingLogo = await tx.organizationMedia.findFirst({
          where: { organizationId: orgId, type: "LOGO" },
        });
        if (existingLogo) {
          await tx.organizationMedia.update({
            where: { id: existingLogo.id },
            data: { url: logoUrl },
          });
        } else {
          await tx.organizationMedia.create({
            data: { organizationId: orgId, type: "LOGO", url: logoUrl },
          });
        }
      }

      // 4. Update Media (Cover)
      if (coverUrl) {
        const existingCover = await tx.organizationMedia.findFirst({
          where: { organizationId: orgId, type: "COVER" },
        });
        if (existingCover) {
          await tx.organizationMedia.update({
            where: { id: existingCover.id },
            data: { url: coverUrl },
          });
        } else {
          await tx.organizationMedia.create({
            data: { organizationId: orgId, type: "COVER", url: coverUrl },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
