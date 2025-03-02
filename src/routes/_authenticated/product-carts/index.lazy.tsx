import ProductCartList from '@/features/product-cart/product-cart-list'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/product-carts/')({
  component: ProductCartList,
})
