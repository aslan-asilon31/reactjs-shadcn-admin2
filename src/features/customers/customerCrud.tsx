import LoadingSpinner from '@/components/loading-spinner1.gif';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import './styles/customerCrud.css';


interface Customer {
    id?: number;
    name: string;
    selling_price: number;
    is_activated: number;
}

const customerSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    selling_price: z.number().min(0, "selling_price must be a positive number"),
    is_activated: z.number().int().min(0).max(1, "is activated must be check or uncheck"),
});


const customerCrud: React.FC = () => {
    const [customer, setCustomer] = useState<Customer>({ name: '', selling_price: 0, is_activated: 1 });
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get('id');

        if (id) {
            setIsEditing(true);

            const fetchCustomer = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`http://localhost:8000/api/customers`);
                    setCustomer(response.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    setError('Failed to fetch customer data');
                } finally {
                    setLoading(false);
                }
            };

            fetchCustomer();
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);


        // Validate checkbox state
        if (customer.is_activated === undefined) {
            setError('Please check the box if you want to process');
            setLoading(false);
            return;
        }

        // Convert boolean to 1 or 0
        const customerData = {
            ...customer,
            is_activated: customer.is_activated ? 1 : 0, // Convert to 1 or 0
        };
            customerSchema.parse(customer); // This will throw an error if validation fails

        try {

            
            if (isEditing) {
                await axios.put(`http://localhost:8000/api/customers/${customer.id}`, customerData);
            } else {
                await axios.post('http://localhost:8000/api/customers/store', customerData);
            }
            // Redirect back to the list page after success
            // window.location.href = '/customers';
        } catch (err) {
            setError('Failed to save customer data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src={LoadingSpinner} alt="Loading..." className="w-24 h-24" />
            </div>
        );
    }

    return (
        <div>
            <div className="form-container ">
                <h1 className="form-title">{isEditing ? 'Edit Customer' : 'Add Customer'}</h1>
                {error && <p className="error-message">Error: {error}</p>}
                <form onSubmit={handleSubmit} className="customer-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter customer name"
                            value={customer.name}
                            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selling_price" className="form-label">selling_price</label>
                        <input
                            type="number"
                            id="selling_price"
                            placeholder="Enter selling_price"
                            value={customer.selling_price}
                            onChange={(e) => setCustomer({ ...customer, selling_price: Number(e.target.value) })}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="is_activated" className="form-label">Is Activated</label>
                        <input
                            type="checkbox"
                            id="is_activated"
                            checked={customer.is_activated === 1}
                            onChange={(e) => setCustomer({ ...customer, is_activated: e.target.checked ? 1 : 0 })}
                            className="form-checkbox"
                        />
                    </div>
                    <Button type="submit" className="submit-button">
                        {isEditing ? 'Update Customer' : 'Add Customer'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default customerCrud;
