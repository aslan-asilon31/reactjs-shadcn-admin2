import useBrandStore from '@/stores/brandStore';
import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
// Definisi interface untuk Brand
interface Brand {
  id?: number;
  name: string;
}

// Definisi schema Zod untuk validasi
const brandSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

const BrandEdit = () => {
  const { id } = useParams({ strict: false }); // Mengambil id dari URL
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Brand>({
    resolver: zodResolver(brandSchema),
  });
  const [loading, setLoading] = useState(false);
  const deleteBrand = useBrandStore((state) => state.deleteBrand); // Mengambil fungsi updateBrand dari Zustand
  const updateBrand = useBrandStore((state) => state.updateBrand); // Mengambil fungsi updateBrand dari Zustand
  const fetchBrandById = useBrandStore((state) => state.fetchBrandById); // Mengambil fungsi updateBrand dari Zustand

  
    
  // Mengambil data brand berdasarkan ID
  const fetchBrandData = async () => {
    try {
      const brandData = await fetchBrandById(id); // Mengambil data brand
      if (brandData) {
        setValue('name', brandData.name); // Mengisi form dengan data yang diambil
      }
    } catch (error) {
      console.error("Failed to fetch brand data", error);
    }
  };

  useEffect(() => {
    fetchBrandData(); // Memanggil fungsi untuk mengambil data saat komponen dimuat
  }, [id]);

  const onSubmit = async (data: Brand) => {

    const generatedSlug = data.name.toLowerCase().trim().replace(/\s+/g, '-'); 


    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the brand.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await updateBrand(data.name, generatedSlug, id); 
      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'Brand updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update brand. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.error("Failed to update brand", error);
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
      await deleteBrand(id);
      window.location.href = `/brands/`;

    }
  };


  
  return (
    <div>

        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Brand</h1>
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
                placeholder="Enter brand name"
              />
              {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>}
            </div>
            
            <button
              type="submit"
              className="w-sm text-left p-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? <span>Loading...</span> : 'Update Brand'}
            </button>


          </form>
        </div>


    </div>
  );
};

export default BrandEdit;
