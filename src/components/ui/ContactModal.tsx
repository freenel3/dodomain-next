'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Check, ArrowRight } from 'lucide-react';
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
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Сброс формы при открытии
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPhone('');
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      {/* Modal Content */}
      <div className="relative bg-white rounded-sm shadow-2xl max-w-[400px] w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-black mb-2">
                Заявка отправлена!
              </h3>
              <p className="text-sm text-gray-600">
                Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-display font-bold text-black mb-1 tracking-tight">
                {type === 'offer' ? 'Предложить цену' : `Купить ${domainName}`}
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Имя *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors rounded-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors rounded-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors rounded-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Сообщение 
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Дополнительная информация..."
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors rounded-sm resize-none"
                />
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="text-xs text-red-600 text-center">
                  Произошла ошибка. Попробуйте позже.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full py-3 bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all rounded-sm mt-1',
                  isSubmitting && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
