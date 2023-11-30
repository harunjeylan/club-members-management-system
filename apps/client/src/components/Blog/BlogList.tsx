'use client';
import { Blog, Category, FileModel, Space } from '@prisma/client';
import BlogCard from './BlogCard';
import { BlogWithAll } from 'types/blog';

type PropsType = {
  blogs: (BlogWithAll)[];
}
function BlogList({ blogs }: PropsType) {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
      {blogs.map((blog, ind) => (
        <BlogCard key={ind} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
