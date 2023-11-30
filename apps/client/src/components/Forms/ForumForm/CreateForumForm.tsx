'use client';

import { TransitionContext } from '@client/context/TransitionContext';
import { useContext, useEffect, useState } from 'react';
import { AlertMessage } from '../../ui/Alert';
import ForumForm, { ForumFormType } from './ForumForm';
import handleCreateForum from '@client/libs/client/forums/handleCreateForum';
import { ForumScop, Space } from '@prisma/client';
type PropsType = {
  spaceName?: string;
  spaces?: Space[];
};
function CreateForumForm({ spaceName, spaces }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const initialValues: ForumFormType = {
    title: '',
    description: '',
    scop: spaceName ? ForumScop.LOCAL : ForumScop.GENERAL,
    spaceName: spaceName ?? spaces?.[0]?.name ?? '',
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
      const response = await handleCreateForum(values, {
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
      spaces={spaces}
      onSubmit={onSubmit}
      initialValues={initialValues}
      messages={messages}
      setMessages={setMessages}
    />
  );
}

export default CreateForumForm;
