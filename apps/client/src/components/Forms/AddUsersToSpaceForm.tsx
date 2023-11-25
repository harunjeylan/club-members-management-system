'use client';

import { Space } from '@prisma/client';
import { FormEvent, useEffect, useState } from 'react';
import Alert, { AlertMessage } from '../ui/Alert';
import handleUpdateSpace from '@client/libs/client/handleUpdateSpace';

type PropsType = {
  users: string[];
  spaces: Space[];
};
function AddUsersToSpaceForm({ users, spaces }: PropsType) {
  const [message, setMessage] = useState<AlertMessage>();
  const [selectedSpace, setSelectedSpace] = useState<string>(
    spaces.length ? spaces?.[0].name : ''
  );

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(selectedSpace.length);

    if (!selectedSpace.length) {
      return setMessage({
        type: 'warning',
        summery: "Space can't empty",
        title: 'Warning ',
      });
    }
    const response = await handleUpdateSpace(selectedSpace, {
      addUsers: users,
    });
    if (response.space) {
      setMessage({
        type: 'success',
        summery: 'Users are added to Space successfully',
        title: 'Success ',
      });
    }

    console.log({ response });

    if (response?.error) {
      setMessage({
        type: 'error',
        summery: response?.error,
        title: 'Error ',
      });
    }
  }
  return (
    <form onSubmit={onSubmit} className="w-full grid grid-cols-2 gap-4 p-4">
      {message && (
        <div className="col-span-2">
          <Alert message={message} handleRemove={() => setMessage(undefined)} />
        </div>
      )}
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
