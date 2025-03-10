import  { useState } from 'react';
import { Button } from "@/components/ui/button";
import useGeneralStore from '@/stores/generalStore';
import useCustomerStore from '@/stores/customerStore';
import CustomerModalForm from '@/features/admin/sales/customers/components/customer-modal';
import columnTitles from '../data/columnTitles';




export default function CustomerTable({customers}) {
  const { isModalOpen, openModal, closeModal, isLoading, setLoading } = useGeneralStore();
  const {fetchCustomers,fetchAdvanceSearch,setSelectedCustomerId } = useCustomerStore() as { customers: Customer; error: string | null };
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const handleEdit = async (customerId: string) => {
    try {
      const customerData = await useCustomerStore.getState().fetchCustomerById(customerId); // Ambil data pelanggan berdasarkan ID
      setSelectedCustomerData(customerData); // Simpan data pelanggan yang diambil
      console.log(customerData); // Tampilkan data pelanggan yang diambil
      setMode('edit');
      openModal(); // Buka modal
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
      // Anda bisa menambahkan penanganan error di sini, misalnya menampilkan pesan kesalahan
    }
  };

  return (
    <>
      <div className="border-spacing-2 bg-purple-300 m-4 p-8">
        <p className="text-2xl font-bold text-purple-800">Customer List</p>
  
        <Button onClick={openModal} className="text-white p-2 rounded bg-blue-500">
          Add New Customer
        </Button>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Add New Item</h2>
            <CustomerModalForm mode={mode} customerData={selectedCustomerData} closeModal={closeModal} openModal={openModal}/>
          </div>
        </div>
      )}

      <br />
      
      <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {Object.keys(columnTitles).map((key) => (
                  <th className="text-xs border border-gray-300 whitespace-nowrap px-2" key={key}>{columnTitles[key]}</th>
                ))}
                <th >Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="border border-gray-300">
                    <td className="border border-gray-300 p-2 text-xs">{customer.id}</td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.first_name}</td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.last_name}</td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.phone}</td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.email}</td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.is_activated ? 'active': 'inactive'} </td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.created_by}</td>
                    <td className="border border-gray-300 p-2 text-xs">{customer.updated_by}</td>
                    <td className="border border-gray-300 p-2 text-xs">
                      {new Date(customer.created_at).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long', // Menampilkan bulan dalam format huruf
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="border border-gray-300 p-2 text-xs">
                      {new Date(customer.updated_at).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long', // Menampilkan bulan dalam format huruf
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="border border-gray-300 p-2 text-xs">
                      <button onClick={() => handleEdit(customer.id)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-2 text-red-500 text-center">
                    No brands available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </>
  );

};




