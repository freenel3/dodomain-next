'use client';

import { useActionState, useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, Clock, Shield, Check, TrendingUp } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { submitContactForm } from '@/app/actions';
import Header from '@/components/Header';

export default function SellDomain() {
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
      }, 5000); // 5 seconds message
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: 'Главная', path: '/' },
            { label: 'Продать домен' }
          ]}
        />
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-3">
            Продайте домен площадке
          </h1>
          <p className="text-sm text-gray-600">
            Мы выкупаем премиум домены напрямую. Быстро, безопасно и по справедливой цене.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Быстрая оценка</h3>
            <p className="text-xs text-gray-600">В течение 24 часов</p>
          </div>
          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Моментальная оплата</h3>
            <p className="text-xs text-gray-600">После согласования</p>
          </div>
          <div className="border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">Безопасно</h3>
            <p className="text-xs text-gray-600">Защищённая сделка</p>
          </div>
        </div>

        {/* Sell Form */}
        <div className="border border-gray-200 p-5 mb-8">
          <h2 className="text-xl font-bold text-black mb-5">Предложите ваш домен</h2>
          
          <form action={formAction} className="space-y-4">
             <input type="hidden" name="type" value="sell_offer" />

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Доменное имя *
              </label>
              <input
                type="text"
                name="domainName"
                placeholder="пример.рф"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Ваша желаемая цена (₽) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="500000"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-1.5">Укажите желаемую цену. Мы сделаем встречное предложение на основе рыночной оценки.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Email для связи *
              </label>
              <input
                type="email"
                name="email"
                placeholder="ваш@email.ru"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                required
              />
            </div>
            
            <div>
               <label className="block text-xs font-medium text-black mb-1.5">
                Ваше имя *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Иван"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Дополнительная информация
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Расскажите о трафике, истории домена, причине продажи..."
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
                  <span>Заявка отправлена!</span>
                </div>
                <p className="text-sm text-gray-600">
                  Мы свяжемся с вами в ближайшее время для обсуждения оценки.
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
              {isPending ? 'Отправка...' : 'Отправить на оценку'}
            </button>
          </form>
        </div>

        {/* How it works */}
        <div className="border border-gray-200 p-5 mb-8">
          <h3 className="text-base font-bold text-black mb-4">Как это работает</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Отправьте домен на оценку</h4>
                <p className="text-xs text-gray-600">Заполните форму выше с информацией о вашем домене</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Получите предложение</h4>
                <p className="text-xs text-gray-600">Наши эксперты оценят домен и сделают предложение в течение 24 часов</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Получите деньги</h4>
                <p className="text-xs text-gray-600">После согласования цены мы оформляем сделку и переводим средства</p>
              </div>
            </div>
          </div>
        </div>

        {/* What we buy */}
        <div className="border border-gray-200 p-5 mb-8">
          <h3 className="text-base font-bold text-black mb-3">Какие домены мы покупаем</h3>
          <div className="space-y-2">
            {[
              'Короткие домены (до 5 символов)',
              'Популярные ключевые слова',
              'Домены с трафиком',
              'Домены в зонах .com, .ru, .рф, .io',
              'Брендируемые домены',
              'Домены с историей'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                <Check className="w-3.5 h-3.5 flex-shrink-0 text-black" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why sell to us */}
        <div className="bg-gray-50 border border-gray-200 p-5">
          <h3 className="text-base font-bold text-black mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Почему продавать нам
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-bold text-black">Справедливая оценка:</span> Наши эксперты используют актуальные рыночные данные для оценки вашего домена.
            </p>
            <p>
              <span className="font-bold text-black">Без комиссий:</span> Вы получаете полную сумму сделки без скрытых платежей.
            </p>
            <p>
              <span className="font-bold text-black">Быстрая сделка:</span> В отличие от площадок, где нужно ждать покупателя, мы покупаем напрямую.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
