import BrandCreate from '@/features/admin/contents/brands/BrandCreate'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/brands/create')({
  component: BrandCreate,
})
