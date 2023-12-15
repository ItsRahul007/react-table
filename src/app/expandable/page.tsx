"use client"
import React, { HTMLAttributes, HTMLProps, useMemo, useReducer, useState } from 'react'
import ReactDOM from 'react-dom/client';

import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  ColumnOrderState,
  createColumnHelper,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'
import DATA from "../data.json";
import VisibilityCompo from '../compo/Vsibility';

const Page: React.FC = () => {
  const rerender = useReducer(() => ({}), {})[1];
  const columnHelper = createColumnHelper<Person>();

  // const columns = useMemo<ColumnDef<Person>[]>(
  //   () => [
  //     {
  //       accessorKey: 'firstName',
  //       header: ({ table }) => (
  //         <>
  //           <button
  //             {...{
  //               onClick: table.getToggleAllRowsExpandedHandler(),
  //             }}
  //           >
  //             {table.getIsAllRowsExpanded() ? '👇' : '👉'}
  //           </button>{' '}
  //           First Name
  //         </>
  //       ),
  //       cell: ({ row, getValue }) => (
  //         <div
  //           style={{
  //             paddingLeft: `${row.depth * 2}rem`,
  //           }}
  //         >
  //           <>
  //             {row.getCanExpand() && (
  //               <button
  //                 {...{
  //                   onClick: row.getToggleExpandedHandler(),
  //                   style: { cursor: 'pointer' },
  //                 }}
  //               >
  //                 {row.getIsExpanded() ? '👇' : '👉'}
  //               </button>
  //             )}{' '}
  //             {getValue()}
  //           </>
  //         </div>
  //       ),
  //       footer: props => props.column.id,
  //     },
  //     {
  //       accessorFn: row => row.lastName,
  //       id: 'lastName',
  //       cell: info => info.getValue(),
  //       header: () => <span>Last Name</span>,
  //       footer: props => props.column.id,
  //     },
  //     // {
  //     //   accessorKey: 'age',
  //     //   header: () => 'Age',
  //     //   footer: props => props.column.id,
  //     // },
  //     {
  //       accessorKey: 'visits',
  //       header: () => <span>Visits</span>,
  //       footer: props => props.column.id,
  //     },
  //     {
  //       accessorKey: 'status',
  //       header: 'Status',
  //       footer: props => props.column.id,
  //     },
  //     {
  //       accessorKey: 'progress',
  //       header: 'Profile Progress',
  //       footer: props => props.column.id,
  //     }
  //   ],
  //   []
  // )

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        id: 'firstName',
        header: ({ table }) => (
          <>
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? '👇' : '👉'}
            </button>{' '}
            First Name
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <>
              {row.getCanExpand() && (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                  }}
                >
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              )}{' '}
              {getValue()}
            </>
          </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.lastName,
        accessorKey: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: props => props.column.id,
      },
      {
        header: "More Information",
        columns: [
          {
            accessorKey: 'status',
            header: 'Status',
            footer: props => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: props => props.column.id,
          }
        ]
      },
      ],
    []
  )


  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const [columnOrder, setColumnorder] = useState<ColumnOrderState>(
    columns.map(column => column.id as string)
  );

  const table = useReactTable({
    data: DATA,
    columns,
    columnResizeMode: "onChange",
    state: {
      columnOrder,
      expanded,
      columnVisibility,
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnorder,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <div className='flex'>
        <VisibilityCompo table={table} />
        <div className="flex flex-row gap-5 h-10 mb-6">
          <button onClick={() => { setColumnorder(['status']) }} className="border-2 p-1">
            Change Order
          </button>
          <button onClick={() => { setColumnorder(columns.map(column => column.id as string)) }} className="border-2 p-1">
            Reset Order
          </button>
        </div>
      </div>
      <div className='border border-slate-200 w-fit'>
        <div>
          {table.getHeaderGroups().map(headerGroup => (
            <div className='flex w-fit h-8' key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <div className='border border-slate-200 p-[2px] px-1 relative font-bold text-center h-8' key={header.id} {...{
                    // key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }} >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                              }`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className='tbody'>
          {table.getRowModel().rows.map(row => {
            return (
              <div className='tr' key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <div className='td' key={cell.id} style={{ width: cell.column.getSize() }} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Page;
