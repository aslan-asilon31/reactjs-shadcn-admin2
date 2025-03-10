import { z } from 'zod'



const customerSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  email: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
  is_activated: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type Customer = z.infer<typeof customerSchema>

export default customerSchema;
