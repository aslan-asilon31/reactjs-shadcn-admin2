import useCustomerStore from '@/stores/customerStore';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useGeneralStore from '@/stores/generalStore';
import  { useState,useEffect } from 'react';

import { Button } from "@/components/ui/button";




interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    created_by: string;
    updated_by: string;
    is_activated: number;
    created_at: Date;
    updated_at: Date;
  }


const customerSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  email: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
  is_activated: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type CustomerForm = z.infer<typeof customerSchema>


interface CustomerModalFormProps {
    mode: 'create' | 'edit'; // Menentukan mode
    customerData?: Customer; // Data pelanggan untuk mode edit
    onClose: () => void; // Fungsi untuk menutup modal
}


const CustomerModal: React.FC<CustomerModalFormProps> = ({ mode, customerData, onClose }) => {

    const { isModalOpen, openModal, closeModal, isLoading, setLoading, errorMessage, setErrorMessage } = useGeneralStore();
    const { customers,fetchCustomers,fetchAdvanceSearch,storeCustomer,updateCustomer,deleteCustomer } = useCustomerStore();
    const { register, handleSubmit,setValue, formState: { errors } } = useForm<CustomerForm>({
        resolver: zodResolver(customerSchema),
        // defaultValues: { first: '', role: '', desc: '' },
    });
      // Jika dalam mode edit, set nilai form dengan data pelanggan yang ada
    useEffect(() => {
        if (mode === 'edit' && customerData) {
            setValue('id', customerData.id);
            setValue('first_name', customerData.first_name);
            setValue('last_name', customerData.last_name);
            setValue('phone', customerData.phone);
            setValue('email', customerData.email);
            setValue('created_by', customerData.created_by);
            setValue('updated_by', customerData.updated_by);
            setValue('is_activated', customerData.is_activated);
            setValue('created_at', new Date(customerData.created_at.trim()));
            setValue('updated_at', new Date(customerData.updated_at.trim()));
        }
    }, [mode, customerData, setValue]);

    const handleOpenModal = () => {
        openModal();
      };
    
      const handleCloseModal = () => {
        closeModal();
      };

      const onSubmit = async (data: Customer) => {
        console.log('Submitting data:', data); // Debugging
        alert(mode);

        if (mode === 'create') {
            await storeCustomer(data); // Tambah pelanggan baru
        } else {
            // Logika untuk update customer
            console.log('Updating data:', data); // Debugging
            await updateCustomer(data.id,data); // Perbarui data pelanggan yang ada
        }
        handleCloseModal(); // Tutup modal setelah submit
    };

  return (
    <>
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">First Name</label>
                <input
                id="first_name"
                type="text"
                {...register('first_name')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.first_name && <p className="text-red-500 text-xs italic mt-1">{errors.first_name.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">Last Name</label>
                <input
                id="last_name"
                type="text"
                {...register('last_name')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.last_name && <p className="text-red-500 text-xs italic mt-1">{errors.last_name.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                id="email"
                type="email"
                {...register('email')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                <input
                id="phone"
                type="text"
                {...register('phone')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    {mode == 'create' ? 'Add Customer' : 'Update Customer'}
                </Button>
                <button
                type="button"
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                Cancel
                </button>
            </div>
        </form>


    </>
  );
};

export default CustomerModal;


