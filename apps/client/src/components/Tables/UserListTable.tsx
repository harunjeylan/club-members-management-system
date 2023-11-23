'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { UserWithAll, UserWithProfileAndRoles } from 'types/user';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';

type PropsType = {
  baseUrl: string;
  users: Partial<UserWithAll>[];
  setSelected: Dispatch<SetStateAction<UserWithAll[]>>;
};
function UsersListTable({ users, baseUrl, setSelected }: PropsType) {
  const columns = React.useMemo<ColumnDef<Partial<UserWithAll>, any>[]>(
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
                  onChange: (event) => {
                    const checked = event.currentTarget.checked;
                    const selectedUsers = (
                      checked
                        ? table.getCenterRows().map((row) => row.original)
                        : []
                    ) as any[];

                    setSelected(selectedUsers);
                    table.getToggleAllRowsSelectedHandler()(event);
                  },
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
                      setSelected((prev: any[]) =>
                        checked
                          ? [...prev, row.original]
                          : prev.filter((item) => item.id !== row.original.id)
                      );
                      row.getToggleSelectedHandler()(event);
                    },
                  }}
                />
                <Link className="link-text" href={`${baseUrl ?? ''}/users/${row.original.id}`}>
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
  return <DataTable<Partial<UserWithAll>> data={users} columns={columns} />;
}

export default UsersListTable;
