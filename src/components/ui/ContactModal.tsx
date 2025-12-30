'use client';

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  type: 'offer' | 'buy';
}

/**
 * Модальное окно для контактов
 * Client Component - требует useState для управления открытием/закрытием
 */
export default function ContactModal({ isOpen, onClose, domainName, type }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Сброс формы при открытии
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Здесь будет отправка на сервер через Server Action или API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      
      // Закрываем модальное окно через 2 секунды
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-black" />
            <h2 className="text-lg font-bold text-black">
              {type === 'offer' ? 'Предложить цену' : 'Купить домен'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Сообщение отправлено!
              </h3>
              <p className="text-sm text-gray-600">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Domain Name */}
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Домен
                </label>
                <input
                  type="text"
                  value={domainName}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-600 text-sm"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Имя *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров"
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ivan@example.com"
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-black mb-1.5">
                  Сообщение *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Расскажите нам о вашем предложении..."
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all resize-none"
                />
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="text-sm text-red-600 text-center">
                  Произошла ошибка. Попробуйте позже.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all',
                  isSubmitting && 'opacity-50 cursor-not-allowed'
                )}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
