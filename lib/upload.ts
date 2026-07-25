export interface CloudUploadResult {
  original: string;
  medium: string;
  thumbnail: string;
}

/**
 * Encodes a UUID string into a compact base64url string (22 chars).
 * Strips hyphens → 16 raw bytes → base64url. No external deps needed.
 */
function uuidToBase64url(uuid: string): string {
  return Buffer.from(uuid.replace(/-/g, ""), "hex").toString("base64url");
}

/**
 * Uploads an image file to cloud storage via the qupload API.
 * Returns the three URL variants produced by the service.
 */
export async function uploadImageToCloud(
  file: File,
  userId: string
): Promise<CloudUploadResult> {
  const apiUrl = process.env.IMAGE_UPLOAD_API;
  const accessKey = process.env.R2_ACCESS_KEY_ID;
  const secretKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  const endpoint = process.env.R2_ENDPOINT;
  const publicUrl = process.env.R2_PUBLIC_BASE_URL;

  if (!apiUrl || !accessKey || !secretKey || !bucket || !endpoint || !publicUrl) {
    throw new Error("Missing required image upload environment variables.");
  }

  const set = uuidToBase64url(userId);

  const form = new FormData();
  form.append("file", file);
  form.append("accessKey", accessKey);
  form.append("secretKey", secretKey);
  form.append("bucket", bucket);
  form.append("endpoint", endpoint);
  form.append("publicUrl", publicUrl);
  form.append("region", "auto");
  form.append("set", set);

  const res = await fetch(apiUrl, { method: "POST", body: form });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload API error (${res.status}): ${text}`);
  }

  const data = (await res.json()) as CloudUploadResult;

  if (!data.original || !data.medium || !data.thumbnail) {
    throw new Error("Upload API returned an unexpected response shape.");
  }

  return data;
}
