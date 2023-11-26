import BlogDetails from '@client/components/Blog/BlogDetails';
import getFileUrl from '@client/helpers/getFileUrl';
import getBlogDetails from '@client/libs/server/getBlogDetails';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page({ params }: { params: { slug: string } }) {
  const blog = await getBlogDetails(params.slug);
  console.log(getFileUrl(blog.image));

  return (
    <section className="w-full ">
      <div className="flex justify-start px-4">
        <Link
          href={`/blogs`}
          className=" py-2 px-4 flex gap-2 items-center text-primary-500"
        >
          <AiOutlineArrowLeft />
          Back
        </Link>
      </div>
      <div className="max-w-6xl mx-auto w-full px-2 md:px-4">
        <Suspense fallback={<div>Loading..</div>}>
          <BlogDetails blog={blog} />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
