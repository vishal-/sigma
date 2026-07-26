import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export const CATEGORY_INFO: Record<Category, { name: string; icon: string }> = {
  ACADEMICS: { name: "Academics & Tuition", icon: "BookOpen" },
  SPORTS: { name: "Sports", icon: "Trophy" },
  DANCE: { name: "Dance", icon: "Sparkles" },
  MUSIC: { name: "Music", icon: "Music" },
  ARTS: { name: "Arts & Crafts", icon: "Palette" },
  CODING: { name: "Coding & Tech", icon: "Code" },
  FITNESS: { name: "Fitness & Wellness", icon: "Heart" },
};

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" },
    });

    const categories = (Object.keys(CATEGORY_INFO) as Category[]).map((key) => ({
      id: key,
      name: CATEGORY_INFO[key].name,
      icon: CATEGORY_INFO[key].icon,
      subjects: subjects.filter((s) => s.category === key),
    }));

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
