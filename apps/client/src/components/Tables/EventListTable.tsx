'use client';

import { Event } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { Dispatch } from 'react';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';

type PropsType = {
  baseUrl: string;
  events: Event[];
  setSelected: Dispatch<React.SetStateAction<Event[]>>;
};
function EventListTable({ events, baseUrl, setSelected }: PropsType) {
  const columns = React.useMemo<ColumnDef<Event, any>[]>(
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
        accessorFn: (row) => row.published,
        id: 'published',
        cell: (info) => (
          <>
            {info.getValue() ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-fuchsia-600">
                Unpublished
              </span>
            )}
          </>
        ),
        header: () => <span>Published</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.spaceName,
        id: 'spaceName',
        cell: (info) => (
          <>
            {info.getValue() ?? (
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-fuchsia-600">
                Null
              </span>
            )}
          </>
        ),
        header: () => <span>Space Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.startAt,
        id: 'startAt',
        cell: (info) => info.getValue(),
        header: () => <span>Start At</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.endAt,
        id: 'endAt',
        cell: (info) => info.getValue(),
        header: () => <span>End At</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => `${row.createdAt}`,
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

  return <DataTable<Event> data={events} columns={columns} />;
}

export default EventListTable;
