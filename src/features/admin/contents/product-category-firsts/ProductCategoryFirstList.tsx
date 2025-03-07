import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';


const ProductCategoryFirstList = () => {
  

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Product Category First List</p>
        </div>


      </Main>
    </div>
  );
};

export default ProductCategoryFirstList;
