import { NextRequest, NextResponse } from "next/server";

import NodeCache from "node-cache";
import { bucket } from "@/app/(util)/fetch/storage";

// Create a new cache instance (TTL: 3600 seconds, 1 hour)
const cache = new NodeCache({ stdTTL: 3600 });

// Helper function to convert stream to buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

export async function GET(req: NextRequest) {
  const imageName = req.nextUrl.searchParams.get("imageName") || "";

  if (!imageName) {
    return NextResponse.json(
      { error: "Image name not provided" },
      { status: 400 },
    );
  }

  // Check if the image buffer is already cached
  const cachedBuffer = cache.get<Buffer>(imageName);
  if (cachedBuffer) {
    return new NextResponse(cachedBuffer, {
      headers: {
        "Content-Type": "image/jpeg", // Adjust the content type as needed
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Get the file from Google Cloud Storage
  const file = bucket.file(imageName);
  const [exists] = await file.exists();

  if (!exists) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  // Download the file and convert it to a buffer
  const fileStream = file.createReadStream();
  const buffer = await streamToBuffer(fileStream);

  // Cache the image buffer
  cache.set(imageName, buffer);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/jpeg", // Adjust the content type as needed
      "Cache-Control": "public, max-age=3600",
    },
  });
}
