import Brands from '@/features/admin/contents/brands/BrandList'
import { createLazyFileRoute } from '@tanstack/react-router'
// import { createRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/brands/')({
  component: Brands,
})

// export const Route = createRoute('/_authenticated/brands/')({
//     component: Brands,
// })
