/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useReducer, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import './globals.css';
import VisibilityCompo from './compo/Vsibility';
import DATA from "./data.json";

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const COLUMS: any = [
  {
    "accessorKey": "firstName",
    "header": "First Name",
  },
  {
    "accessorKey": "lastName",
    "header": "Last Name"
  },
  {
    "accessorKey": "visits",
    "header": "Visits"
  },
  {
    "accessorKey": "status",
    "header": "Status"
  },
  {
    "accessorKey": "progress",
    "header": "Profile Progress"
  }
]

const defaultData: Person[] = [...DATA];

//* If header is not their then accessorKey will be header
const defaultColumns: ColumnDef<Person>[] = [...COLUMS]

export default function App() {
  const rerender = useReducer(() => ({}), {})[1]
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: defaultData,
    columns: defaultColumns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });


  // return (
  //   <div className="p-2">
  //       <table
  //         style={{
  //           width: "90vw",
  //         }}
  //       >
  //         <thead>
  //           {table2.getHeaderGroups().map(headerGroup => {
  //             console.log(headerGroup);
  //             return (
  //               <tr key={headerGroup.id}>
  //                 {headerGroup.headers.map(header => (
  //                   <th
  //                     key={header.id}
  //                     style={{ width: header.getSize() }}
  //                     colSpan={header.colSpan}
  //                   >
  //                     {header.isPlaceholder
  //                       ? null
  //                       : flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext()
  //                       )}
  //                     <div
  //                       className={`resizer ${header.column.getIsResizing() ? 'isResizing' : null
  //                         }`}
  //                       onMouseDown={header.getResizeHandler()}                        
  //                       onTouchStart={header.getResizeHandler()}
  //                     />
  //                   </th>
  //                 ))}
  //               </tr>
  //             )
  //           })}
  //         </thead>

  //         <tbody>
  //           {table2.getRowModel().rows.map(row => (
  //             <tr key={row.id}>
  //               {row.getVisibleCells().map(cell => (
  //                 <td
  //                   key={cell.id}
  //                   style={{ width: cell.column.getSize(), whiteSpace: "nowrap" }}
  //                 >
  //                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                 </td>
  //               ))}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>

  //     <div className="h-4" />
  //     <button onClick={() => rerender()} className="border p-2">
  //       Rerender
  //     </button>
  //     <pre>
  //       {JSON.stringify(
  //         {
  //           columnSizing: table2.getState().columnSizing,
  //           columnSizingInfo: table2.getState().columnSizingInfo,
  //         },
  //         null,
  //         2
  //       )}
  //     </pre>
  //   </div>
  // )
  return (
    <div className="p-2">
      {/* <div className="overflow-x-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    {...{
                      // key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                        style: {
                          transform:
                              header.column.getIsResizing()
                              ? `translateX(${table.getState().columnSizingInfo.deltaOffset
                              }px)`
                              : '',
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                  key={cell.id}
                    {...{
                      // key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4" /> */}
      <VisibilityCompo table={table} />
      <div className="text-xl">{'<div/> (relative)'}</div>
      <div className="overflow-x-auto h-72">
        <div
          {...{
            className: 'divTable',
            style: {
              // width: table.getTotalSize(),
              width: "90vw",
              overflow: "scroll"
            },
          }}
        >
          <div>
            {table.getHeaderGroups().map(headerGroup => (
              <div key={headerGroup.id} className='tr'>
                {headerGroup.headers.map(header => (
                  <div
                    key={header.id}
                    className='th'
                    {...{
                      // key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            {...{
              className: 'tbody',
            }}
          >
            {table.getRowModel().rows.map(row => (
              <div
                key={row.id}
                {...{
                  className: 'tr',
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <div
                    key={cell.id}
                    {...{
                      // key: cell.id,
                      className: 'td',
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-4" />
      <div className="text-xl">{'<div/> (absolute positioning)'}</div>
      <div>
        <label className='w-screen block text-black bg-white'>Emergency</label>
        <div className="overflow-x-auto">
          <div
            {...{
              className: 'divTable',
              style: {
                width: table.getTotalSize(),
              },
            }}
          >
            <div
              {...{
                className: 'tbody',
              }}
            >
              {table.getRowModel().rows.map(row => (
                <div
                  key={row.id}
                  {...{
                    // key: row.id,
                    className: 'tr',
                    style: {
                      position: 'relative',
                    },
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <div
                      key={cell.id}
                      {...{
                        // key: cell.id,
                        className: 'td',
                        style: {
                          position: 'absolute',
                          left: cell.column.getStart(),
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}