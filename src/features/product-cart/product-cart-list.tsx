import axios from 'axios';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductCartList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  // Handle form submission for creating or updating a product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && formData) {
      // Update product
      await axios.put(`https://fakestoreapi.com/products/${formData.id}`, formData);
    } else {
      // Create new product
      await axios.post('https://fakestoreapi.com/products', formData);
    }
    setFormData(null);
    setIsEditing(false);
    // Refresh product list
    const response = await axios.get('https://fakestoreapi.com/products');
    setProducts(response.data);
  };

  // Handle edit button click
  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
  };

  // Handle delete button click
  const handleDelete = async (id: number) => {
    await axios.delete(`https://fakestoreapi.com/products/${id}`);
    // Refresh product list
    const response = await axios.get('https://fakestoreapi.com/products');
    setProducts(response.data);
  };

  return (
    <div>
      <h1>Product Cart List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData?.title || ''}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData?.price || ''}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData?.description || ''}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={formData?.category || ''}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={formData?.image || ''}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
