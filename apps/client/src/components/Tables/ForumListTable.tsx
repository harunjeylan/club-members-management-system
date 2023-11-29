'use client';

import formatDateTime from '@client/utils/formatDateTime';
import { Forum } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { Dispatch } from 'react';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';

type PropsType = {
  baseUrl: string;
  forums: Forum[];
  setSelected: Dispatch<React.SetStateAction<Forum[]>>;
};
function ForumListTable({ forums, baseUrl, setSelected }: PropsType) {
  const columns = React.useMemo<ColumnDef<Forum, any>[]>(
    () => [
      {
        accessorFn: (row) => row.title,
        id: 'title',
        header: ({ table }) => {
          return (
            <div className="flex gap-2 items-center">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: (forum) => {
                    const checked = forum.currentTarget.checked;
                    const selectedUsers = (
                      checked
                        ? table.getCenterRows().map((row) => row.original)
                        : []
                    ) as any[];

                    setSelected(selectedUsers);
                    table.getToggleAllRowsSelectedHandler()(forum);
                  },
                }}
              />
              <span>Title</span>
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
                  onChange: (forum) => {
                    const checked = forum.currentTarget.checked;
                    setSelected((prev) =>
                      checked
                        ? [...prev, row.original]
                        : prev.filter((item) => item.id !== row.original.id)
                    );
                    row.getToggleSelectedHandler()(forum);
                  },
                }}
              />
              <Link
                className="link-text"
                href={`${baseUrl ?? ''}/forums/${row.original.id}`}
              >
                {getValue()}
              </Link>
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.spaceName,
        id: 'spaceName',
        cell: (info) => (
          <>
            {
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-fuchsia-600">
                {info.getValue() ?? 'Null'}
              </span>
            }
          </>
        ),
        header: () => <span>Space Name</span>,
        footer: (props) => props.column.id,
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

  return <DataTable<Forum> data={forums} columns={columns} />;
}

export default ForumListTable;
