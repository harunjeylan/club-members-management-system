import { Blog } from '@prisma/client';
import React from 'react';

export default function BlogCard({ blog }: { blog: Blog }) {
  return <div>{blog.title}</div>;
}
