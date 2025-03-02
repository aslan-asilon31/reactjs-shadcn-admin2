// store.js  
import axios from 'axios';
import { create } from 'zustand';
  

interface Product {
  id?: string; 
  product_category_first_id: string;
  product_brand_id: string;
  name: string;
  selling_price: number;
  discount_persentage: number;
  discount_value: number;
  availability: number;
}

interface ProductStore {
  products: Product[];
  fetchProductById: (id: string) => Promise<Product | null>;
  fetchProducts: () => Promise<void>;
  storeProduct: (product: Product) => Promise<void>;
  updateProduct: () => Promise<void>;
  deleteProduct: () => Promise<void>;
  error: string | null;
}

interface UpdateProductPayload {
  id: number; // or string, depending on your use case
  updatedData: Product; // Assuming Product is your existing type
}

const productStore = create((set) => ({  
  products: [],  
  loading: false,  
  error: null,  
  
  updateProduct: (id: number, updatedProduct: UpdateProductPayload) => Promise<void>;

  fetchProductById: async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}`);
      console.log(response.data); // Log the API response
      // Ensure that you're returning the first item if the response is an array
      return Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },
  
  
  fetchProducts: async () => {  
    set({ loading: true });  
    try {  
        const response = await axios.get('http://localhost:8000/api/products', {
          params: {
            limit: 9, 
          },
        });
        set({ products: response.data, loading: false });  // Set the products to the data key in the response
    } catch (error) {
      set({ error: error.message, loading: false });  
    }
  },
  
  storeProduct: async (product: Product) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Ambil token CSRF

    try {
      const response = await axios.post(
        'http://localhost:8000/api/products/store', // Ganti dengan URL API yang sesuai
        product,
        {
          headers: {
            "X-CSRF-TOKEN": csrfToken,  // Menambahkan token CSRF
          },
        }
      );

      // Jika berhasil, tambahkan produk baru ke state
      set((state) => ({
        products: [...state.products, response.data], // Asumsikan response.data adalah produk yang baru ditambahkan
        error: null,
      }));
    } catch (err) {
      // Tangani kesalahan
      set({ error: 'Failed to create product' });
      console.error('Error creating product:', err);
    }
  },

  updateProduct: async (id: number, updatedProduct: UpdateProductPayload) => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Get CSRF token
      try {
          const response = await axios.put(
              `http://localhost:8000/api/products/update/${id}`,
              updatedProduct,
              {
                  headers: {
                      "X-CSRF-TOKEN": csrfToken,  // Add CSRF token
                  },
              }
          );
          return response.data; // Return the response data or a success message
      } catch (error) {
          console.error("Error updating product:", error);
          throw error; // Optionally throw the error to handle it in the calling function
      }
  },



  // updateProduct: async (id: any, updatedProduct: any) => {
  //   const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Ambil token CSRF
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8000/api/products/update/${id}`,
  //       updatedProduct,
  //       {
  //         headers: {
  //           "X-CSRF-TOKEN": csrfToken,  // Menambahkan token CSRF
  //         },
  //       }
  //     );
  //     set((state: { products: any[]; }) => ({
  //       products: state.products.map((product: { id: any; }) =>
  //         product.id === id ? { ...product, ...response.data.data } : product
  //       ),
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  

  // Fungsi untuk menghapus produk
  deleteProduct: async (id: any) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Ambil token CSRF
    try {
      await axios.delete(`http://localhost:8000/api/products/delete/${id}`, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,  // Menambahkan token CSRF
        },
      });
      set((state: { products: any[]; }) => ({
        products: state.products.filter((product: { id: any; }) => product.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  




}));  
  
export default productStore;  
