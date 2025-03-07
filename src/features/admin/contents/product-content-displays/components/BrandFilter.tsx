import useBrandStore from '@/stores/brandStore';
import React, { useEffect,useState  } from 'react';
import { Button } from "@/components/ui/button";


type BrandSearchSortOptions = 'newest' | 'oldest' | 'price';

type BrandSearch = {
  page: number;
  filter: string;
  createdBy: string;
  sort: BrandSearchSortOptions;
};



const BrandFilter = ({ searchBrand, setSearchBrand, createdBy, setCreatedBy }) => {

  const { fetchAdvanceSearch,setSelectedBrandId  } = useBrandStore() as { brands: Brand; error: string | null };
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<BrandSearchSortOptions>('newest');

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

    // Panggil fungsi pencarian dengan parameter yang diambil dari URL
    fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
  }, []);


  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    // Memperbarui URL dengan parameter baru
    const params = new URLSearchParams();
    params.set('filter', searchBrand);
    params.set('created_by', createdBy);
    params.set('page', page);
    params.set('sort', sort);

    // Memperbarui URL tanpa memuat ulang halaman
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Panggil fungsi pencarian
    fetchAdvanceSearch(searchBrand, createdBy, page, sort);
  };

    // Fungsi untuk menghapus filter
    const clearFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get('');
      const createdByParam = params.get('');
      const pageParam = params.get('');
      const sortParam = params.get('');
  
      // Setel state berdasarkan parameter URL
      if (filterParam) setSearchBrand(filterParam);
      if (createdByParam) setCreatedBy(createdByParam);
      if (pageParam) setPage(Number(pageParam));
      if (sortParam) setSort(sortParam);
  
      // Panggil fungsi pencarian dengan parameter yang diambil dari URL
      fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
      // Mengupdate URL untuk menghapus query parameters
      window.history.replaceState({}, '', '/brands');
    };


  return (
    <>
        <thead>
            <tr className="">
                <th className="border border-gray-300 p-2" colSpan={6}>
                    <div >
                    <Button onClick={handleSearch}>Advanced Search</Button>
                    <Button onClick={clearFilters} className="ml-2 bg-red-600 text-white">Clear Filters</Button>
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
                <th className="border border-gray-300 p-2">          
               
                </th>
                <th className="border border-gray-300 p-2">          
               
               </th>
                <th className="border border-gray-300 p-2">          
                    <div colspan={4} >
                        <label>Sort by:</label>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </th>

               <th className="border border-gray-300 p-2">          
               
               </th>
            </tr>
        </thead>
    </>
  );
};

export default BrandFilter;
