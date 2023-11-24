import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';
import getArrayValues from '@libs/utils/getArrayValues';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');

  const tags: string[] = [];
  const paths: string[] = [];
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.startsWith('tag')) {
      tags.push(value);
    }
    if (key.startsWith('path')) {
      paths.push(value);
    }
  });

  let revalidatedTags: string[] = [];
  let revalidatedPaths: string[] = [];
  paths.forEach((item: string) => {
    revalidatePath(item, type ? 'layout' : 'page');
    revalidatedPaths.push(item);
  });
  tags.forEach((item: string) => {
    revalidateTag(item);
    revalidatedTags.push(item);
  });
  return Response.json({ revalidatedTags, revalidatedPaths, now: Date.now() });
}
