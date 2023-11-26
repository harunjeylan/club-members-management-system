'use client';
import { Blog, Category } from '@prisma/client';
import BlogCard from './BlogCard';

function BlogList({ blogs }: { blogs: (Blog & { category: Category })[] }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogs.map((blog, ind) => (
        <BlogCard key={ind} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
