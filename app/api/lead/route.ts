import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { organizationId, name, phone, email, message } = await req.json();

    if (!organizationId || !name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        organizationId,
        name,
        phone,
        email,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
