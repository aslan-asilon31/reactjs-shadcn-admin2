import ProductCategoryFirsts from '@/features/admin/contents/product-category-firsts/ProductCategoryFirstList'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-category-firsts/')({
  component: ProductCategoryFirsts,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
