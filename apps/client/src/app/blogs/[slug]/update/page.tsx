import UpdateBlogForm from '@client/components/Forms/BlogForm/UpdateBlogForm';
import getBlogDetails from '@client/libs/server/getBlogDetails';
import getCategories from '@client/libs/server/getCategories';
import Link from 'next/link';
import { Suspense } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

async function Page({ params }: { params: { slug: string , } }) {
  const categories = await getCategories();
  const blog = await getBlogDetails(params.slug);
  return (
    <section className="w-full ">
      <div className="flex justify-start">
        <Link
          href={`/blogs/${params.slug}`}
          className=" py-2 px-4 flex gap-2 items-center text-primary-500"
        >
          <AiOutlineArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full px-4 mx-auto mt-4">
        <div className="max-w-4xl mx-auto flex flex-col w-full gap-4 p-8 bg-secondary-100 dark:bg-secondary-900 rounded">
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Blog Form</div>
            <Suspense fallback={<div>Loading..</div>}>
              <UpdateBlogForm categories={categories} blog={blog} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
