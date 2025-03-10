// store.js  
import { create } from 'zustand';
import Swal from 'sweetalert2';
import API from '@/api/MainApi';
import { z } from 'zod'
import axios from 'axios';

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

      const response = await API.get('http://127.0.0.1:8000/api/customer-advanced/', {
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

  
  storeCustomer: async (data: Customer) => {
    // Menampilkan loading alert
    const loadingAlert = Swal.fire({
        title: 'Adding...',
        text: 'Please wait while we add the customer.',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

    // Mengirim permintaan POST menggunakan Axios
    alert(data);

    axios.post('http://127.0.0.1:8000/api/customers/store', data)
        .then((resp) => {
            // Memeriksa apakah permintaan berhasil
            if (resp.status === 200) {
                // Menampilkan notifikasi sukses
                Swal.fire({
                    title: 'Success!',
                    text: 'Customer added successfully.',
                    icon: 'success',
                });
            } else {
                // Menampilkan notifikasi error
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add customer.',
                    icon: 'error',
                });
            }
        })
        .catch((error) => {
            // Menampilkan notifikasi error jika terjadi kesalahan
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while adding the customer.',
                icon: 'error',
            });
        })
        .finally(() => {
            // Menutup loading alert
            Swal.close();
        });
},

  updateCustomer: async (id: string, data: Customer) => {
    alert('halooo update');

    // Menampilkan loading alert
    const loadingAlert = Swal.fire({
        title: 'Updating...',
        text: 'Please wait while we update the customer.',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

    // Mengirim permintaan POST menggunakan Axios
    await API.post(`http://127.0.0.1:8000/api/customers/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json', // Pastikan header ini benar
        },
    })
    .then((response) => {
        // Menutup loading alert
        Swal.close();

        // Memeriksa apakah permintaan berhasil
        if (response.status === 200) {
            Swal.fire('Success', 'Customer updated successfully!', 'success');
        } else {
            Swal.fire('Error', 'Failed to update customer.', 'error');
        }
    })
    .catch((error) => {
        // Menutup loading alert
        Swal.close();

        // Menampilkan pesan kesalahan
        Swal.fire('Error', 'An error occurred while updating the customer.', 'error');
        console.error('Error updating customer:', error);
    });
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
