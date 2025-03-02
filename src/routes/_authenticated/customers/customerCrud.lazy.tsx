import customerCrud from '@/features/customers/customerCrud'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/customers/customerCrud')({
  component: customerCrud,
})
