// store.js  
import { create } from 'zustand';
import Swal from 'sweetalert2';
import API from '@/api/MainApi';
import { z } from 'zod'

interface Marketplace {
  id: number;
  name: string;
}

interface MarketplaceStore {
  marketplaces: Marketplace[];
  fetchMarketplaces: () => Promise<void>;
  fetchAdvanceSearch: (filter: string, created_by: string, page: number, sort: string) => Promise<void>;
  storeMarketplace: (marketplaces: Marketplace) => Promise<void>;
  error: string | null;
  selectedMarketplaceId: string | null;
  setSelectedMarketplaceId: (id: string) => void;
}

const marketplaceStore = create<MarketplaceStore>((set) => ({
  marketplaces: [],  
  loading: false,  
  error: null,  
  selectedMarketplaceId: null,
  setSelectedMarketplaceId: (id) => set({ selectedMarketplaceId: id }), // Mengatur id yang dipilih


  fetchMarketplaces: async () => {  
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
        const response = await API.get('http://localhost:8000/api/marketplaces', {
          params: {
            limit: 9, 
          },
        });
        set({ marketplaces: response.data.data.data, loading: false });  
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
  
  fetchMarketplaceById: async (id: string) => {
    try {
      const response = await API.get(`http://127.0.0.1:8000/api/marketplaces/${id}`);
      return response.data.data; // Mengembalikan data marketplace
    } catch (error) {
      set({ error: error.message });
      return null; // Mengembalikan null jika terjadi kesalahan
    }
  },

  fetchAdvanceSearch: async (filter: string, created_by: string, page: number, sort: string) => {
    try {

      const response = await API.get('http://127.0.0.1:8000/api/marketplace-advanceds/', {
        params: {
          filter: filter,
          created_by: created_by,
          page: page,
          sort: sort,
        },
      });
      set({ marketplaces: response.data.data.data, loading: false });
    } catch (error) {
      set({ error: error.message });
      Swal.fire('Error', 'Failed to fetch marketplaces with search parameters', 'error');
    }
  },
  

  storeMarketplace: async (name: string , slug: string) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the marketplace.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });


      try {

          // Mengirim permintaan POST menggunakan Fetch API
          let resp = await fetch(`http://127.0.0.1:8000/api/marketplaces/store`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, slug }), // Mengubah objek menjadi string JSON
          });

          // Memeriksa apakah permintaan berhasil
          if (resp.ok) { // Menggunakan resp.ok untuk memeriksa status
              const data = await resp.json(); // Mengambil data dari respons
              set((state) => ({ marketplaces: [...state.marketplaces, data] })); // Menambahkan produk ke state
              loadingAlert.close();

              Swal.fire({
                title: 'Success!',
                text: 'marketplace updated successfully.',
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
            text: 'Failed to update marketplace. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
  },

  updateMarketplace: async (name: any,slug: any, id: number) => {
    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the marketplace.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await API.post(`http://127.0.0.1:8000/api/marketplaces/update/${id}`,{
        name,
        slug
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response) {
        throw new Error('Failed to update marketplace');
      }

      const data = await response.json();
      // Update state or handle response as needed
      set((state) => ({
        marketplaces: state.marketplaces.map((marketplace) => (marketplace.id === id ? { ...marketplace, name, slug,id } : marketplace)),
      }));

      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'marketplace updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
    } catch (error) {
      set({ error: error.message });
      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update marketplace. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  },

  deleteMarketplace: async (id: number) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the marketplace.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await API.delete(`http://127.0.0.1:8000/api/marketplaces/delete/${id}`);
      set((state) => ({
        marketplaces: state.marketplaces.filter((marketplace) => marketplace.id !== id),
      }));


      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'marketplace updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      set({ error: 'Failed to delete marketplace' });

      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update marketplace. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      
    }
  },




}));  
  
export default marketplaceStore;  
