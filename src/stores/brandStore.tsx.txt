// store.js  
import axios from 'axios';
import { create } from 'zustand';
  

interface Brand {
  id: number;
  name: string;
}

interface brandStore {
  brands: Brand[];
  fetchBrands: () => Promise<void>;
  storeBrand: (brands: Brand) => Promise<void>;
  error: string | null;
}

const brandStore = create((set) => ({  
  brands: [],  
  loading: false,  
  error: null,  
  

  fetchBrands: async () => {  
    set({ loading: true });  
    try {  
        const response = await axios.get('http://localhost:8000/api/product-brands', {
          params: {
            limit: 9, 
          },
        });
        set({ brands: response.data, loading: false });  
    } catch (error) {  
      set({ error: error.message, loading: false });  
    }  
  },  
  

  storeBrand: async (brand) => {
    try {
        // Ambil token CSRF dari meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        // Mengirim permintaan POST menggunakan Fetch API
        let resp = await fetch(`http://127.0.0.1:8000/api/product-brands/store`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken, // Menambahkan token CSRF
            },
            body: JSON.stringify(brand), // Mengubah objek produk menjadi string JSON
        });

        // Memeriksa apakah permintaan berhasil
        if (resp.status == 200) {
            const data = await resp.json(); // Mengambil data dari respons
            set((state) => ({ brands: [...state.brands, data] })); // Menambahkan produk ke state

            // Menampilkan alert bahwa data berhasil dimasukkan
            alert("Data berhasil dimasukkan!");
        } else {
            // Menangani kesalahan jika permintaan tidak berhasil
            const errorData = await resp.json();
            alert(`Error: ${errorData.message || "Terjadi kesalahan!"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim data!");
    }
  },


  




}));  
  
export default brandStore;  
