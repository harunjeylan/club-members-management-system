import getFileUrl from '@client/helpers/getFileUrl';
import formatDateTime from '@client/utils/formatDateTime';
import Image from 'next/image';
import { BiCalendar } from 'react-icons/bi';
import { FaUserAlt, FaUserMd } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { BlogWithAll } from 'types/blog';

export default function BlogDetails({ blog }: { blog: BlogWithAll }) {
  ;

  return (
    <main className="flex flex-col gap-4">
      <article className="w-full max-w-4xl  mx-auto flex flex-col gap-4">
        <p className="w-full max-w-4xl  mx-auto">{blog.description}</p>
        <div className="flex gap-4 items-center justify-between">
          {!!blog.author && (
            <div className="flex flex-row items-center gap-2">
              <FaUserAlt size={40} />
              <div className="text-start text-sm">
                <div>
                  {blog.author.first_name} {blog.author.last_name}
                </div>
                <small>{blog.author.email}</small>
              </div>
            </div>
          )}
          {!!blog.publishedAt && (
            <div className="flex flex-row items-center gap-2">
              <BiCalendar size={40} />
              <div className="text-start text-sm">
                <div>{formatDateTime(blog.publishedAt)}</div>
              </div>
            </div>
          )}
          {!!blog.category && (
            <div className="flex flex-row items-center gap-2">
              <MdCategory size={40} />
              <div className="text-start text-sm">
                <div>{blog.category.name}</div>
              </div>
            </div>
          )}
        </div>
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
        <h1 className="text-lg md:text-2xl lg:text-4xl font-extrabold text-center">
          {blog.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </main>
  );
}
