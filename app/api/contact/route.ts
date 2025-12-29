import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Некорректный email'),
  phone: z.string().optional(),
  message: z.string().optional(),
  domainName: z.string().min(1, 'Имя домена обязательно'),
  type: z.enum(['buy', 'offer'], {
    errorMap: () => ({ message: 'Тип должен быть buy или offer' }),
  }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = contactSchema.parse(body)

    // TODO: Send email or save to database
    // For now, just log the submission
    console.log('Contact form submission:', validatedData)

    // In production, you would:
    // 1. Send email using nodemailer, sendgrid, etc.
    // 2. Or save to database for later processing
    // 3. Or integrate with CRM

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ошибка валидации',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      )
    }

    console.error('Error processing contact form:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Ошибка обработки формы',
      },
      { status: 500 }
    )
  }
}
