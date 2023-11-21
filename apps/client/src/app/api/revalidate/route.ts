import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get('tag');
  const path = req.nextUrl.searchParams.get('path');
  const type = req.nextUrl.searchParams.get('type');
  let revalidatedTag = false;
  let revalidatedPath = false;
  if (typeof tag === 'string') {
    revalidateTag(tag);
    revalidatedTag = true;
  }
  if (typeof path === 'string') {
    revalidatePath(path, type ? 'layout' : 'page');
    revalidatedPath = true;
  }
  return Response.json({ revalidatedTag, revalidatedPath, now: Date.now() });
}
