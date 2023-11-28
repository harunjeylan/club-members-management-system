'use client';
import handleCreateBlog from '@client/libs/client/blog/handleCreateBlog';
import { Category, FileModel } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import BlogForm, { BlogFormType } from './BlogForm';
import { TransitionContext } from '@client/context/TransitionContext';
type PropsType = {
  categories: Category[];
  spaceName?: string;
  files: FileModel[];
};
function CreateBlogForm({ categories, spaceName, files }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);

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
      if (messages) {
        setMessages([]);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  async function onSubmit(values: BlogFormType) {
    ;
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleCreateBlog(values, { tags: revalidateTags });
      ;
      if (response.blog) {
        setMessages([{
          type: 'success',
          summery: 'Blog created successfully',
          title: 'Success ',
        }]);
      }

      if (response?.errors) {
        setMessages(
          response?.errors.map((error: { message: string, path:string[] }) => ({
            type: 'warning',
            summery: `${error.path?.[0]} : ${error.message}`,
            title: 'Warning ',
          }))
        );
      }
    });
  }
  return (
    <BlogForm
      categories={categories}
      onSubmit={onSubmit}
      initialValues={initialValues}
      messages={messages}
      setMessages={setMessages}
      files={files}
    />
  );
}

export default CreateBlogForm;
