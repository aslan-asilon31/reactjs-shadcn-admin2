import ProductContents from '@/features/admin/contents/product-contents/ProductContentList'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-contents/')({
  component: ProductContents,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
