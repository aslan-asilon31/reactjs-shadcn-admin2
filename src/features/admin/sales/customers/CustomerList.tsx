import  { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import useCustomerStore from '@/stores/customerStore';
import CustomerTable from '@/features/admin/sales/customers/components/CustomerTable'

type CustomerSearchSortOptions = 'newest' | 'oldest' | 'price';


const CustomerList = () => {
  const { customers, fetchCustomers,fetchAdvanceSearch,setSelectedCustomerId } = useCustomerStore() as { customers: Customer; error: string | null };
  const [searchCustomer, setSearchCustomer] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<CustomerSearchSortOptions>('newest');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    const createdByParam = params.get('created_by');
    const pageParam = params.get('page');
    const sortParam = params.get('sort');

    // Setel state berdasarkan parameter URL
    if (filterParam) setSearchCustomer(filterParam);
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
    params.set('filter', searchCustomer);
    params.set('created_by', createdBy);
    params.set('page', page);
    params.set('sort', sort);

    // Memperbarui URL tanpa memuat ulang halaman
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Panggil fungsi pencarian
    fetchAdvanceSearch(searchCustomer, createdBy, page, sort);
  };



    // Fungsi untuk menghapus filter
    const clearFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get('');
      const createdByParam = params.get('');
      const pageParam = params.get('');
      const sortParam = params.get('');
  
      // Setel state berdasarkan parameter URL
      if (filterParam) setSearchCustomer(filterParam);
      if (createdByParam) setCreatedBy(createdByParam);
      if (pageParam) setPage(Number(pageParam));
      if (sortParam) setSort(sortParam);
  
      // Panggil fungsi pencarian dengan parameter yang diambil dari URL
      fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);
      // Mengupdate URL untuk menghapus query parameters
      window.history.replaceState({}, '', '/customers');
    };


    const handleEdit = async (customerId: any) => {
      setSelectedCustomerId(customerId);
      window.location.href = `/customers/${customerId}/edit/`;
    };

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>
        <CustomerTable customers={customers} />
      </Main>
    </div>
  );
};

export default CustomerList;
