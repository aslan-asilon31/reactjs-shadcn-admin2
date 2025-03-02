import Brands from '@/features/admin/contents/brands/BrandList'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/brands/')({
  component: Brands,
})
