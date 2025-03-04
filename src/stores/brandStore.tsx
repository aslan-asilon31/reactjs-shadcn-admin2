// store.js  
import axios from 'axios';
import { create } from 'zustand';
import Swal from 'sweetalert2';
  

interface Brand {
  id: number;
  name: string;
}

interface BrandStore {
  brands: Brand[];
  fetchBrands: () => Promise<void>;
  storeBrand: (brands: Brand) => Promise<void>;
  error: string | null;
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string) => void;
}

const brandStore = create<BrandStore>((set) => ({
  brands: [],  
  loading: false,  
  error: null,  
  selectedBrandId: null,
  setSelectedBrandId: (id) => set({ selectedBrandId: id }), // Mengatur id yang dipilih




  fetchBrands: async () => {  
    const loadingAlert = Swal.fire({
      title: 'loading...',
      text: 'Please wait while we load data.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {  
        const response = await axios.get('http://localhost:8000/api/product-brands', {
          params: {
            limit: 9, 
          },
        });
        set({ brands: response.data.data.data, loading: false });  
        loadingAlert.close();
    } catch (error) {  
      set({ error: error.message, loading: false });  

      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }  
  }, 
  
  fetchBrandById: async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/product-brands/${id}`);
      return response.data.data; // Mengembalikan data brand
    } catch (error) {
      set({ error: error.message });
      return null; // Mengembalikan null jika terjadi kesalahan
    }
  },
  

  storeBrand: async (name: string , slug: string) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the brand.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });


      try {

          // Mengirim permintaan POST menggunakan Fetch API
          let resp = await fetch(`http://127.0.0.1:8000/api/product-brands/store`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, slug }), // Mengubah objek menjadi string JSON
          });

          // Memeriksa apakah permintaan berhasil
          if (resp.ok) { // Menggunakan resp.ok untuk memeriksa status
              const data = await resp.json(); // Mengambil data dari respons
              set((state) => ({ brands: [...state.brands, data] })); // Menambahkan produk ke state
              loadingAlert.close();

              Swal.fire({
                title: 'Success!',
                text: 'Brand updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
              });

          } else {
              // Menangani kesalahan jika permintaan tidak berhasil
              const errorData = await resp.json();
          }
      } catch (error) {
          console.error("Error:", error);
          loadingAlert.close();
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update brand. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
  },

  updateBrand: async (name: any,slug: any, id: number) => {
    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the brand.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/product-brands/update/${id}`,{
        name,
        slug
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response) {
        throw new Error('Failed to update brand');
      }

      const data = await response.json();
      // Update state or handle response as needed
      set((state) => ({
        brands: state.brands.map((brand) => (brand.id === id ? { ...brand, name, slug,id } : brand)),
      }));

      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'Brand updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
    } catch (error) {
      set({ error: error.message });
      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update brand. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  },

  deleteBrand: async (id: number) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the brand.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product-brands/delete/${id}`);
      set((state) => ({
        brands: state.brands.filter((brand) => brand.id !== id),
      }));


      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'Brand updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      set({ error: 'Failed to delete brand' });

      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update brand. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      
    }
  },




}));  
  
export default brandStore;  
