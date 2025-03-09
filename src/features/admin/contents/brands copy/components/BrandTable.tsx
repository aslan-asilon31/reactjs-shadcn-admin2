import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import useBrandStore from '@/stores/brandStore';
import BrandFilter from '@/features/admin/contents/brands/components/BrandFilter'; // Komponen filter


type BrandSearchSortOptions = 'newest' | 'oldest' | 'price';

type BrandSearch = {
  page: number;
  filter: string;
  createdBy: string;
  sort: BrandSearchSortOptions;
};



const BrandTable = () => {
  const { brands,fetchBrands,fetchAdvanceSearch,setSelectedBrandId } = useBrandStore() as { brands: Brand; error: string | null };

  const [searchBrand, setSearchBrand] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<BrandSearchSortOptions>('newest');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    const createdByParam = params.get('created_by');
    const pageParam = params.get('page');
    const sortParam = params.get('sort');

    // Setel state berdasarkan parameter URL
    if (filterParam) setSearchBrand(filterParam);
    if (createdByParam) setCreatedBy(createdByParam);
    if (pageParam) setPage(Number(pageParam));
    if (sortParam) setSort(sortParam);

    fetchBrands()
    // Panggil fungsi pencarian dengan parameter yang diambil dari URL
    fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
  }, []);

  const handleEdit = async (brandId: any) => {
    setSelectedBrandId(brandId);
    window.location.href = `/brands/${brandId}/edit/`;
  };

  return (
    <div>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Brand List</p>
        </div>


        <div>

          <br />    
          <Button onClick={() => window.location.href = '/brands/create'} className="text-white p-2 rounded">
              Add brand
          </Button>

          <table className="min-w-full border-collapse border border-gray-300">
               <BrandFilter 
                 searchBrand={searchBrand} 
                 setSearchBrand={setSearchBrand} 
                 createdBy={createdBy} 
                 setCreatedBy={setCreatedBy} 
                 setPage={setPage} 
                 setSort={setSort} 
               />
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Desc</th>
                <th className="border border-gray-300 p-2">Created By</th>
                <th className="border border-gray-300 p-2">Created At</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <tr key={brand.id} className="border border-gray-300">
                    <td className="text-center border border-gray-300 p-2  ">
                      <img className='w-16' src={brand.image_url} alt=""  />
                    </td>
                    <td className="text-center border border-gray-300 p-2">{brand.name ? brand.name : '-'}</td>
                    <td className="text-center border border-gray-300 p-2">
                      {brand.desc ? brand.desc : '-'}
                    </td>
                    <td className="text-center border border-gray-300 p-2">{brand.created_by}</td>
                    <td className="text-center border border-gray-300 p-2">
                      {new Date(brand.created_at).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long', // Menampilkan bulan dalam format huruf
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    
                    </td>
                    <td className="text-center border border-gray-300 p-2">
                      <button onClick={() => handleEdit(brand.id)}>Edit</button>
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


        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
    </div>
  );
};

export default BrandTable;
