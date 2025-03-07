import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import useProductStore from '@/stores/productStore';
import ProductFilter from '@/features/admin/contents/products/components/ProductFilter'; // Komponen filter


type ProductSearchSortOptions = 'newest' | 'oldest' | 'price';

type ProductSearch = {
  page: number;
  filter: string;
  createdBy: string;
  sort: ProductSearchSortOptions;
};



const ProductTable = () => {
  const { products,fetchProducts,fetchAdvanceSearch,setSelectedProductId } = useProductStore() as { products: Product; error: string | null };

  const [searchProduct, setSearchProduct] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSearchSortOptions>('newest');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    const createdByParam = params.get('created_by');
    const pageParam = params.get('page');
    const sortParam = params.get('sort');

    // Setel state berdasarkan parameter URL
    if (filterParam) setSearchProduct(filterParam);
    if (createdByParam) setCreatedBy(createdByParam);
    if (pageParam) setPage(Number(pageParam));
    if (sortParam) setSort(sortParam);

    fetchProducts()
    // Panggil fungsi pencarian dengan parameter yang diambil dari URL
    fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
  }, []);

  const handleEdit = async (productId: any) => {
    setSelectedProductId(productId);
    window.location.href = `/products/${productId}/edit/`;
  };

  return (
    <div>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Product List use material-react-table</p>
        </div>


        <div>

          <br />    
          <Button onClick={() => window.location.href = '/products/create'} className="text-white p-2 rounded">
              Add Product
          </Button>

          <table className="min-w-full border-collapse border border-gray-300">
               <ProductFilter 
                 searchProduct={searchProduct} 
                 setSearchProduct={setSearchProduct} 
                 createdBy={createdBy} 
                 setCreatedBy={setCreatedBy} 
                 setPage={setPage} 
                 setSort={setSort} 
               />
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Created By</th>
                <th className="border border-gray-300 p-2">Created At</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border border-gray-300">
                    <td className="text-center border border-gray-300 p-2  ">
                      <img className='w-16' src={product.image_url} alt=""  />
                    </td>
                    <td className="text-center border border-gray-300 p-2">{product.name ? product.name : '-'}</td>
                    <td className="text-center border border-gray-300 p-2">{product.created_by}</td>
                    <td className="text-center border border-gray-300 p-2">
                      {new Date(product.created_at).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long', // Menampilkan bulan dalam format huruf
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    
                    </td>
                    <td className="text-center border border-gray-300 p-2">
                      <button onClick={() => handleEdit(product.id)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-2 text-red-500 text-center">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
    </div>
  );
};

export default ProductTable;
