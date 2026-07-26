import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
    });

    if (!membership || !membership.organizationId) {
      return NextResponse.json(
        { error: "No organization found associated with your account." },
        { status: 404 }
      );
    }

    // Delete organization (Prisma cascade rules will delete linked memberships, locations, images, reviews, leads, courses)
    await prisma.organization.delete({
      where: { id: membership.organizationId },
    });

    return NextResponse.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete organization:", error);
    return NextResponse.json(
      { error: "Failed to delete organization" },
      { status: 500 }
    );
  }
}
