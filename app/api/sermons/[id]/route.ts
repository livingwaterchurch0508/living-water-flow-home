import { NextRequest, NextResponse } from "next/server";
import { getSermonsById, ISermonType } from "@/app/(util)/db/postgres/sermons";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  },
): Promise<NextResponse<SermonGetResponse>> {
  let payload: ISermonType = null;
  const type: number = parseInt(req.nextUrl.searchParams.get("type") || "0");

  try {
    if (id) payload = await getSermonsById(+id, +type);
    if (payload === null) throw new Error("failed");
    return NextResponse.json({ payload, server: "success" });
  } catch (error: any) {
    if (payload === null) {
      return NextResponse.json({ payload: {}, server: "failed", error });
    }
    return NextResponse.json({ payload: null, server: "success", error });
  }
}

export type SermonGetResponse = {
  payload: ISermonType;
  server: "failed" | "success";
  error?: unknown;
};
