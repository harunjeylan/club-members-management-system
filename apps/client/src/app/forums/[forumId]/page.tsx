import BlogDetails from '@client/components/Blog/BlogDetails';
import BlogList from '@client/components/Blog/BlogList';
import Footer from '@client/components/Footer';
import Header from '@client/components/ui/Header';
import getFileUrl from '@client/helpers/getFileUrl';
import getBlogDetails from '@client/libs/server/getBlogDetails';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import getPublishedBlogDetails from '@client/libs/server/getPublishedBlogDetails';
import getPublishedBlogs from '@client/libs/server/getPublishedBlogs';
import Link from 'next/link';
import { Suspense } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BlogWithAll } from 'types/blog';

async function Page({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  let blog: BlogWithAll;

  if (user) {
    blog = await getBlogDetails(params.slug);
  } else {
    blog = await getPublishedBlogDetails(params.slug);
  }
  const blogs = await getPublishedBlogs();
  return (
    <>
      <main className="w-full my-8">
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
          <Suspense fallback={<div>Loading..</div>}>
            <div className="my-4">
              <Header title="Other Blogs" />
            </div>
            <BlogList blogs={blogs} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Page;
