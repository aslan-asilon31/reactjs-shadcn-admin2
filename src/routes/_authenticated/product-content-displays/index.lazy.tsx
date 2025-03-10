import ProductContentDisplays from '@/features/admin/contents/product-content-displays/ProductContentDisplayList'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-content-displays/')({
  component: ProductContentDisplays,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
