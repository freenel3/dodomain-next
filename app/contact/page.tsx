
'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitContact } from '@/actions/contact'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const initialState = {
    success: false,
    message: '',
    errors: undefined
}

export default function ContactPage() {
  const searchParams = useSearchParams()
  const domainName = searchParams.get('domain') || ''
  const type = searchParams.get('type') || 'offer' // 'buy' or 'offer'

  const [state, formAction, isPending] = useActionState(submitContact, initialState as any)

  if (state.success) {
      return (
          <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="text-center p-8 max-w-md w-full">
                  <h1 className="text-3xl font-display font-bold mb-4 text-green-600">Спасибо!</h1>
                  <p className="text-gray-600 mb-8">{state.message}</p>
                  <Button onClick={() => window.location.href = '/'}>На главную</Button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">
            {type === 'buy' ? 'Покупка домена' : 'Сделать предложение'}
          </h1>
          {domainName && (
            <p className="mt-2 text-lg font-medium text-black">{domainName}</p>
          )}
        </div>

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="domainName" value={domainName} />
          <input type="hidden" name="type" value={type} />

          <Input 
            label="Ваше имя" 
            name="name" 
            id="name" 
            required 
            placeholder="Иван Иванов"
            error={state.errors?.name?.[0]}
          />

          <Input 
            label="Email" 
            name="email" 
            id="email" 
            type="email" 
            required 
            placeholder="ivan@example.com"
             error={state.errors?.email?.[0]}
          />

          <Input 
            label="Телефон (необязательно)" 
            name="phone" 
            id="phone" 
            type="tel" 
            placeholder="+7 (999) 123-45-67"
          />

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Сообщение (необязательно)
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Дополнительная информация..."
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isPending}>
            Отправить запрос
          </Button>
            
            {state.message && !state.success && (
                <p className="text-center text-red-500 text-sm">{state.message}</p>
            )}
        </form>
      </div>
    </div>
  )
}
