"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from "@tanstack/react-table";
import axios from 'axios';
import { useState } from 'react';
import { labels } from '../data/data';

// You can use a Zod schema here if you want.
export type Customer = {
  label: string;
  id?: string
  name: string
  selling_price: number
  is_activated: boolean
}

export const columns : ColumnDef<Customer>[] =  [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'name',
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'selling_price',
    header: 'selling_price',
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('selling_price')}
      </span>
    ),
  },
  {
    accessorKey: 'is_activated',
    header: 'is activated',
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('is_activated') ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
        const customerId = row.original.id;

        const [customers, setCustomers] = useState<Customer[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
    
        const handleDeleteCustomer = async (customerId: string) => {
          alert(customerId)
            try {
                setLoading(true); 
                await axios.delete(`http://localhost:8000/api/customers/${customerId}`);
                setCustomers(customers.filter(customer => customer.id !== customerId));
                alert('berhasil')
            } catch (err) {
                setError('Failed to delete customer'); 
                alert('gagal')
                alert(err)
            } finally {
                setLoading(false); 
            }
        };
        
        const handleEdit = () => {
            window.location.href = `/customers/customerCrud?id=${customerId}`;
        };

        return (
            <div className='flex space-x-2'>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={() => handleDeleteCustomer(customerId)} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        );
    },
  },
];


