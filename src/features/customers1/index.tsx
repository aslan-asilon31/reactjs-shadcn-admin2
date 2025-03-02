import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/loading-spinner1.gif'; 
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Customer {
    id?: number;
    name: string;
    balance: number;
    is_activated: number;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCustomer, setNewCustomer] = useState<Customer>({ name: '', balance: 0, is_activated: 1 });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
      const fetchCustomers = async () => {
          setLoading(true);
          setError(null);
          try {
              const response = await axios.get('http://localhost:8004/api/customers');
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
        const response = await axios.post('http://localhost:8004/api/customers/', newCustomer);
        setCustomers([...customers, response.data.data]); // Assuming the response contains the created customer
        setNewCustomer({ name: '', balance: 0, is_activated: 1 }); // Reset form
        
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
            const response = await axios.put(`http://localhost:8004/api/customers/${editingCustomer.id}`, newCustomer);
            setCustomers(customers.map(c => (c.id === editingCustomer.id ? response.data.data : c))); // Update the customer in the list
            setEditingCustomer(null); // Clear editing state
            setNewCustomer({ name: '', balance: 0, is_activated: 1 }); // Reset form
        } catch (err) {
            setError('Failed to update customer');
        }
    }
};

const handleDeleteCustomer = async (id: string) => {
    try {
        await axios.delete(`http://localhost:8004/api/customers/${id}`);
        setCustomers(customers.filter(customer => customer.id !== id)); // Remove the deleted customer from the list
    } catch (err) {
        setError('Failed to delete customer');
    }
};


    return (
      <div>
          <h1>Customers</h1>
          <Button onClick={handleNavigate} className=" text-white p-2 rounded">
            Go to Tasks
          </Button>
          {error && <p>Error: {error}</p>}
          <div>
              <input
                  type="text"
                  placeholder="Name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
              <input
                  type="number"
                  placeholder="Balance"
                  value={newCustomer.balance}
                  onChange={(e) => setNewCustomer({ ...newCustomer, balance: Number(e.target.value) })}
              />
              <Button onClick={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}>
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
              </Button>
          </div>

          <Table>
      <TableCaption>A list of your customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map(customer => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.balance}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleEditCustomer(customer)}>Edit</Button>
              <Button onClick={() => handleDeleteCustomer(customer.id!)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
          </Table>


<hr />


          {/* <ul>
              {customers.map(customer => (
                  <li key={customer.id}>
                      {customer.name} - Balance: {customer.balance}
                      <Button onClick={() => handleEditCustomer(customer)}>Edit</Button>
                      <Button onClick={() => handleDeleteCustomer(customer.id!)}>Delete</Button>
                  </li>
              ))}
          </ul> */}
      </div>
    );
};

export default Customers;
function setToast(arg0: { title: string; description: string; }) {
  throw new Error('Function not implemented.');
}

