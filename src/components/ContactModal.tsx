"use client";

import { X } from 'lucide-react';
import { useState, useActionState, useEffect } from 'react';
import { submitContactForm } from '@/app/actions';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName?: string;
  type?: 'buy' | 'offer';
}

export default function ContactModal({ isOpen, onClose, domainName, type = 'buy' }: ContactModalProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    error: '',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Close modal on success
  useEffect(() => {
    if (state.success) {
      setIsSuccess(true);
      const timer = setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  const title = type === 'buy' 
    ? `Купить ${domainName || 'домен'}` 
    : `Сделать предложение по ${domainName || 'домену'}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-none border-2 border-black relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {isSuccess ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Заявка отправлена!</h3>
              <p className="text-sm text-gray-600">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-black mb-2">{title}</h2>
              <p className="text-sm text-gray-600 mb-6">
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>

              <form action={formAction} className="space-y-4">
                <input type="hidden" name="domainName" value={domainName || ''} />
                <input type="hidden" name="type" value={type} />
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 focus:border-black outline-none text-sm"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 focus:border-black outline-none text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-3 py-2 border-2 border-gray-200 focus:border-black outline-none text-sm"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-gray-200 focus:border-black outline-none text-sm resize-none"
                    placeholder="Дополнительная информация..."
                  />
                </div>

                {state?.error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {state.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
