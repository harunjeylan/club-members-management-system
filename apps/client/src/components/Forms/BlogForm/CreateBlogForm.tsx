'use client';
import handleCreateBlog from '@client/libs/client/blog/handleCreateBlog';
import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import BlogForm, { BlogFormType } from './BlogForm';
type PropsType = {
  categories: Category[];
  spaceName?: string;
};
function CreateBlogForm({ categories, spaceName }: PropsType) {
  const [message, setMessage] = useState<AlertMessage>();
  const initialValues: BlogFormType = {
    title: '',
    slug: '',
    published: false,
    description: '',
    content: '',
    keyword: '',
    categoryId: '',
    fileModelId: '',
    spaceName: spaceName ?? '',
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
    console.log({ values });
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    const response = await handleCreateBlog(values, { tags: revalidateTags });
    console.log({ response });
    if (response.event) {
      setMessage({
        type: 'success',
        summery: 'Blog created successfully',
        title: 'Success ',
      });
    }

    if (response?.error) {
      setMessage({
        type: 'error',
        summery: response?.error,
        title: 'Error ',
      });
    }
  }
  return (
    <BlogForm
      categories={categories}
      onSubmit={onSubmit}
      initialValues={initialValues}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default CreateBlogForm;
