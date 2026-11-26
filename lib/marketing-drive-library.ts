// Pure URL check. The portal page reads MEND_DRIVE_LIBRARY_URL on the server,
// after login, and passes the result here. This file does not read env, call
// Google, or store a folder ID.

const driveHosts = new Set(["drive.google.com", "docs.google.com"]);

export function sanitizeDriveLibraryUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 500) return null;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  if (!driveHosts.has(url.hostname.toLowerCase())) return null;
  return url.toString();
}
