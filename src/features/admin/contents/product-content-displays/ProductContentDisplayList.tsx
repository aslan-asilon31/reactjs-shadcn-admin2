import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const ProductContentDisplayList = () => {

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
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="feature">Feature</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="specification">Specification</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          <TabsContent value="display" className="bg-blue-300">this is display product.</TabsContent>
          <TabsContent value="feature" className="bg-blue-300">this is feature product.</TabsContent>
          <TabsContent value="review" className="bg-blue-300">this is review product.</TabsContent>
          <TabsContent value="specification" className="bg-blue-300">this is specification product.</TabsContent>
          <TabsContent value="video" className="bg-blue-300">this is video product.</TabsContent>
        </Tabs>
      </Main>
    </div>
  );

};

export default ProductContentDisplayList;
