'use server';

import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'; 

export type ContactState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;
  const domainName = formData.get('domainName') as string || 'General Inquiry';
  const type = formData.get('type') as string || 'contact';
  const price = formData.get('price') as string;
  const offerAmount = formData.get('offerAmount') as string;

  // Basic Validation
  if (!name || !email) {
    return { error: 'Пожалуйста, заполните обязательные поля (Имя и Email).' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'dodomain Contact <onboarding@resend.dev>', // Use a valid sender signature or default testing one
      to: [ADMIN_EMAIL],
      subject: `Новая заявка: ${domainName} (${type})`,
      html: `
        <h1>Новая заявка с сайта dodomain</h1>
        <p><strong>Тип:</strong> ${type}</p>
        <p><strong>Домен:</strong> ${domainName}</p>
        ${price ? `<p><strong>Желаемая цена:</strong> ${price} ₽</p>` : ''}
        ${offerAmount ? `<p><strong>Предложенная цена:</strong> ${offerAmount} ₽</p>` : ''}
        <h2>Контактные данные:</h2>
        <ul>
          <li><strong>Имя:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Телефон:</strong> ${phone || 'Не указан'}</li>
        </ul>
        <h2>Сообщение:</h2>
        <p>${message || 'Без сообщения'}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { error: 'Ошибка отправки письма. Попробуйте позже.' };
    }

    return { success: true, message: 'Заявка успешно отправлена!' };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { error: 'Произошла непредвиденная ошибка.' };
  }
}
