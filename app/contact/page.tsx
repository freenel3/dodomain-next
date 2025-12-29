'use client'

import { Mail, MapPin, MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Контакты - dodomain',
  description: 'Свяжитесь с нами по вопросам покупки и продажи доменов. Email, телефон и адрес офиса dodomain в Москве.',
}


export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/contact" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">
            Свяжитесь с нами
          </h1>
          <p className="text-sm text-gray-600">
            Мы здесь, чтобы помочь с любыми вопросами о доменах
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Email</h3>
            <a href="mailto:info@dodomain.ru" className="text-xs text-gray-600 hover:text-black transition-colors">
              info@dodomain.ru
            </a>
          </div>

          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Telegram</h3>
            <a href="https://t.me/pnlup" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-black transition-colors">
              @pnlup
            </a>
          </div>

          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Адрес</h3>
            <p className="text-xs text-gray-600">
              Москва, Россия
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-gray-200 p-5">
          <h2 className="text-xl font-bold text-black mb-5">Отправьте сообщение</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Иван Петров"
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ivan@example.com"
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Тема
              </label>
              <input
                type="text"
                placeholder="Вопрос о покупке домена"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Сообщение
              </label>
              <textarea
                rows={4}
                placeholder="Расскажите нам, чем мы можем помочь..."
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
            >
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
