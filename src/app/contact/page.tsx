'use client';

import { useActionState, useEffect, useState } from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CONTACT_INFO } from '@/lib/constants';
import { submitContactForm } from '@/app/actions';

/**
 * Страница контактов
 * Client Component - требует useState для формы
 */
export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    error: '',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setIsSuccess(true);
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs 
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Контакты' }
        ]}
      />

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
            <a
              href={`mailto:${CONTACT_INFO.EMAIL}`}
              className="text-xs text-gray-600 hover:text-black transition-colors"
            >
              {CONTACT_INFO.EMAIL}
            </a>
          </div>

          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Telegram</h3>
            <a
              href={CONTACT_INFO.TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-black transition-colors"
            >
              {CONTACT_INFO.TELEGRAM}
            </a>
          </div>

          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Адрес</h3>
            <p className="text-xs text-gray-600">
              {CONTACT_INFO.ADDRESS}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-gray-200 p-5">
          <h2 className="text-xl font-bold text-black mb-5">
            Отправьте сообщение
          </h2>
          
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="domainName" value="Contact Page" />
            <input type="hidden" name="type" value="general" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван Петров"
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ivan@example.com"
                  required
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
                name="subject"
                placeholder="Вопрос о покупке домена"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Сообщение
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Расскажите нам, чем мы можем помочь..."
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all resize-none"
              />
            </div>

            {/* Status Messages */}
            {isSuccess && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-green-600 text-sm mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Сообщение отправлено!</span>
                </div>
                <p className="text-sm text-gray-600">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            )}

            {state?.error && (
              <div className="text-center py-4">
                <div className="text-red-600 text-sm mb-2">
                  {state.error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
