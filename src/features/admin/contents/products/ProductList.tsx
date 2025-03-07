import  { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import useProductStore from '@/stores/productStore';
import ProductTable from '@/features/admin/contents/products/components/ProductTable'

type ProductSearchSortOptions = 'newest' | 'oldest' | 'price';


const ProductList = () => {
  const { products, fetchProducts,fetchAdvanceSearch,setSelectedProductId } = useProductStore() as { products: Product; error: string | null };
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

    // Panggil fungsi pencarian dengan parameter yang diambil dari URL
    fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
  }, []);

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    // Memperbarui URL dengan parameter baru
    const params = new URLSearchParams();
    params.set('filter', searchProduct);
    params.set('created_by', createdBy);
    params.set('page', page);
    params.set('sort', sort);

    // Memperbarui URL tanpa memuat ulang halaman
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Panggil fungsi pencarian
    fetchAdvanceSearch(searchProduct, createdBy, page, sort);
  };



    // Fungsi untuk menghapus filter
    const clearFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get('');
      const createdByParam = params.get('');
      const pageParam = params.get('');
      const sortParam = params.get('');
  
      // Setel state berdasarkan parameter URL
      if (filterParam) setSearchProduct(filterParam);
      if (createdByParam) setCreatedBy(createdByParam);
      if (pageParam) setPage(Number(pageParam));
      if (sortParam) setSort(sortParam);
  
      // Panggil fungsi pencarian dengan parameter yang diambil dari URL
      fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
      // Mengupdate URL untuk menghapus query parameters
      window.history.replaceState({}, '', '/products');
    };


    const handleEdit = async (productId: any) => {
      setSelectedProductId(productId);
      window.location.href = `/products/${productId}/edit/`;
    };

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>
        <ProductTable products={products} />
      </Main>
    </div>
  );
};

export default ProductList;
