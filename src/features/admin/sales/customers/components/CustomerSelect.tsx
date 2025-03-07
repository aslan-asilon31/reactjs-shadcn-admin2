import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import useCustomerStore from '@/stores/customerStore';
import CustomerFilter from '@/features/admin/sales/customers/components/CustomerFilter'; // Komponen filter
import DataTable from 'react-data-table-component';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


const CustomerSelect = () => {
    const {setSelectedcustomerId } = useCustomerStore() as { customers: Brand; error: string | null };
 


    const handleEdit = async (customerId: any) => {
        setSelectedcustomerId(customerId);
        window.location.href = `/customers/${customerId}/edit/`;
      };

  return (
    <div>
     
     <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
        </SelectContent>
    </Select>

 


    </div>
  );
};

export default CustomerSelect;
