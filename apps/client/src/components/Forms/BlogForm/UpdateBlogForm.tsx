'use client';
import { Category, Blog, Repeat, FileModel } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import BlogForm, { BlogFormType } from './BlogForm';
import handleUpdateBlog from '@client/libs/client/blog/handleUpdateEvent';
import { TransitionContext } from '@client/context/TransitionContext';
function UpdateBlogForm({
  blog,
  categories,
  spaceName,
  files,
}: {
  blog: Blog;
  categories: Category[];
  spaceName?: string;
  files: FileModel[];
}) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: BlogFormType = {
    title: blog.title ?? '',
    slug: blog.slug ?? '',
    published: blog.published ?? false,
    description: blog.description ?? '',
    content: blog.content ?? '',
    keyword: blog.keyword ?? '',
    categoryId: blog.categoryId ?? '',
    fileModelId: blog.fileModelId ?? '',
    spaceName: spaceName ?? blog.spaceName ?? '',
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (message) {
        setMessage(undefined);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  async function onSubmit(values: BlogFormType) {
    ;
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleUpdateBlog(blog.slug, values, {
        tags: revalidateTags,
      });
      ;
      if (response.blog) {
        setMessage({
          type: 'success',
          summery: 'Blog created successfully',
          title: 'Success ',
        });
      }

      if (response?.message) {
        setMessage({
          type: 'error',
          summery: response?.message,
          title: 'Error ',
        });
      }
    });
  }
  return (
    <BlogForm
      files={files}
      categories={categories}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default UpdateBlogForm;