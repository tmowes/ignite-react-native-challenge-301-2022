import * as zod from 'zod'

export const signInSchema = zod.object({
  email: zod.string().min(8, 'Informe o e-mail.').email('E-mail inválido.'),
  password: zod
    .string()
    .min(1, 'Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export type FormDataProps = zod.infer<typeof signInSchema>
