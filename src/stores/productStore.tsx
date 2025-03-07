// store.js  
import { create } from 'zustand';
import Swal from 'sweetalert2';
import API from '@/api/MainApi';
import { z } from 'zod'

interface Product {
  id: number;
  name: string;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
  fetchAdvanceSearch: (filter: string, created_by: string, page: number, sort: string) => Promise<void>;
  storeProduct: (products: Product) => Promise<void>;
  error: string | null;
  selectedProductId: string | null;
  setSelectedProductId: (id: string) => void;
}

const productStore = create<ProductStore>((set) => ({
  products: [],  
  loading: false,  
  error: null,  
  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }), // Mengatur id yang dipilih


  fetchProducts: async () => {  
    // const loadingAlert = Swal.fire({
    //   title: 'loading...',
    //   text: 'Please wait while we load data.',
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    
    try {  
        const response = await API.get('http://localhost:8000/api/products', {
          params: {
            limit: 9, 
          },
        });
        set({ products: response.data.data.data, loading: false });  
        // loadingAlert.close();
    } catch (error) {  
      set({ error: error.message, loading: false });  

      // loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }  
  }, 
  
  fetchProductById: async (id: string) => {
    try {
      const response = await API.get(`http://127.0.0.1:8000/api/products/${id}`);
      return response.data.data; // Mengembalikan data product
    } catch (error) {
      set({ error: error.message });
      return null; // Mengembalikan null jika terjadi kesalahan
    }
  },

  fetchAdvanceSearch: async (filter: string, created_by: string, page: number, sort: string) => {
    try {

      const response = await API.get('http://127.0.0.1:8000/api/products-advanced/', {
        params: {
          filter: filter,
          created_by: created_by,
          page: page,
          sort: sort,
        },
      });
      set({ products: response.data.data.data, loading: false });
    } catch (error) {
      set({ error: error.message });
      Swal.fire('Error', 'Failed to fetch products with search parameters', 'error');
    }
  },
  

  storeProduct: async (name: string , slug: string) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the product.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });


      try {

          // Mengirim permintaan POST menggunakan Fetch API
          let resp = await fetch(`http://127.0.0.1:8000/api/products/store`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, slug }), // Mengubah objek menjadi string JSON
          });

          // Memeriksa apakah permintaan berhasil
          if (resp.ok) { // Menggunakan resp.ok untuk memeriksa status
              const data = await resp.json(); // Mengambil data dari respons
              set((state) => ({ products: [...state.products, data] })); // Menambahkan produk ke state
              loadingAlert.close();

              Swal.fire({
                title: 'Success!',
                text: 'product updated successfully.',
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
            text: 'Failed to update product. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
  },

  updateProduct: async (name: any,slug: any, id: number) => {
    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the product.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await API.post(`http://127.0.0.1:8000/api/products/update/${id}`,{
        name,
        slug
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      // Update state or handle response as needed
      set((state) => ({
        products: state.products.map((product) => (product.id === id ? { ...product, name, slug,id } : product)),
      }));

      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'product updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
    } catch (error) {
      set({ error: error.message });
      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  },

  deleteProduct: async (id: number) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the Product.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await API.delete(`http://127.0.0.1:8000/api/products/delete/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));


      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      set({ error: 'Failed to delete Product' });

      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      
    }
  },




}));  
  
export default productStore;  
