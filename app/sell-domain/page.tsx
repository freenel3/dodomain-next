"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function SellDomainPage() {
  const [formData, setFormData] = useState({
    domainName: "",
    email: "",
    phone: "",
    price: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Domain submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-black mx-auto mb-6" />
          <h1 className="text-2xl font-display font-bold text-black mb-4">
            Заявка отправлена
          </h1>
          <p className="text-gray-500 font-light mb-8">
            Мы свяжемся с вами в течение 24 часов для обсуждения условий размещения.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors"
          >
            На главную
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6 tracking-tighter">
            Продать домен
          </h1>
          <p className="text-lg text-gray-500 font-light">
            Разместите ваш домен на нашей площадке
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-16">
        <div className="max-w-xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Домен *
              </label>
              <input
                type="text"
                name="domainName"
                required
                value={formData.domainName}
                onChange={handleChange}
                placeholder="example.com"
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Желаемая цена (₽)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="100 000"
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                Оставьте пустым для бесплатной оценки
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Описание
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Расскажите о домене, его истории, трафике..."
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-medium hover:bg-gray-900 transition-colors"
            >
              Отправить заявку
            </button>

            <p className="text-xs text-gray-400 text-center">
              Комиссия: 10% от стоимости продажи, минимум 5 000 ₽
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
