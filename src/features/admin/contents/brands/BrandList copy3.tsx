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
  const { brands, fetchBrands,fetchAdvanceSearch } = useBrandStore();
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


    if (filterParam) setFilter(filterParam);
    if (createdByParam) setCreatedBy(createdByParam);
    if (pageParam) setPage(Number(pageParam));
    if (sortParam) setSort(sortParam);
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
      sort: 'newest', // Assuming you have a sort option state
    };
  
    fetchAdvanceSearch(searchParams.filter, searchParams.created_by, searchParams.page, searchParams.sort);
  };
  

  const handleSortChange = (newSort: ProductSearchSortOptions) => {
    setSort(newSort);
  };

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <h3>Advanced Search</h3>
          <div >
            <input
              type="text"
              placeholder="Search brand..."
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            />
            <input
              type="text"
              placeholder="Created by..."
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <div >
            <label>Sort by:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

        </div>

        <div>
          <h1>Brand List</h1>
          <ul >
          {brands.length > 0 ? (
              brands.map((brand) => (
                <li key={brand.id} className="text-green-600">
                  {brand.name} - Created by: {brand.created_by} 
                </li> 
                
              ))
            ) : (
              <li className="text-red-500">No brands available.</li> 
            )} <br />
          </ul>
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
