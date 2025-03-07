import useProductStore from '@/stores/customerStore';
import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
// Definisi interface untuk Brand
interface Customer {
  id?: number;
  name: string;
}

// Definisi schema Zod untuk validasi
const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

const ProductEdit = () => {
  const { id } = useParams({ strict: false }); // Mengambil id dari URL
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });
  const [loading, setLoading] = useState(false);
  const deleteProduct = useProductStore((state) => state.deleteProduct); // Mengambil fungsi updateProductdeleteProduct dari Zustand
  const updateProductdeleteProduct = useProductStore((state) => state.updateProductdeleteProduct); // Mengambil fungsi updateProductdeleteProduct dari Zustand
  const fetchProductdeleteProductById = useProductStore((state) => state.fetchProductdeleteProductById); // Mengambil fungsi updateProductdeleteProduct dari Zustand

  
    
  // Mengambil data customer berdasarkan ID
  const fetchProductData = async () => {
    try {
      const productData = await fetchCustomerById(id); // Mengambil data customer
      if (productData) {
        setValue('name', productData.name); // Mengisi form dengan data yang diambil
      }
    } catch (error) {
      console.error("Failed to fetch customer data", error);
    }
  };

  useEffect(() => {
    fetchProductData(); // Memanggil fungsi untuk mengambil data saat komponen dimuat
  }, [id]);

  const onSubmit = async (data: Product) => {

    const generatedSlug = data.name.toLowerCase().trim().replace(/\s+/g, '-'); 


    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the customer.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await updateProduct(data.name, generatedSlug, id); 
      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'customer updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update customer. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.error("Failed to update customer", error);
    }
  };



  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      await deleteCustomer(id);
      window.location.href = `/customers/`;

    }
  };


  
  return (
    <div>

        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Customer</h1>
          <a
              href="#"
              className="w-sm text-left p-4 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200"
              onClick={(e) => {
                e.preventDefault(); // Mencegah navigasi
                handleDelete(id!); // Panggil fungsi handleDelete
              }}
            >
              Delete
          </a>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                id="name"
                {...register('name')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter Customer name"
              />
              {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>}
            </div>
            
            <button
              type="submit"
              className="w-sm text-left p-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? <span>Loading...</span> : 'Update Customer'}
            </button>


          </form>
        </div>


    </div>
  );
};

export default ProductEdit;
