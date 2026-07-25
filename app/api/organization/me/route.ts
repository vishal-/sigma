import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const membership = await prisma.membership.findFirst({
      where: { userId: session.user.id },
      include: {
        organization: {
          include: {
            locations: true,
            images: true,
            category: {
              include: { children: true },
            },
          },
        },
      },
    });

    if (!membership || !membership.organization) {
      return NextResponse.json({ organization: null });
    }

    return NextResponse.json({ organization: membership.organization });
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
