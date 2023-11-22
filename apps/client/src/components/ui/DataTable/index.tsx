'use client';

import React from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  Table,
  TableState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  BiLeftArrow,
  BiRightArrow,
  BiSolidDownArrow,
  BiSolidLeftArrowAlt,
  BiSolidRightArrowAlt,
  BiSolidUpArrow,
} from 'react-icons/bi';
import DebouncedInput from './DebouncedInput';
import Filter from './Filter';
import { fuzzyFilter } from './helperFns';
type PropsType<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  subRows?: string;
  getTable?: (table: Table<T>) => void;
};
function DataTable<T>({ data, columns, subRows, getTable }: PropsType<T>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const [globalFilter, setGlobalFilter] = React.useState('');
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => (subRows ? row[subRows] : ''),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  if (typeof getTable === 'function') {
    getTable(table);
  }
  return (
    <div className="w-full flex flex-col gap-2 over">
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        className="px-2 input-small w-fit "
        placeholder="Search all columns..."
      />
      <div className="flex flex-col w-full">
        <table className="border-collapse  text-left text-sm ">
          <thead className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    colSpan={header.colSpan}
                    className="px-6 py-4 "
                  >
                    {header.isPlaceholder ? null : (
                      <div className="">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none py-2 flex gap-2 items-center font-bold'
                              : 'text-xl font-bold',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <BiSolidUpArrow />,
                            desc: <BiSolidDownArrow />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        <div className="font-extralight">
                          {header.column.getCanFilter() ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-400 dark:divide-slate-800 border-t border-slate-400 dark:border-slate-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-secondary-400 dark:hover:bg-secondary-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-6 py-4 font-bold "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="flex flex-nowrap items-center gap-2 w-full whitespace-nowrap">
          <button
            className="btn-icon border rounded p-1 "
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <BiSolidLeftArrowAlt />
          </button>
          <button
            className="btn-icon border rounded p-1 "
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <BiLeftArrow />
          </button>
          <button
            className="btn-icon border rounded p-1 "
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <BiRightArrow />
          </button>
          <button
            className="btn-icon border rounded p-1 "
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <BiSolidRightArrowAlt />
          </button>
          <span className="flex items-center gap-1 flex-nowrap ">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 flex-nowrap t">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="input-small"
            />
          </span>
          <select
            className="input-small px-3  py-[0.45rem]"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
