import { z } from 'zod'

export const filterSchema = z.object({
  searchValue: z.string(),
  acceptTrade: z.boolean(),
  filterNew: z.boolean(),
  filterUsed: z.boolean(),
  paymentMethods: z.array(z.string()),
  hasFiltersApplied: z.boolean(),
})

export type FormDataProps = z.infer<typeof filterSchema>
