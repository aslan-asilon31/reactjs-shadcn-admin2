import LoadingSpinner from '@/components/loading-spinner1.gif';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";


interface Customer {
    id?: number;
    name: string;
    selling_price: string;
    is_activated: string;

}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCustomer, setNewCustomer] = useState<Customer>({ name: '', selling_price: 0, is_activated: 1 });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
      const fetchCustomers = async () => {
          setLoading(true);
          setError(null);
          try {
              const response = await axios.get('http://localhost:8000/api/customers');
              // Access the customer data correctly              
              const customerData = response.data.data.data; // Adjusted to access the array
              setCustomers(customerData);


          } catch (err) {
              setError('Failed to fetch customers');
          } finally {
              setLoading(false);
          }
      };

      fetchCustomers();
  }, []);


  const handleNavigate = async () => {
    try {
        window.location.href = 'http://localhost:5174/tasks';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};




  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={LoadingSpinner} alt="Loading..." className="w-24 h-24" />
        </div>
    );
}
  if (error) return <p>Error: {error}</p>;


  const handleCreateCustomer = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('http://localhost:8000/api/customers/', newCustomer);
        setCustomers([...customers, response.data.data.data]); // Assuming the response contains the created customer
        setNewCustomer({ name: '', selling_price: 0, is_activated: 1 }); // Reset form
        
      } catch (err) {
          setError('Failed to create customer');
      } finally {
          setLoading(false);
      }
  };

const handleEditCustomer = async (customer: Customer) => {
    setEditingCustomer(customer);
    setNewCustomer(customer); // Populate form with customer data
};

const handleUpdateCustomer = async () => {
    if (editingCustomer) {
        try {
            const response = await axios.put(`http://localhost:8000/api/customers/${editingCustomer.id}`, newCustomer);
            setCustomers(customers.map(c => (c.id === editingCustomer.id ? response.data.data : c))); // Update the customer in the list
            setEditingCustomer(null); // Clear editing state
            setNewCustomer({ name: '', selling_price: 0, is_activated: 1 }); // Reset form
        } catch (err) {
            setError('Failed to update customer');
        }
    }
};


    const handleEdit = (customer: Customer) => {
        // Navigasi ke halaman form dengan data pelanggan yang dipilih
        window.location.href = `/customers/customerCrud?id=${customer.id}`;
    };

    const handleDeleteCustomer = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8000/api/customers/${id}`);
            setCustomers(customers.filter(customer => customer.id !== id)); 

            

            setLoading(false);
        } catch (err) {
            setError('Failed to delete customer');
        }
    };


    return (
      <div>
          <h1>Customers</h1>

          <div className="mx-auto">
                <Button onClick={handleNavigate} className=" text-white p-2 rounded">
                    Go to Tasks
                </Button>

                <Button onClick={() => window.location.href = '/customers/customerCrud'} className="text-white p-2 rounded">
                    Add Customer
                </Button>
            {error && <p>Error: {error}</p>}


                    <DataTable columns={columns} data={customers} />




          </div>


<hr />


      </div>
    );
};

export default Customers;
function setToast(arg0: { title: string; description: string; }) {
  throw new Error('Function not implemented.');
}

