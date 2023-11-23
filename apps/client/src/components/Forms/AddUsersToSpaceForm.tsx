'use client';
import { default as handleAddToSpace, default as handleAddUsersToSpace } from '@client/libs/client/handleAddUsersToSpace';
import { Space } from '@prisma/client';
import { FormEvent, useEffect, useState } from 'react';
import Alert, { AlertMessage } from '../ui/Alert';
function AddUsersToSpaceForm({
  users,
  spaces,
}: {
  users: string[];
  spaces: Space[];
}) {
  const [message, setMessage] = useState<AlertMessage>();
  const [selectedSpace, setSelectedSpace] = useState<string>('');

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
    let response: any;
    e.preventDefault();
    if (selectedSpace.length) {
      response = await handleAddUsersToSpace(selectedSpace, users);
      if (response.space) {
        setMessage({
          type: 'success',
          summery: 'Users are added to Space successfully',
          title: 'Success ',
        });
      }
    } else {
      response = await handleAddToSpace(selectedSpace, users);
      if (response.space) {
        setMessage({
          type: 'success',
          summery: 'Users are added to Space successfully',
          title: 'Success ',
        });
      }
    }

    console.log({ response });

    if (response?.error) {
      setMessage({
        type: 'warning',
        summery: response?.error,
        title: 'Warning ',
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
            <option value={''}>-----</option>
            {spaces.map((space) => (
              <option value={space.name}>{space.name}</option>
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
