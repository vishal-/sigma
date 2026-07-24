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

    const { url, altText } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    });

    if (!membership) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    const media = await prisma.organizationMedia.create({
      data: {
        organizationId: membership.organizationId,
        type: "GALLERY",
        url,
        altText: altText || "Academy photo",
      },
    });

    return NextResponse.json({ success: true, media });
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

    await prisma.organizationMedia.deleteMany({
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
