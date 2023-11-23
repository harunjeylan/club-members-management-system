'use client';

import { Role } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { Dispatch } from 'react';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';

type PropsType = {
  baseUrl: string;
  roles: Role[];
  setSelected: Dispatch<React.SetStateAction<Role[]>>;
};
function RoleListTable({ roles, baseUrl, setSelected }: PropsType) {
  const columns = React.useMemo<ColumnDef<Role, any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name',
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
              <span>Name</span>
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
                <Link
                  className="link-text"
                  href={`${baseUrl ?? ''}/roles/${row.original.id}`}
                >
                  {getValue()}
                </Link>
              </div>
            </div>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.code,
        id: 'code',
        cell: (info) => info.getValue(),
        header: () => <span>Code</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => `${row.scop}`,
        id: 'scop',
        header: 'Scop',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => `${row.spaceName}`,
        id: 'spaceName',
        header: 'Space Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => `${row.description}`,
        id: 'description',
        header: 'Description',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
    ],
    []
  );

  return <DataTable<Role> data={roles} columns={columns} />;
}

export default RoleListTable;
