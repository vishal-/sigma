import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImageToCloud } from "@/lib/upload";
import { ImageType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawType = formData.get("type") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!rawType || !(rawType in ImageType)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${Object.values(ImageType).join(", ")}` },
        { status: 400 }
      );
    }

    const type = rawType as ImageType;

    // 3. Upload to cloud storage
    const { original, medium, thumbnail } = await uploadImageToCloud(file, session.user.id);

    // 4. Persist to DB — organizationId is null here, linked later via a separate update
    const image = await prisma.image.create({
      data: {
        userId: session.user.id,
        type,
        originalUrl: original,
        mediumUrl: medium,
        thumbnailUrl: thumbnail,
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
