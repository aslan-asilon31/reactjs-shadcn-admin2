import BrandCreate from '@/features/admin/contents/brands/BrandCreate'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-category-seconds/create')({
  component: BrandCreate,
})
