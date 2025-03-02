import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from "@/components/ui/button"
import useBrandStore from '@/stores/brandStore'
import { useEffect, useState } from 'react'
import BrandsProvider from './context/brands-context'

interface Brand {
  id: number; 
  name: string;
}

export default function BrandList() {
  const { brands, error } = useBrandStore() as { brands: Brand; error: string | null };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBrands = useBrandStore((state:any) => state.fetchBrands);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BrandsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Brand List</h2>
            <p className='text-muted-foreground'>
              Manage your Brands and their roles here.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <Button onClick={() => window.location.href = '/brands/create'} className="text-white p-2 rounded">
                    Add brand
                </Button>
        <h1>Daftar brand</h1>
        <table>
          <thead>
            <tr>
              <th>Nama brand</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(brands) && brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          {/* <BrandsTable data={brandList} columns={columns} /> */}
        </div>
      </Main>

    </BrandsProvider>
  )
}
