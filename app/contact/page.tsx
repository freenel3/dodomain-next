'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domainName: '',
    message: '',
    type: 'buy' as 'buy' | 'offer',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          domainName: '',
          message: '',
          type: 'buy',
        })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-4">Контакты</h1>
      <p className="text-gray-600 mb-8">
        Заполните форму и мы свяжемся с вами в ближайшее время
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Имя *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Телефон
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Домен *
          </label>
          <input
            type="text"
            required
            placeholder="example.com"
            value={formData.domainName}
            onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Тип запроса *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'buy' | 'offer' })}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          >
            <option value="buy">Купить домен</option>
            <option value="offer">Сделать предложение</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Сообщение
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-all disabled:bg-gray-400"
        >
          {status === 'loading' ? 'Отправка...' : 'Отправить'}
        </button>

        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800">
            Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800">
            Произошла ошибка. Пожалуйста, попробуйте еще раз.
          </div>
        )}
      </form>
    </div>
  )
}
