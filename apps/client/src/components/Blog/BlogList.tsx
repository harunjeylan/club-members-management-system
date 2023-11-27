'use client';
import { Blog, Category, FileModel, Space } from '@prisma/client';
import BlogCard from './BlogCard';
import { BlogWithAll } from 'types/blog';

type PropsType = {
  blogs: (BlogWithAll)[];
}
function BlogList({ blogs }: PropsType) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogs.map((blog, ind) => (
        <BlogCard key={ind} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
