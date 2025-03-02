import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  selling_price: z.number(),
})

export type Product = z.infer<typeof productSchema>
