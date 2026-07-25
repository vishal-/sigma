import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageId, altText } = await req.json();
    if (!imageId) {
      return NextResponse.json({ error: "imageId is required" }, { status: 400 });
    }

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    });

    if (!membership) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    // The image was already created by /api/upload — just link it to the org
    const image = await prisma.image.update({
      where: { id: imageId, userId: session.user.id },
      data: {
        organizationId: membership.organizationId,
        altText: altText || null,
      },
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json({ error: "Failed to add gallery image" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mediaId = searchParams.get("id");

    if (!mediaId) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    });

    if (!membership) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    await prisma.image.deleteMany({
      where: {
        id: mediaId,
        organizationId: membership.organizationId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
