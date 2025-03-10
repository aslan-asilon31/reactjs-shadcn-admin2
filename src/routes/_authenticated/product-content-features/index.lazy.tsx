import ProductContentFeatures from '@/features/admin/contents/product-content-features/ProductContentFeatureList'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-content-features/')({
  component: ProductContentFeatures,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
