'use client';

import { Space } from '@prisma/client';
import { ColumnDef, Table } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import DataTable from '../ui/DataTable';
import { fuzzySort } from '../ui/DataTable/helperFns';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import Link from 'next/link';

function SpaceListTable({ spaces }: { spaces: Space[] }) {
  const [table, setTable] = useState<Table<Space>>();
  const [selectedRow, setSelectedRow] = useState<{}>({});
  const [selected, setSelected] = useState<Space[]>([]);
  useEffect(() => {
    const selectedItem = Object.keys(selectedRow)
      .map((idNumber) => table?.getRow(`${idNumber}`)?.original)
      .filter((item) => !!item) as Space[];
    setSelected(selectedItem);
  }, [selectedRow]);
  const columns = React.useMemo<ColumnDef<Space, any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name',
        header: ({ table }) => {
          setSelectedRow(table.getState().rowSelection);
          return (
            <div className="flex gap-2 items-center">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
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
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
              <span>{getValue()}</span>
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
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-bg-fuchsia-600">
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
        header: 'Scop',
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

        <Link href={'/admin/spaces/new'} className="btn-primary py-2 px-4">
            Add Space
          </Link>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <DataTable<Space> data={spaces} columns={columns} getTable={setTable} />
      </div>
    </div>
  );
}

export default SpaceListTable;
