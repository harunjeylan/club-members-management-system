'use client';
import getFileUrl from '@client/helpers/getFileUrl';
import formatDateTime from '@client/utils/formatDateTime';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';
import { BlogWithAll } from 'types/blog';
type PropsType = {
  blog: BlogWithAll;
};

export default function BlogCard({ blog }: PropsType) {
  console.log(blog.author);
  
  return (
    <div className="flex flex-col gap-4 bg-secondary-100 dark:bg-secondary-900 p-2 rounded-lg">
      <div className={`flex rounded  `}>
        <Link
          href={`/blogs/${blog.slug}`}
          className="w-full aspect-video max-h-[600px]"
        >
          {!!blog.image && (
            <Image
              src={getFileUrl(blog.image)}
              alt={blog.slug}
              width={400}
              height={400}
              className="w-full object-cover rounded aspect-video max-h-[600px]"
            />
          )}
        </Link>
      </div>
      {!!blog.publishedAt && <small>{formatDateTime(blog.publishedAt)}</small>}
      {!!blog.author && (
        <div className="w-full flex flex-row items-center gap-4">
          {!!blog.author?.profile?.image ? (
            <Image
              src={getFileUrl(blog.author?.profile?.image)}
              alt={blog.author.username}
              width={100}
              height={100}
              className="h-8 w-8 aspect-square rounded-full"
            />
          ) : (
            <FaUserAlt size={20} />
          )}
          <div className="text-start text-sm flex flex-col gap-1">
            <div>
              {blog.author.first_name} {blog.author.last_name}
            </div>
            <small>{blog.author.email}</small>
          </div>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <Link
          href={`/blogs/${blog.slug}`}
          className="text-lg font-bold line-clamp-1"
        >
          {blog.title}
        </Link>
      </div>
      <p className="line-clamp-3">{blog.description}</p>
      {blog.category && <span className="chip">{blog.category.name}</span>}
      {!!blog.published && (
        <span className="flex w-full p-1 bg-success-500 rounded-lg mb-2"></span>
      )}
    </div>
  );
}
