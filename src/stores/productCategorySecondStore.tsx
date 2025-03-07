// store.js  
import { create } from 'zustand';
import Swal from 'sweetalert2';
import API from '@/api/MainApi';
import { z } from 'zod'

interface ProductCategorySecond {
  id: number;
  name: string;
}

interface ProductCategorySecondStore {
  productcategoryseconds: ProductCategorySecond[];
  fetchProductCategorySeconds: () => Promise<void>;
  fetchAdvanceSearch: (filter: string, created_by: string, page: number, sort: string) => Promise<void>;
  storeProductCategorySecond: (productcategoryseconds: ProductCategorySecond) => Promise<void>;
  error: string | null;
  selectedProductCategorySecondId: string | null;
  setSelectedProductCategorySecondId: (id: string) => void;
}

const productCategorySecondStore = create<ProductCategorySecondStore>((set) => ({
  productcategoryseconds: [],  
  loading: false,  
  error: null,  
  selectedProductCategorySecondId: null,
  setSelectedProductId: (id) => set({ selectedProductCategorySecondId: id }), // Mengatur id yang dipilih


  fetchProductCategorySeconds: async () => {  
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
        const response = await API.get('http://localhost:8000/api/product-category-seconds', {
          params: {
            limit: 9, 
          },
        });
        set({ productcategoryseconds: response.data.data.data, loading: false });  
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
  
  fetchProductCategorySecondById: async (id: string) => {
    try {
      const response = await API.get(`http://127.0.0.1:8000/api/product-category-seconds/${id}`);
      return response.data.data; // Mengembalikan data product
    } catch (error) {
      set({ error: error.message });
      return null; // Mengembalikan null jika terjadi kesalahan
    }
  },

  fetchAdvanceSearch: async (filter: string, created_by: string, page: number, sort: string) => {
    try {

      const response = await API.get('http://127.0.0.1:8000/api/product-category-seconds-advanced/', {
        params: {
          filter: filter,
          created_by: created_by,
          page: page,
          sort: sort,
        },
      });
      set({ productcategoryseconds: response.data.data.data, loading: false });
    } catch (error) {
      set({ error: error.message });
      Swal.fire('Error', 'Failed to fetch products with search parameters', 'error');
    }
  },
  

  storeProductCategorySecond: async (name: string , slug: string) => {

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
          let resp = await fetch(`http://127.0.0.1:8000/api/product-category-seconds/store`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, slug }), // Mengubah objek menjadi string JSON
          });

          // Memeriksa apakah permintaan berhasil
          if (resp.ok) { // Menggunakan resp.ok untuk memeriksa status
              const data = await resp.json(); // Mengambil data dari respons
              set((state) => ({ productcategoryseconds: [...state.productcategoryseconds, data] })); // Menambahkan produk ke state
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

  updateProductCategorySecond: async (name: any,slug: any, id: number) => {
    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the product.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await API.post(`http://127.0.0.1:8000/api/product-category-seconds/update/${id}`,{
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
        productcategoryseconds: state.productcategoryseconds.map((productcategorysecond) => (productcategorysecond.id === id ? { ...productcategorysecond, name, slug,id } : productcategorysecond)),
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

  deleteProductCategorySecond: async (id: number) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the Product.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await API.delete(`http://127.0.0.1:8000/api/product-category-seconds/delete/${id}`);
      set((state) => ({
        productcategoryseconds: state.productcategoryseconds.filter((product) => product.id !== id),
      }));


      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'Product Category Second updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      set({ error: 'Failed to delete Product Category Second' });

      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Product Category Second. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      
    }
  },




}));  
  
export default productCategorySecondStore;  
