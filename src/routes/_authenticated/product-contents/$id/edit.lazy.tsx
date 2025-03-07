import BrandEdit from '@/features/admin/contents/brands/BrandEdit'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-contents/$id/edit')({
  component: BrandEdit,
})
