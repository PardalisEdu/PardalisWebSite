import { getDownloadUrl } from '$lib/server/r3';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const key = url.searchParams.get('key');
  if (!key) return json({ error: 'Falta key' }, { status: 400 });

  const downloadUrl = await getDownloadUrl(key);
  return json({ url: downloadUrl });
};