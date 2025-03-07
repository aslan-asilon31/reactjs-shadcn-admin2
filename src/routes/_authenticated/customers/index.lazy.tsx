import { createLazyFileRoute } from '@tanstack/react-router'
import Customers from '@/features/admin/sales/customers/CustomerList'

export const Route = createLazyFileRoute('/_authenticated/customers/')({
  component: Customers,
})
