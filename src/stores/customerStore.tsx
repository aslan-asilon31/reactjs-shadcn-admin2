// store.js  
import { create } from 'zustand';
import Swal from 'sweetalert2';
import API from '@/api/MainApi';
import { z } from 'zod'

interface Customer {
  id: number;
  name: string;
}

interface CustomerStore {
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
  fetchAdvanceSearch: (filter: string, created_by: string, page: number, sort: string) => Promise<void>;
  storeCustomer: (customers: Customer) => Promise<void>;
  error: string | null;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string) => void;
}

const customerStore = create<CustomerStore>((set) => ({
  customers: [],  
  loading: false,  
  error: null,  
  selectedCustomerId: null,
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }), // Mengatur id yang dipilih


  fetchCustomers: async () => {  
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
        const response = await API.get('http://localhost:8000/api/customers', {
          params: {
            limit: 9, 
          },
        });
        set({ customers: response.data.data.data, loading: false });  
        console.log(response.data.data.data)
        // loadingAlert.close();
    } catch (error) {  
      set({ error: error.message, loading: false });  

      // loadingAlert.close();
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Failed to load data. Please try again.',
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      // });
    }  
  }, 
  
  fetchCustomerById: async (id: string) => {
    try {
      const response = await API.get(`http://127.0.0.1:8000/api/customers/${id}`);
      return response.data.data; // Mengembalikan data customer
    } catch (error) {
      set({ error: error.message });
      return null; // Mengembalikan null jika terjadi kesalahan
    }
  },

  fetchAdvanceSearch: async (filter: string, created_by: string, page: number, sort: string) => {
    try {

      const response = await API.get('http://127.0.0.1:8000/api/customer-advanceds/', {
        params: {
          filter: filter,
          created_by: created_by,
          page: page,
          sort: sort,
        },
      });
      set({ customers: response.data.data.data, loading: false });
    } catch (error) {
      set({ error: error.message });
      Swal.fire('Error', 'Failed to fetch customers with search parameters', 'error');
    }
  },
  

  storeCustomer: async (name: string , slug: string) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the customer.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });


      try {

          // Mengirim permintaan POST menggunakan Fetch API
          let resp = await fetch(`http://127.0.0.1:8000/api/customers/store`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, slug }), // Mengubah objek menjadi string JSON
          });

          // Memeriksa apakah permintaan berhasil
          if (resp.ok) { // Menggunakan resp.ok untuk memeriksa status
              const data = await resp.json(); // Mengambil data dari respons
              set((state) => ({ customers: [...state.customers, data] })); // Menambahkan produk ke state
              loadingAlert.close();

              Swal.fire({
                title: 'Success!',
                text: 'customer updated successfully.',
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
            text: 'Failed to update customer. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
  },

  updateCustomer: async (name: any,slug: any, id: number) => {
    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the customer.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await API.post(`http://127.0.0.1:8000/api/customers/update/${id}`,{
        name,
        slug
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response) {
        throw new Error('Failed to update customer');
      }

      const data = await response.json();
      // Update state or handle response as needed
      set((state) => ({
        customers: state.customers.map((customer) => (customer.id === id ? { ...customer, name, slug,id } : customer)),
      }));

      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'customer updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
    } catch (error) {
      set({ error: error.message });
      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update customer. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  },

  deleteCustomer: async (id: number) => {

    const loadingAlert = Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the customer.',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      await API.delete(`http://127.0.0.1:8000/api/customers/delete/${id}`);
      set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id),
      }));


      loadingAlert.close();

      Swal.fire({
        title: 'Success!',
        text: 'Customer updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      set({ error: 'Failed to delete Customer' });

      loadingAlert.close();
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Customer. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      
    }
  },




}));  
  
export default customerStore;  
