import { NextRequest, NextResponse } from "next/server";
import { isValidSlug, isSlugAvailable, generateUniqueSlug } from "@/lib/slug";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { available: false, reason: "Slug parameter is required." },
      { status: 400 }
    );
  }

  const validCheck = isValidSlug(slug);
  if (!validCheck.valid) {
    const suggested = await generateUniqueSlug(slug);
    return NextResponse.json({
      available: false,
      reason: validCheck.reason,
      suggestedSlug: suggested,
    });
  }

  const available = await isSlugAvailable(slug);
  if (!available) {
    const suggested = await generateUniqueSlug(slug);
    return NextResponse.json({
      available: false,
      reason: "This profile handle is already taken.",
      suggestedSlug: suggested,
    });
  }

  return NextResponse.json({ available: true });
}
