"use client"
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

import useProductContentStore from '@/stores/productContentStore';

 
export type ProductContent = {
  id: string
  product_id: string
  title: string
  slug: string
  url: string
  excerpt: string
  image_url: string
  created_by: string
  updated_by: string
  created_at: Date
  is_activated: boolean
}

export const columns: ColumnDef<ProductContent>[] = [


  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const productbrand = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only text-xs">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="text-xs"
              onClick={() => navigator.clipboard.writeText(productbrand.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">
                <button onClick={() => handleEdit(productbrand.id)}>Edit</button>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "product_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product ID
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("slug")}</div>,
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Url
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("url")}</div>,
  },
  {
    accessorKey: "excerpt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Excerpt
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("excerpt")}</div>,
  },
  {
    accessorKey: "image_url", 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          image url
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("image_url")}</div>,
  },
  {
    accessorKey: "cerated_by",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("cerated_by")}</div>,
  },
  {
    accessorKey: "updated_by",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("updated_by")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => 
    <div className="lowercase text-xs">
        {new Date(row.getValue("created_at")).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long', // Menampilkan bulan dalam format huruf
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}
    </div>,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => 
    <div className="lowercase text-xs">
        {new Date(row.getValue("updated_at")).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long', // Menampilkan bulan dalam format huruf
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}
    </div>,
  },
  {
    accessorKey: "is_activated",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Activated
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-xs">{row.getValue("is_activated")}</div>,
  },


]
 

const ProductContentList = () => {
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
  const { productcontents, fetchProductContents,setSelectedBrandId } = useProductContentStore();

  useEffect(() => {
      fetchProductContents(); // Fetch productcontents on component mount
  }, [fetchProductContents]);

  const table = useReactTable({
    data: productcontents,
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

  const handleEdit = async (brandId: any) => {
    setSelectedBrandId(brandId);
    window.location.href = `/brands/${brandId}/edit/`;
  };



  return (
    <div>

    
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>


        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Product Content List</p>
        </div>


        <div className="w-full">
          <div className="flex items-center py-4">

          <Dialog>
            <DialogTrigger className="outline outline-blue-500 font-bold m-1 p-1 text-xs rounded-md text-dark">Search Advanced</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                  <DialogTitle >
                    Advanced Search
                  </DialogTitle>
                <DialogDescription>
                  <div className="grid grid-cols-3 gap-4">

                      <div className="">
                        <Input
                          placeholder="Filter  id..." 
                          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("id")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter product id..." 
                          value={(table.getColumn("product_id")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("product_id")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter title..." 
                          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter slug..." 
                          value={(table.getColumn("slug")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("slug")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter url..." 
                          value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("url")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter excerpt..." 
                          value={(table.getColumn("excerpt")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("excerpt")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter image url..." 
                          value={(table.getColumn("image_url")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("image_url")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter created by..." 
                          value={(table.getColumn("created_by")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("created_by")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter updated by..." 
                          value={(table.getColumn("updated_by")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("updated_by")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter created at..." 
                          value={(table.getColumn("created_at")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("created_at")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>

                      <div className="">
                        <Input
                          placeholder="Filter updated at..." 
                          value={(table.getColumn("updated_at")?.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            table.getColumn("updated_at")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm text-xs"
                        />
                      </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Search
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>



    
            <div className='flex gap-x-2'>
              {table.getColumn('is_activated') && (
                <div
                  column={table.getColumn('is_activated')}
                  title='Is Activated'
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                  ]}
                />
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="outline outline-blue-500 ml-auto text-xs">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-xs"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
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
                      className="h-24 text-xs text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-xs text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>


            <div className='flex w-[100px] text-xs items-center justify-center text-xs font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>

            <div className="space-x-2 text-xs">
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

            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <DoubleArrowLeftIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeftIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRightIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <DoubleArrowRightIcon className='h-4 w-4' />
              </Button>
            </div>

            <div className='flex items-center space-x-2'>
              <p className='hidden text-xs font-medium sm:block'>Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className='h-8 w-[70px]'>
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


          </div>
        </div>

      </Main>
    </div>
  );
};

export default ProductContentList;
