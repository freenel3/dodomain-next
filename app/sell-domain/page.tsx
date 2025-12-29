'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

export default function DomainSell() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/sell-domain" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs 
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Продать домен' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-3">Продать домен</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Разместите ваш домен на нашей площадке. Мы поможем найти покупателя 
            и обеспечим безопасность сделки.
          </p>
        </div>

        <div className="border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Доменное имя *
              </label>
              <input
                type="text"
                placeholder="example.ru"
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
              <p className="text-xs text-gray-600 mt-1">Введите полное имя домена с зоной</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Желаемая цена (₽) *
                </label>
                <input
                  type="number"
                  placeholder="100000"
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Категория
                </label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm focus:outline-none focus:border-black transition-all">
                  <option>Бизнес</option>
                  <option>E-commerce</option>
                  <option>Технологии</option>
                  <option>Финансы</option>
                  <option>Развлечения</option>
                  <option>Другое</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Описание домена
              </label>
              <textarea
                rows={4}
                placeholder="Расскажите о преимуществах вашего домена..."
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all resize-none"
              />
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-sm font-bold text-black mb-3">Контактная информация</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-black mb-1.5">
                    Имя *
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Петров"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="ivan@example.com"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-black mb-1.5">
                  Телефон
                </label>
                <input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {submitted ? 'Отправлено!' : 'Отправить заявку'}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Нажимая кнопку, вы соглашаетесь с условиями размещения доменов на площадке
            </p>
          </form>
        </div>

        <div className="mt-8 border border-gray-200 p-5">
          <h3 className="font-bold text-black mb-3">Как это работает?</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p>Отправьте заявку с информацией о домене</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <p>Мы проверим домен и свяжемся с вами</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <p>Домен появится в каталоге после одобрения</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <p>Получите деньги после успешной продажи</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
