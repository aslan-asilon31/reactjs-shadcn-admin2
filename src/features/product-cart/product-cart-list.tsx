import React from 'react';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

// Define sorting options for product search
type ProductSearchSortOptions = 'newest' | 'oldest' | 'price';

// Define type for product cart search parameters
type ProductCartSearch = {
  page: number;
  filter: string;
  sort: ProductSearchSortOptions;
};

// Define validation schema using Zod
const productCartSearchSchema = z.object({
  page: z.number().default(1), // Default to page 1
  filter: z.string().default(''), // Default to an empty string
  sort: z.enum(['newest', 'oldest', 'price']).default('newest'), // Sort options
});

// Create the route for product carts
export const productCartsRoute = createFileRoute('/product-carts')({
  validateSearch: (search: Record<string, unknown>): ProductCartSearch => {
    // Validate and parse the search params into a typed state
    return productCartSearchSchema.parse(search);
  },
});

// Example component to display product cart search parameters
const ProductCarts = () => {
  const search = useSearch<ProductCartSearch>();

  return (
    <div>
      <h1>Product Carts</h1>
      <p>Page: {search.page}</p>
      <p>Filter: {search.filter}</p>
      <p>Sort: {search.sort}</p>
    </div>
  );
};

export default ProductCarts;
