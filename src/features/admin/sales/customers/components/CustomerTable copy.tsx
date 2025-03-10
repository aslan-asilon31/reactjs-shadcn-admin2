import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import useCustomerStore from '@/stores/customerStore';
import CustomerFilter from '@/features/admin/sales/customers/components/CustomerFilter'; // Komponen filter
import DataTable from 'react-data-table-component';

type CustomerSearchSortOptions = 'newest' | 'oldest' | 'price';

type CustomerSearch = {
  page: number;
  filter: string;
  createdBy: string;
  sort: CustomerSearchSortOptions;
};



const CustomerTable = ({customers}) => {
  const {fetchCustomers,fetchAdvanceSearch,setSelectedcustomerId } = useCustomerStore() as { customers: Brand; error: string | null };

  const [searchCustomer, setSearchCustomer] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<CustomerSearchSortOptions>('newest');
  const [filter, setFilter] = useState('');
  const [columns, setColumns] = useState([]);
  const [pending, setPending] = React.useState(true);

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

    fetchCustomers()
    // Panggil fungsi pencarian dengan parameter yang diambil dari URL
    fetchAdvanceSearch(filterParam, createdByParam, Number(pageParam), sortParam);


    //table loading 

    const timeout = setTimeout(() => {
        setColumns([ {
              name: 'First Name',
              selector: row => row.first_name,
            },
            {
              name: 'Last Name',
              selector: row => row.last_name,

            },
            {
              name: 'Email',
              selector: row => row.email,

            },
            {
              name: 'Is Activated',
              selector: row => row.is_activated === 1 ? 'Ya' : 'Tidak',
              sortable: true,
              right: true,
              conditionalCellStyles: [
                {
                  when: row => row.is_avtivated == 0,
                  style: {
                    backgroundColor: 'rgba(255, 0, 0, 0.9)',
                    color: 'white',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  },
                },
                {
                  when: row => row.calories == 1,
                  style: {
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                      cursor: 'not-allowed',
                    },
                  },
                },
              ],
            }]);
      setPending(false);
  }, 2000);
    return () => clearTimeout(timeout);

  }, []);

  const handleEdit = async (customerId: any) => {
    setSelectedcustomerId(customerId);
    window.location.href = `/customers/${customerId}/edit/`;
  };




  return (
    <div>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Customer List use react-data-table-component</p>
        </div>

        <Button onClick={() => window.location.href = '/customers/create'} className="text-white p-2 rounded">
              Add Customer
          </Button>
          <br />
        <DataTable
          title="Customer List"
          columns={columns}
          data={customers}
          pagination // Menambahkan pagination jika diperlukan
          highlightOnHover // Menyoroti baris saat hover
          pointerOnHover // Menampilkan pointer saat hover
        />

<br />

 


    </div>
  );
};

