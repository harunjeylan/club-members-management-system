'use client';

import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { useState } from 'react';
import { UserWithProfileAndRoles } from 'types/user';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';

function EventListTable({
  users,
  baseUrl,
}: {
  baseUrl: string;
  users: UserWithProfileAndRoles[];
}) {
  const [selected, setSelected] = useState<User[]>([]);
  console.log(selected);

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
        cell: ({ row, getValue }) => (
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
              <Link
                className="link-text"
                href={`${baseUrl ?? ''}/events/${row.original.id}`}
              >
                {getValue()}
              </Link>
            </div>
          </div>
        ),
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
      <div className="flex justify-between w-full ">
        <div>
          {selected.length ? (
            <div className="flex gap-2">
              <button className="btn-danger py-1 px-4">Delete</button>
              <button className="btn-success py-1 px-4">Add to Space</button>
              <button className="btn-success py-1 px-4">Assign Role</button>
            </div>
          ) : (
            ''
          )}
        </div>

        <Link href={'/admin/users/new'} className="btn-primary py-2 px-4">
          Add User
        </Link>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <DataTable<UserWithProfileAndRoles> data={users} columns={columns} />
      </div>
    </div>
  );
}

export default EventListTable;
