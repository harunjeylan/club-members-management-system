'use client';
import { Role } from '@prisma/client';
import { FormEvent, useEffect, useState } from 'react';
import Alert, { AlertMessage } from '../ui/Alert';
function AssignUsersRoleForm({
  users,
  roles,
}: {
  users: string[];
  roles: Role[];
}) {
  const [message, setMessage] = useState<AlertMessage>();
  const [selectedRole, setSelectedRole] = useState<string>(roles.length ? roles?.[0].name : '');

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
    if (!selectedRole.length) {
      return setMessage({
        type: 'warning',
        summery: "Role can't empty",
        title: 'Warning ',
      });
    }
    // const response = await handleAssignUsersRole(selectedRole, users);
    // console.log({ response });

    // if (response.role) {
    //   setMessage({
    //     type: 'success',
    //     summery: 'Role Assigned to Users successfully',
    //     title: 'Success ',
    //   });
    // }
    // if (response?.error) {
    //   setMessage({
    //     type: 'warning',
    //     summery: response?.error,
    //     title: 'Warning ',
    //   });
    // }
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
          <label>Role</label>
          <select
            name="spaceName"
            className={`input py-2 px-`}
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
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

export default AssignUsersRoleForm;
