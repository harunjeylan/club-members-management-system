'use client';
import { TransitionContext } from '@client/context/TransitionContext';
import getFileUrl from '@client/helpers/getFileUrl';
import useConfirmation from '@client/hooks/useConfirmation';
import handleDeleteFile from '@client/libs/client/files/handleDeleteFile';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { FileModel } from '@prisma/client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

export default function FileCard({ file }: { file: FileModel }) {
  const { confirm, ConfirmComp } = useConfirmation();
  const { handleServerMutation } = useContext(TransitionContext);
  async function deleteFiles() {
    handleServerMutation(async () => {
      const response = await handleDeleteFile(file.name);
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
        tag: 'getFiles',
      });
    });
  }
  return (
    <div key={file.id} className={`flex rounded relative `} onClick={() => {}}>
      <ConfirmComp className="px-4" />
      <Image
        src={getFileUrl(file)}
        alt={file.name}
        width={400}
        height={400}
        className="w-full object-cover aspect-square rounded"
      />
      <div className="absolute top-2 right-2">
        <button
          className="btn-icon"
          onClick={() =>
            confirm(() => deleteFiles(), {
              title: 'Confirm to Delete',
              summery: 'Do Yo Want to delete this?',
            })
          }
        >
          <MdDelete size={20} color="red" />
        </button>
      </div>
    </div>
  );
}
