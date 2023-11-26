'use client';

import formatDateTime from '@client/utils/formatDateTime';
import { Category, Blog } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import React, { Dispatch } from 'react';
import DataTable from '../ui/DataTable';
import IndeterminateCheckbox from '../ui/DataTable/IndeterminateCheckbox';
import { fuzzySort } from '../ui/DataTable/helperFns';
import Link from 'next/link';

type PropsType = {
  baseUrl: string;
  blogs: (Blog & { category: Category })[];
  setSelected: Dispatch<
    React.SetStateAction<(Blog & { category: Category })[]>
  >;
};
function BlogListTable({ blogs, baseUrl, setSelected }: PropsType) {
  const columns = React.useMemo<
    ColumnDef<Blog & { category: Category }, any>[]
  >(
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
                  onChange: (blog) => {
                    const checked = blog.currentTarget.checked;
                    const selectedUsers = (
                      checked
                        ? table.getCenterRows().map((row) => row.original)
                        : []
                    ) as any[];

                    setSelected(selectedUsers);
                    table.getToggleAllRowsSelectedHandler()(blog);
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
                  onChange: (blog) => {
                    const checked = blog.currentTarget.checked;
                    setSelected((prev) =>
                      checked
                        ? [...prev, row.original]
                        : prev.filter((item) => item.id !== row.original.id)
                    );
                    row.getToggleSelectedHandler()(blog);
                  },
                }}
              />
              <Link
                className="link-text"
                href={`${baseUrl ?? ''}/blogs/${row.original.slug}`}
              >
                {getValue()}
              </Link>
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.slug,
        id: 'slug',
        cell: (info) => info.getValue(),
        header: () => <span>Slug</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.description,
        id: 'description',
        cell: (info) => info.getValue(),
        header: () => <span>Description</span>,
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
        accessorFn: (row) => row.category?.name,
        id: 'categoryId',
        cell: (info) => (
          <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-fuchsia-600">
            {info.getValue() ?? 'Null'}
          </span>
        ),
        header: () => <span>Category</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) =>
          `${row.publishedAt ? formatDateTime(row.publishedAt) : ''}`,
        id: 'publishedAt',
        cell: (info) => info.getValue(),
        header: () => <span>Published At</span>,
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

  return (
    <DataTable<Blog & { category: Category }> data={blogs} columns={columns} />
  );
}

export default BlogListTable;
