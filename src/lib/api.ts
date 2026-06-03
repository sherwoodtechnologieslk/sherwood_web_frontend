declare const __API_BASE_URL__: string;

function isLocalDev(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  );
}

/** Base URL candidates for API requests (no trailing slash). */
export function getApiBaseCandidates(): string[] {
  const configured =
    typeof __API_BASE_URL__ === "string" ? __API_BASE_URL__.trim() : "";

  if (configured) {
    return [configured.replace(/\/$/, "")];
  }

  if (isLocalDev()) {
    return ["http://localhost:4000"];
  }

  // Production: same origin; nginx (or similar) should proxy /api to the Node backend.
  return [""];
}

/** POST/GET etc. against the backend; tries each base candidate until one connects. */
export async function apiFetch(
  apiPath: string,
  init?: RequestInit,
): Promise<Response> {
  const path = apiPath.startsWith("/") ? apiPath : `/${apiPath}`;
  const candidates = getApiBaseCandidates();
  let lastError: unknown;

  for (const base of candidates) {
    const url = `${base}${path}`;
    try {
      return await fetch(url, init);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError ?? new Error("API request failed");
}
