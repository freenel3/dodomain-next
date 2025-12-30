
'use server'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Имя должно быть длиннее'),
  email: z.string().email('Некорректный email'),
  phone: z.string().optional(),
  message: z.string().optional(),
  domainName: z.string(),
  type: z.enum(['buy', 'offer']),
})

const prisma = new PrismaClient()

export async function submitContact(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    domainName: formData.get('domainName'),
    type: formData.get('type'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.contactRequest.create({
      data: validatedFields.data,
    })
    return { success: true, message: 'Заявка отправлена!' }
  } catch (e) {
    return { success: false, message: 'Ошибка при сохранении' }
  }
}
