import { z } from 'zod'

export const createProductSchema = z
  .object({
    product_images: z
      .array(
        z.object({
          name: z.string(),
          uri: z.string(),
          type: z.string(),
        }),
      )
      .min(1, 'Adicione ao menos uma imagem'),
    name: z.string().min(3, 'Informe o nome.'),
    description: z.string().min(8, 'Informe uma descrição.'),
    is_new: z.string().transform((v) => v === 'is_new'),
    accept_trade: z.boolean(),
    price: z
      .string()
      .min(4, 'Informe um preço.')
      .transform((v) => v.replace(',', '.'))
      .transform((v: string) => Number(v))
      .refine((v) => v > 0, 'Informe um preço positivo.')
      .transform((v) => v * 100),
    payment_methods: z.array(z.string()),
  })
  .refine((v) => v.payment_methods.length > 0, 'Informe ao menos um método de pagamento.')
  .refine((v) => v.price > 0, 'Informe um preço positivo.')

export type FormDataInputProps = z.input<typeof createProductSchema>
export type FormDataOutputProps = z.output<typeof createProductSchema>
