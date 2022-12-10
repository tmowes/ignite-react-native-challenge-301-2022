import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Informe o nome.'),
    email: z.string().min(8, 'Informe o e-mail.').email('E-mail inválido.'),
    tel: z.string().min(12, 'Informe o telefone completo com DDI e DDD.'),
    password: z
      .string()
      .min(1, 'Informe a senha.')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    passwordConfirm: z
      .string()
      .min(1, 'Confirme a senha.')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'A confirmação da senha não confere.',
    path: ['passwordConfirm'],
  })

export type FormDataProps = z.infer<typeof signUpSchema>
