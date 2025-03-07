import Products from '@/features/admin/contents/products/ProductList'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/products/')({
  component: Products,
})
