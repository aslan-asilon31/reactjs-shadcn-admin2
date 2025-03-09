import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from "@/components/ui/button";
import useBrandStore from '@/stores/brandStore';

type ProductSearchSortOptions = 'newest' | 'oldest' | 'price';

type ProductSearch = {
  page: number;
  filter: string;
  createdBy: string;
  sort: ProductSearchSortOptions;
};

const BrandList = () => {
  const { brands, fetchBrands,fetchAdvanceSearch, error, setSelectedBrandId } = useBrandStore() as { brands: Brand; error: string | null };
  const [searchBrand, setSearchBrand] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSearchSortOptions>('newest');
  const [filter, setFilter] = useState('');

  // Membaca parameter dari URL saat komponen dimuat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    const createdByParam = params.get('created_by');
    const pageParam = params.get('page');
    const sortParam = params.get('sort');


    // if (filterParam) setFilter(filterParam);
    // if (createdByParam) setCreatedBy(createdByParam);
    // if (pageParam) setPage(Number(pageParam));
    // if (sortParam) setSort(sortParam);


    if (filterParam) {
      setFilter(filterParam);
    }
    if (createdByParam) {
      setCreatedBy(createdByParam);
    }
    if (pageParam) {
      setPage(Number(pageParam));
    }
    if (sortParam) {
      setSort(sortParam as ProductSearchSortOptions);
    }

    fetchAdvanceSearch(filterParam || '', createdByParam || '', Number(pageParam) || 1, sortParam || 'newest');


  }, []);

  // Memperbarui URL tanpa memuat ulang halaman


  // useEffect(() => {

  //   // Fetch brands when the component mounts or when search parameters change
  //   fetchBrands();
  //   // Update URL parameters
  //   const params = new URLSearchParams(window.location.search);
  //   params.set('filter', searchBrand);
  //   params.set('created_by', createdBy);
  //   params.set('page', page.toString());
  //   params.set('sort', sort);
  //   window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  // }, [searchBrand, createdBy, page, sort, fetchBrands]);

  const handleSearch = () => {
    const searchParams = {
      filter: searchBrand,
      created_by: createdBy,
      page: page,
      sort: sort, // Assuming you have a sort option state
    };
  
    fetchAdvanceSearch(searchParams.filter, searchParams.created_by, searchParams.page, searchParams.sort);
  };
  

  const handleSortChange = (newSort: ProductSearchSortOptions) => {
    setSort(newSort);
  };

  const handleEdit = async (brandId: any) => {
    setSelectedBrandId(brandId);
    window.location.href = `/brands/${brandId}/edit/`;
  };

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>


        <div>
          <h1>Brand List</h1>

          <br />    
          <Button onClick={() => window.location.href = '/brands/create'} className="text-white p-2 rounded">
              Add brand
          </Button>

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-300">
                <th className="border border-gray-300 p-2" colSpan={4}>
                  <div >
                    <Button onClick={handleSearch}>Advanced Search</Button>
                  </div>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Search brand..."
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Created by..."
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="border border-gray-300 p-2">          <div >
                  <label>Sort by:</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
                </th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Created By</th>
                <th className="border border-gray-300 p-2">Created At</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <tr key={brand.id} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">{brand.name}</td>
                    <td className="border border-gray-300 p-2">{brand.created_by}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(brand.created_at).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long', // Menampilkan bulan dalam format huruf
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    
                    </td>
                    <td className="border border-gray-300 p-2">
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
      </Main>
    </div>
  );
};

export default BrandList;
