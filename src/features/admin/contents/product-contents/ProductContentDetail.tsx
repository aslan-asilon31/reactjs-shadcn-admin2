import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import Tabs, { TabContent, TabsTrigger } from './Tabs';
import ProductContentFeatureList from '@/features/admin/contents/product-content-features/ProductContentFeatureList'; // Komponen filter
import ProductContentDisplayList from '@/features/admin/contents/product-content-displays/ProductContentDisplayList'; // Komponen filter


const ProductContentDetail = () => {

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>
        <div className="border-spacing-2 bg-purple-300 m-4 p-8">
          <p className="text-2xl font-bold text-purple-800">Product Content Display List</p>
        </div>
          <Tabs>
            <TabsTrigger value="display" className="mx-2 ">Display</TabsTrigger>
            <TabsTrigger value="feature" className="mx-2 ">Feature</TabsTrigger>
            <TabsTrigger value="review" className="mx-2 ">Review</TabsTrigger>
            <TabsTrigger value="specification" className="mx-2 ">Specification</TabsTrigger>
            <TabsTrigger value="video" className="mx-2 ">Video</TabsTrigger>

            <TabContent value="display">
              <h2>Display Content</h2>
            </TabContent>
            <TabContent value="feature">
              <h2>Feature Content</h2>
              <ProductContentFeatureList/>
            </TabContent>
            <TabContent value="review">
              <h2>Review Content</h2>
              <p>This is the content for the Review tab.</p>
            </TabContent>
            <TabContent value="specification">
              <h2>Specification Content</h2>
              <p>This is the content for the Specification tab.</p>
            </TabContent>
            <TabContent value="video">
              <h2>Video Content</h2>
              <p>This is the content for the Video tab.</p>
            </TabContent>
          </Tabs>
      </Main>
    </div>
  );

};

export default ProductContentDetail;
