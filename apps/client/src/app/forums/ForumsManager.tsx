'use client';

import CreateForumForm from '@client/components/Forms/ForumForm/CreateForumForm';
import UpdateForumForm from '@client/components/Forms/ForumForm/UpdateForumForm';
import ForumListTable from '@client/components/Tables/ForumListTable';
import Model from '@client/components/ui/Model';
import { TransitionContext } from '@client/context/TransitionContext';
import useConfirmation from '@client/hooks/useConfirmation';
import handleDeleteForum from '@client/libs/client/forums/handleDeleteForum';
import handleRevalidate from '@client/libs/client/handleRevalidate';
import { Category, Forum, Space } from '@prisma/client';
import { Suspense, useContext, useEffect, useState } from 'react';
enum FormType {
  UPDATE_EVENT,
  CREATE_EVENT,
}
type PropsType = {
  forums: Forum[];
  spaces: Space[];
};
function ForumsManager({ forums,spaces }: PropsType) {
  const { confirm, ConfirmComp } = useConfirmation();
  const { handleServerMutation } = useContext(TransitionContext);
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<Forum[]>([]);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );

  useEffect(() => {
    if (activeModel === FormType.CREATE_EVENT) {
      setExpandUrl('/forums/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  async function deleteForums() {
    handleServerMutation(async () => {
      const response = await handleDeleteForum(
        selected.map((forum) => forum.id)
      );
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
        path: '/forums',
        tag: 'getForums',
      });
    });
  }
  return (
    <div>
      <ConfirmComp className="px-4" />
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
        expandUrl={expandUrl}
      >
        {activeModel === FormType.CREATE_EVENT && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Create Role Form</div>
            <CreateForumForm spaces={spaces} />
          </div>
        )}
        {activeModel === FormType.UPDATE_EVENT && selected.length === 1 && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Update Role</div>
            <Suspense fallback={<div>Loading..</div>}>
              <UpdateForumForm  forum={selected[0]} spaces={spaces} />
            </Suspense>
          </div>
        )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button
                className="btn-danger py-1 px-4"
                onClick={() =>
                  confirm(() => deleteForums(), {
                    title: 'Confirm to Delete',
                    summery: 'Do Yo Want to delete this?',
                  })
                }
              >
                delete
              </button>

              {selected.length === 1 && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.UPDATE_EVENT);
                    setShow(true);
                  }}
                >
                  update
                </button>
              )}
            </div>
          ) : (
            ''
          )}
        </div>

        <button
          onClick={() => {
            setActiveModel(FormType.CREATE_EVENT);
            setShow(true);
          }}
          className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
        >
          Add Forum
        </button>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <Suspense fallback={<div>Loading..</div>}>
          <ForumListTable
            forums={forums}
            setSelected={setSelected}
            baseUrl={''}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default ForumsManager;
