"use client";

import { useActionState, useEffect, useState } from 'react';
import { submitContactForm } from '@/app/actions';

export function ContactPageForm() {
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
    <>
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
    </>
  );
}
