import fs from "fs/promises";
import path from "path";

/**
 * Upload helper for saving image files locally or to Cloudflare R2 / S3.
 * Defaults to storing in public/uploads for local development.
 */
export async function saveUploadedFile(
  file: File,
  folder: "logos" | "covers" | "gallery" = "gallery"
): Promise<{ url: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Check if Cloudflare R2 environment variables are provided
  const r2Account = process.env.R2_ACCOUNT_ID;
  const r2Bucket = process.env.R2_BUCKET_NAME;

  if (r2Account && r2Bucket) {
    // If Cloudflare R2 credentials are dynamic in production, integrate R2 upload logic here.
    // For now fallback cleanly to local storage if R2 is not fully configured.
  }

  // Local fallback storage in public/uploads/[folder]
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || ".jpg";
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  await fs.writeFile(filePath, buffer);

  const publicUrl = `/uploads/${folder}/${uniqueName}`;
  return { url: publicUrl };
}
