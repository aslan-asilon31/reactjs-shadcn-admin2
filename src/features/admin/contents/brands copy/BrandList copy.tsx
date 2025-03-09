import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from "@/components/ui/button";
import useBrandStore from '@/stores/brandStore';
import BrandTable from '@/features/admin/contents/brands/components/BrandTable'; // Komponen daftar merek

const BrandList = () => {
  const [searchBrand, setSearchBrand] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<BrandSearchSortOptions>('newest');
  
  useEffect(() => {
  }, []);

  return (
    <div>
      <Header />
      <Main>


        <BrandTable />

        
      </Main>
    </div>
  );
};

export default BrandList;
