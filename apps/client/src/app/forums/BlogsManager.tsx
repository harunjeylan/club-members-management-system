'use client';

import BlogListTable from '@client/components/Tables/BlogListTable';
import { TransitionContext } from '@client/context/TransitionContext';
import useConfirmation from '@client/hooks/useConfirmation';
import handleDeleteBlog from '@client/libs/client/blog/handleDeleteEvent';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { Blog, Category } from '@prisma/client';
import Link from 'next/link';
import { Suspense, useContext, useState } from 'react';

type PropsType = {
  blogs: (Blog & { category: Category })[];
};
function BlogsManager({ blogs }: PropsType) {
  const { confirm, ConfirmComp } = useConfirmation();
  const { handleServerMutation } = useContext(TransitionContext);
  const [selected, setSelected] = useState<(Blog & { category: Category })[]>(
    []
  );

  async function deleteBlogs() {
    handleServerMutation(async () => {
      const response = await handleDeleteBlog(selected.map((blog) => blog.id));
      if (response.space) {
        // setMessages({
        //   type: 'success',
        //   summery: 'Users are added to Space successfully',
        //   title: 'Success ',
        // });
      }

      if (response?.error) {
        // setMessages({
        //   type: 'error',
        //   summery: response?.error,
        //   title: 'Error ',
        // });
      }
      handleRevalidate({
        path: '/blogs',
        tag: 'getBlogs',
      });
    });
  }
  return (
    <div>
      <ConfirmComp className="px-4" />
      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-danger py-1 px-4"
                onClick={() =>
                  confirm(() => deleteBlogs(), {
                    title: 'Confirm to Delete',
                    summery: 'Do Yo Want to delete this?',
                  })
                }
              >
                delete
              </button>

              {selected.length === 1 && (
                <Link
                  href={`/blogs/${selected?.[0].slug}/update`}
                  className="btn-success py-1 px-4"
                >
                  update
                </Link>
              )}
            </div>
          ) : (
            ''
          )}
        </div>

        <Link
          href={`/blogs/new`}
          className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
        >
          Add Blog
        </Link>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <Suspense fallback={<div>Loading..</div>}>
          <BlogListTable blogs={blogs} setSelected={setSelected} baseUrl={''} />
        </Suspense>
      </div>
    </div>
  );
}

export default BlogsManager;
