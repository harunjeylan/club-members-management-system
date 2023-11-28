'use client';

import { Space } from '@prisma/client';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Alert, { AlertMessage } from '../ui/Alert';
import { TransitionContext } from '@client/context/TransitionContext';
import handleUpdateSpace from '@client/libs/client/space/handleUpdateSpace';

type PropsType = {
  users: string[];
  spaces: Space[];
};
function AddUsersToSpaceForm({ users, spaces }: PropsType) {
  const { handleServerMutation } = useContext(TransitionContext);
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string>(
    spaces.length ? spaces?.[0].name : ''
  );

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSpace.length) {
      return setMessages([{
        type: 'warning',
        summery: "Space can't empty",
        title: 'Warning ',
      }]);
    }
    handleServerMutation(async () => {
      const response = await handleUpdateSpace(selectedSpace, {
        addUsers: users,
      });
      if (response.space) {
        setMessages([{
          type: 'success',
          summery: 'Users are added to Space successfully',
          title: 'Success ',
        }]);
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
    <form onSubmit={onSubmit} className="w-full grid grid-cols-2 gap-4 p-4">
      {messages.map((message, ind) => (
        <div key={ind} className="col-span-2">
          <Alert message={message} handleRemove={() => setMessages((prevMessages) => prevMessages.splice(ind, 1))} />
        </div>
      ))}
      <div className="col-span-2 flex flex-col gap-4 w-full">
        <div className="col-span-2 flex flex-col gap-1 w-full">
          <label>Space</label>
          <select
            name="spaceName"
            className={`input py-2 px-`}
            onChange={(e) => setSelectedSpace(e.target.value)}
            value={selectedSpace}
          >
            {spaces.map((space) => (
              <option key={space.name} value={space.name}>
                {space.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-end gap-1 w-full">
        <button type="submit" className="btn-primary py-2">
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddUsersToSpaceForm;
