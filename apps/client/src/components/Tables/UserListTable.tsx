'use client';

import { Role, Space, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { UserWithProfileAndRoles } from 'types/user';
import CreateUserForm from '../Forms/CreateUserForm';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';
import Model from '../ui/Model';
import UpdateUserForm from '../Forms/UpdateUserForm';
import AssignUsersRoleForm from '../Forms/AssignUsersRoleForm';
import AddUsersToSpaceForm from '../Forms/AddUsersToSpaceForm';
enum FormType {
  ASSIGN_ROLE,
  ADD_TO_SPACE,
  UPDATE_USER,
  CREATE_USER,
}
type PropsType = {
  baseUrl: string;
  users: UserWithProfileAndRoles[];
  roles: Role[];
  spaces: Space[];
};
function UsersListTable({ users, roles, spaces, baseUrl }: PropsType) {
  const [show, setShow] = useState(false);
  const [expandUrl, setExpandUrl] = useState<string | undefined>(undefined);
  const [activeModel, setActiveModel] = useState<FormType | undefined>(
    undefined
  );

  const [selected, setSelected] = useState<UserWithProfileAndRoles[]>([]);
  console.log(selected);

  useEffect(() => {
    if (activeModel === FormType.CREATE_USER) {
      setExpandUrl('/admin/users/new');
    } else {
      setExpandUrl(undefined);
    }
  }, [activeModel]);

  const columns = React.useMemo<ColumnDef<UserWithProfileAndRoles, any>[]>(
    () => [
      {
        accessorFn: (row) => row.first_name,
        id: 'first_name',
        header: ({ table }) => {
          return (
            <div className="flex gap-2 items-center">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
              <span>First Name</span>
            </div>
          );
        },
        cell: ({ row, getValue }) => {
          return (
            <div
              style={{
                paddingLeft: `${row.depth * 2}rem`,
              }}
            >
              <div className="flex gap-2 items-center">
                <IndeterminateCheckbox
                  {...{
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: (event) => {
                      const checked = event.currentTarget.checked;
                      setSelected((prev) =>
                        checked
                          ? [...prev, row.original]
                          : prev.filter((item) => item.id !== row.original.id)
                      );
                      row.getToggleSelectedHandler()(event);
                    },
                  }}
                />
                <Link href={`${baseUrl ?? ''}/users/${row.original.id}`}>
                  {getValue()}
                </Link>
              </div>
            </div>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.last_name,
        id: 'last_name',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.username,
        id: 'username',
        cell: (info) => info.getValue(),
        header: () => <span>Username</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.email,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => `${row.createdAt}`,
        id: 'createdAt',
        header: () => <span>Join At</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
    ],
    []
  );

  return (
    <div>
      <Model
        show={show}
        setShow={setShow}
        className=" p-4 bg-secondary-100 dark:bg-secondary-900 rounded"
        expandUrl={expandUrl}
      >
        {activeModel === FormType.CREATE_USER && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">User Creation Form</div>
            <CreateUserForm />
          </div>
        )}
        {activeModel === FormType.ADD_TO_SPACE && selected.length && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Add Users to Space</div>
            <AddUsersToSpaceForm
              spaces={spaces}
              users={selected.map((user) => user.id)}
            />
          </div>
        )}
        {activeModel === FormType.ASSIGN_ROLE && selected.length && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Assign Role to Users</div>
            <AssignUsersRoleForm
              roles={roles}
              users={selected.map((user) => user.id)}
            />
          </div>
        )}
        {activeModel === FormType.UPDATE_USER && selected.length===1 && (
          <div className="min-w-[20rem] max-w-4xl mx-auto flex flex-col w-full gap-4">
            <div className="text-xl font-bold">Assign Role to Users</div>
            <UpdateUserForm
              user={selected[0]}
              spaces={spaces}
              roles={roles}
            />
          </div>
        )}
      </Model>

      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              <button className="btn-danger py-1 px-4">delete</button>
              <button
                className="btn-success py-1 px-4"
                onClick={() => {
                  setActiveModel(FormType.ADD_TO_SPACE);
                  setShow(true);
                }}
              >
                space
              </button>
              <button
                className="btn-success py-1 px-4"
                onClick={() => {
                  setActiveModel(FormType.ASSIGN_ROLE);
                  setShow(true);
                }}
              >
                role
              </button>
              {selected.length === 1 && (
                <button
                  className="btn-success py-1 px-4"
                  onClick={() => {
                    setActiveModel(FormType.UPDATE_USER);
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
            setActiveModel(FormType.CREATE_USER);
            setShow(true);
          }}
          className="btn-primary py-2 px-4 whitespace-nowrap h-fit"
        >
          Add User
        </button>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <DataTable<UserWithProfileAndRoles> data={users} columns={columns} />
      </div>
    </div>
  );
}

export default UsersListTable;
