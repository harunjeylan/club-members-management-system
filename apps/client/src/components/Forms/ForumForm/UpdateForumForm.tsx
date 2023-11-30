'use client';
import { Category, Forum, ForumScop, Repeat, Space } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import ForumForm, { ForumFormType } from './ForumForm';
import { TransitionContext } from '@client/context/TransitionContext';
import handleUpdateForum from '@client/libs/client/forums/handleUpdateForum';
function UpdateForumForm({
  forum,
  spaceName,
  spaces,
}: {
  spaces?: Space[];
  forum: Forum;
  spaceName?: string;
}) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues: ForumFormType = {
    title: forum.title ?? '',
    scop:
      forum.scop ?? forum.spaceName ?? spaceName
        ? ForumScop.LOCAL
        : ForumScop.GENERAL,
    description: forum.description ?? '',
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

  async function onSubmit(values: ForumFormType) {
    const revalidateTags = [
      ...(values.spaceName ? [`getSpaceDetails/${values.spaceName}`] : []),
    ];
    handleServerMutation(async () => {
      const response = await handleUpdateForum(forum.id, values, {
        tags: revalidateTags,
      });
      if (response.forum) {
        setMessages([
          {
            type: 'success',
            summery: 'Forum created successfully',
            title: 'Success ',
          },
        ]);
      }

      if (response?.errors) {
        setMessages(
          response?.errors.map(
            (error: { message: string; path: string[] }) => ({
              type: 'warning',
              summery: `${error.path?.[0]} : ${error.message}`,
              title: 'Warning ',
            })
          )
        );
      }
    });
  }
  return (
    <ForumForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      messages={messages}
      setMessages={setMessages}
      spaces={spaces}
    />
  );
}

export default UpdateForumForm;
