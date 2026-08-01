export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
  return res.json() as Promise<T>;
}
