"use client"

import React, { useEffect, useState } from 'react';
import useProductStore from '@/stores/productStore';
import ProductFilter from '@/features/admin/contents/products/components/ProductFilter'; // Komponen filter

import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type ProductSearchSortOptions = 'newest' | 'oldest' | 'price';

type ProductSearch = {
  page: number;
  filter: string;
  createdBy: string;
  sort: ProductSearchSortOptions;
};


export type Product = {
  id: string
  image: string
  name: string
  created_by: string
  created_at: string
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("image")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("created_by")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("created_at")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]




const ProductTable = () => {
  const { products, fetchProducts,fetchAdvanceSearch,setSelectedProductId } = useProductStore() as { products: Product; error: string | null };

  const [searchProduct, setSearchProduct] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSearchSortOptions>('newest');
  const [filter, setFilter] = useState('');
  const [originalRows, setOriginalRows] = useState([]);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
   
    const table = useReactTable({
      products,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })


    useEffect(() => {
      const fetchData = async () => {
        await fetchProducts();
        setOriginalRows(products);
      };
  
      fetchData();
    }, [fetchProducts]);
    
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    const createdByParam = params.get('created_by');
    const pageParam = params.get('page');
    const sortParam = params.get('sort');

    // Setel state berdasarkan parameter URL
    if (filterParam) setSearchProduct(filterParam);
    if (createdByParam) setCreatedBy(createdByParam);
    if (pageParam) setPage(Number(pageParam));
    if (sortParam) setSort(sortParam);

    fetchProducts()
    // Panggil fungsi pencarian dengan parameter yang diambil dari URL
    fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
  }, []);

  const handleEdit = async (productId: any) => {
    setSelectedProductId(productId);
    window.location.href = `/products/${productId}/edit/`;
  };

  return (
    <div>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Product List use material-react-table</p>
        </div>


        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter names..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
         
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>


<br />

        <div>

          <br />    
          <Button onClick={() => window.location.href = '/products/create'} className="text-white p-2 rounded">
              Add Product
          </Button>

          <table className="min-w-full border-collapse border border-gray-300">
               <ProductFilter 
                 searchProduct={searchProduct} 
                 setSearchProduct={setSearchProduct} 
                 createdBy={createdBy} 
                 setCreatedBy={setCreatedBy} 
                 setPage={setPage} 
                 setSort={setSort} 
               />
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Created By</th>
                <th className="border border-gray-300 p-2">Created At</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border border-gray-300">
                    <td className="text-center border border-gray-300 p-2  ">
                      <img className='w-16' src={product.image_url} alt=""  />
                    </td>
                    <td className="text-center border border-gray-300 p-2">{product.name ? product.name : '-'}</td>
                    <td className="text-center border border-gray-300 p-2">{product.created_by}</td>
                    <td className="text-center border border-gray-300 p-2">
                      {new Date(product.created_at).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long', // Menampilkan bulan dalam format huruf
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    
                    </td>
                    <td className="text-center border border-gray-300 p-2">
                      <button onClick={() => handleEdit(product.id)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-2 text-red-500 text-center">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
    </div>
  );
};

export default ProductTable;
