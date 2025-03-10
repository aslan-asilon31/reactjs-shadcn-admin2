import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductCategorySecondList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', price: 0, description: '', category: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ title: '', price: 0, description: '', category: '', image: '' });
    } catch (err) {
      setError('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${id}`, editingProduct);
      setProducts(products.map(product => (product.id === id ? response.data : product)));
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Product Category Second List</p>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p>Loading...</p>}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Add New Product</h3>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="border p-2 mr-2"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border p-2 mr-2"
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border p-2 mr-2"
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="border p-2 mr-2"
            />
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="border p-2 mr-2"
            />
            <button onClick={createProduct} className="bg-blue-500 text-white p-2">Create Product</button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Product List</h3>
            <ul>
              {products.map(product => (
                <li key={product.id} className="border p-2 mb-2">
                  <div>
                    <strong>{product.title}</strong> - ${product.price}
                  </div>
                  <div>{product.description}</div>
                  <div>Category: {product.category}</div>
                  <div>Image: <img src={product.image} alt={product.title} className="w-10 h-10" /></div>
                  <button onClick={() => setEditingProduct(product)} className="bg-green-500 text-white p-1 mr-2">Edit</button>
                  <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-1">Delete</button>
                </li>
              ))}
            </ul>
          </div>
          {editingProduct && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <input
                type="text"
                name="title"
                value={editingProduct.title}
                onChange={handleEditInputChange}
                placeholder="Title"
                className="border p-2 mr-2"
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleEditInputChange}
                placeholder="Price"
                className="border p-2 mr-2"
              />
              <input
                type="text"
                name="description"
                value={editingProduct.description}
                onChange={handleEditInputChange}
                placeholder="Description"
                className="border p-2 mr-2"
              />
              <input
                type="text"
                name="category"
                value={editingProduct.category}
                onChange={handleEditInputChange}
                placeholder="Category"
                className="border p-2 mr-2"
              />
              <input
                type="text"
                name="image"
                value={editingProduct.image}
                onChange={handleEditInputChange}
                placeholder="Image URL"
                className="border p-2 mr-2"
              />
              <button onClick={() => updateProduct(editingProduct.id)} className="bg-blue-500 text-white p-2">Update Product</button>
              <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-2 ml-2">Cancel</button>
            </div>
          )}
        </div>
      </Main>
    </div>
  );
};

export default ProductCategorySecondList;
