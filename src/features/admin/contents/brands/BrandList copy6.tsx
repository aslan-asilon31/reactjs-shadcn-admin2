import { makeData, Person } from '@/features/admin/contents/brands/components/makeData'; // Komponen filter

import  { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, ColumnFiltersState } from '@tanstack/react-table';
import useBrandStore from '@/stores/brandStore';
import { Input } from '@/components/ui/input';


// interface ColumnFiltersState {
//   id?: string; // Optional property for name validation error
//   name?: string; // Optional property for name validation error
//   slug?: string; // Optional property for name validation error
//   image_url?: string; // Optional property for name validation error
//   created_by?: string; // Optional property for name validation error
//   updated_by?: string; // Optional property for name validation error
//   created_at?: string; // Optional property for name validation error
//   updated_at?: string; // Optional property for name validation error
//   parent_id?: string; // Optional property for name validation error
//   is_activated?: string; // Optional property for name validation error
// }


export default function BrandList() {
  const { brands, fetchBrands } = useBrandStore();
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]) 
  // const [columnFilters, setColumnFilters] = useState([]);

  // Fetch brands when the component mounts
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Set data from brands
  useEffect(() => {
    setData(brands);
  }, [brands]);

  // Define columns with filter functionality
  const columns = [
    {
      accessorKey: 'id', // Accessor for the column
      header: 'ID',
      filterFn: 'includesString', // Use a built-in filter function
    },
    {
      accessorKey: 'name', // Accessor for the column
      header: 'Brand Name',
      filterFn: 'includesString', // Use a built-in filter function
    },
    {
      accessorKey: 'slug', // Accessor for the column
      header: 'Slug',
      filterFn: 'includesString', // Use a built-in filter function
    },
    {
      accessorKey: 'image_url', // Accessor for the column
      header: 'Image URL',
      filterFn: 'includesString', // Use a built-in filter function
    },
    {
      accessorKey: 'desc', // Accessor for the column
      header: 'Desc',
      filterFn: 'includesString', // Use a built-in filter function
    },
    {
      accessorKey: 'parent_id', // Accessor for the column
      header: 'Parent ID',
      filterFn: 'includesString', // Use a built-in filter function
    },
    {
      accessorKey: 'created_by',
      header: 'Created By',
      filterFn: 'includesString',
    },
    {
      accessorKey: 'updated_by',
      header: 'Updated By',
      filterFn: 'includesString',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      filterFn: 'includesString',
    },
    {
      accessorKey: 'updated_at',
      header: 'updated At',
      filterFn: 'includesString',
    },
    {
      accessorKey: 'is_activated',
      header: 'is activated',
      filterFn: 'includesString',
    },
  ];

  
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <div>
                  <Input
                      placeholder='Filter name...'
                      value={
                        (table.getColumn('name')?.getFilterValue() as string) ?? ''
                      }
                      onChange={(event) =>
                        table.getColumn('name')?.setFilterValue(event.target.value)
                      }
                      className='h-8 w-[150px] lg:w-[250px]'
                    />
                  <Input
                      placeholder='Filter slug...'
                      value={
                        (table.getColumn('slug')?.getFilterValue() as string) ?? ''
                      }
                      onChange={(event) =>
                        table.getColumn('slug')?.setFilterValue(event.target.value)
                      }
                      className='h-8 w-[150px] lg:w-[250px]'
                    />
                  <Input
                      placeholder='Filter is_activated...'
                      value={
                        (table.getColumn('is_activated')?.getFilterValue() as string) ?? ''
                      }
                      onChange={(event) =>
                        table.getColumn('is_activated')?.setFilterValue(event.target.value)
                      }
                      className='h-8 w-[150px] lg:w-[250px]'
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add pagination controls if needed */}
    </div>
  );



  
}