'use client';

import { Role } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import DataTable from '../ui/DataTable';
import { fuzzySort } from '../ui/DataTable/helperFns';

function RoleListTable({ roles }: { roles: Role[] }) {
  const columns = React.useMemo<ColumnDef<Role, any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
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

  const [data, setData] = React.useState(() => roles);

  return <DataTable<Role> data={data} columns={columns} />;
}

export default RoleListTable;
