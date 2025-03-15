import { getEssayById } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("ID:", id);

  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  // Fetch the essay from the database (example)
  const essay = await getEssayById({ id }); // Replace with your actual DB function

  console.log("Essay:", essay);

  if (!essay) {
    return NextResponse.json({ error: "Essay not found" }, { status: 404 });
  }

  return NextResponse.json(essay);
}
