import ProductContentDetails from '@/features/admin/contents/product-contents/ProductContentDetail'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-content-details/')({
  component: ProductContentDetails,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
