import { Blog, Category, FileModel, Space } from '@prisma/client';
import React from 'react';
import Header from '../ui/Header';
import getFileUrl from '@client/helpers/getFileUrl';
import Image from 'next/image';

export default function BlogDetails({
  blog,
}: {
  blog: Blog & { category: Category; space: Space; image: FileModel };
}) {
  return (
    <main className="flex flex-col gap-4">
      <article className="w-full max-w-6xl  mx-auto flex flex-col gap-4">
        <p className="w-full max-w-4xl  mx-auto">{blog.description}</p>
        <figure className="w-full max-w-4xl aspect-video mx-auto">
          {blog?.image && (
            <Image
              src={getFileUrl(blog.image)}
              alt={blog.title}
              width={2000}
              height={1800}
              className="w-full object-cover aspect-video"
            />
          )}
        </figure>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </article>
    </main>
  );
}
