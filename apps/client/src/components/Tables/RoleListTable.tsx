'use client';

import { Role } from '@prisma/client';
import { ColumnDef, Table } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import DataTable from '../ui/DataTable';
import { fuzzySort } from '../ui/DataTable/helperFns';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import Link from 'next/link';

function RoleListTable({ roles }: { roles: Role[] }) {
  const [table, setTable] = useState<Table<Role>>();
  const [selectedRow, setSelectedRow] = useState<{}>({});
  const [selected, setSelected] = useState<Role[]>([]);
  useEffect(() => {
    const selectedItem = Object.keys(selectedRow)
      .map((idNumber) => table?.getRow(`${idNumber}`)?.original)
      .filter((item) => !!item) as Role[];
    setSelected(selectedItem);
  }, [selectedRow]);

  const columns = React.useMemo<ColumnDef<Role, any>[]>(
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

        <Link href={'/admin/roles/new'} className="btn-primary py-1 px-4">
          Add Role
        </Link>
      </div>
      <div className="w-full my-2 p-2 overflow-x-auto bg-secondary-100 dark:bg-secondary-900">
        <DataTable<Role> data={roles} columns={columns} getTable={setTable} />
      </div>
    </div>
  );
}

export default RoleListTable;
