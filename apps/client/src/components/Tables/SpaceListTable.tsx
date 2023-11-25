'use client';

import { Space } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';
import formatDateTime from '@client/utils/formatDateTime';
type PropsType = {
  baseUrl: string;
  spaces: Space[];
  setSelected: Dispatch<SetStateAction<Space[]>>;
};
function SpaceListTable({ spaces, baseUrl, setSelected }: PropsType) {
  const columns = React.useMemo<ColumnDef<Space, any>[]>(
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
                href={`${baseUrl ?? ''}/spaces/${row.original.name}`}
              >
                {getValue()}
              </Link>
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.isPrivate,
        id: 'isPrivate',
        cell: (info) => (
          <>
            {info.getValue() ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                Private
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-fuchsia-600">
                Public
              </span>
            )}
          </>
        ),
        header: () => <span>Private</span>,
        footer: (props) => props.column.id,
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
      {
        accessorFn: (row) => `${formatDateTime(row.createdAt)}`,
        id: 'createdAt',
        header: () => <span>Created At</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
    ],
    []
  );

  return <DataTable<Space> data={spaces} columns={columns} />;
}

export default SpaceListTable;
