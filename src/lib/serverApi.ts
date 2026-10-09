const BASE = (
  process.env.INTERNAL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:8000/api/v1'
).replace(/\/$/, '');

// Carries the HTTP status so callers can tell a genuine 404 (render not-found)
// apart from a transient failure (rethrow, so ISR keeps serving the last good page).
export class ApiError extends Error {
  status: number;

  constructor(status: number, path: string) {
    super(`API ${status}: ${path}`);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function isApiNotFound(err: unknown): boolean {
  return err instanceof ApiError && err.status === 404;
}

export async function serverFetch<T = any>(
  path: string,
  revalidate: number = 3600,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate },
  });
  if (!res.ok) throw new ApiError(res.status, path);
  return res.json();
}
