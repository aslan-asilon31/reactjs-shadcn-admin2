import ProductCategorySeconds from '@/features/admin/contents/product-category-seconds/ProductCategorySecondList'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-category-seconds/')({
  component: ProductCategorySeconds,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
