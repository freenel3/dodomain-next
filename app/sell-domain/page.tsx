"use client";

import { useState } from "react";
import {
  DollarSign,
  CheckCircle,
  Info,
  Upload,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

export default function SellDomainPage() {
  const [formData, setFormData] = useState({
    domainName: "",
    email: "",
    phone: "",
    description: "",
    askingPrice: "",
    category: "",
    traffic: "",
    registrationYear: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка формы на сервер
    console.log("Domain submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPrice = (value: string) => {
    if (!value) return "";
    return new Intl.NumberFormat("ru-RU").format(Number(value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, askingPrice: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Продать домен
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Получите лучшую цену за ваш домен на dodomain
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-gray-600">
                  Наши эксперты оценят ваш домен и свяжутся с вами в течение 1-2
                  рабочих дней
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
              >
                <div className="space-y-6">
                  {/* Domain Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя домена *
                    </label>
                    <input
                      type="text"
                      name="domainName"
                      required
                      value={formData.domainName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="example.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Укажите полное имя домена с зоной
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Категория
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Выберите категорию</option>
                      <option value="Премиум">Премиум</option>
                      <option value="Бизнес">Бизнес</option>
                      <option value="Коммерция">Коммерция</option>
                      <option value="Технологии">Технологии</option>
                      <option value="Медиа">Медиа</option>
                      <option value="Финансы">Финансы</option>
                      <option value="Образование">Образование</option>
                      <option value="Здоровье">Здоровье</option>
                    </select>
                  </div>

                  {/* Asking Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Желаемая цена (₽)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="askingPrice"
                        value={formatPrice(formData.askingPrice)}
                        onChange={handlePriceChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Оставьте пустым для профессиональной оценки
                    </p>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Год регистрации
                      </label>
                      <input
                        type="text"
                        name="registrationYear"
                        value={formData.registrationYear}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Трафик
                      </label>
                      <input
                        type="text"
                        name="traffic"
                        value={formData.traffic}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1 000 посещений/мес"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание домена
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Опишите особенности домена, его историю, проекты на нем..."
                    />
                  </div>

                  {/* Terms */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        id="terms"
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        Я согласен с условиями продажи и политикой
                        конфиденциальности dodomain
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center bg-blue-600 text-white py-4 text-lg rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Отправить на оценку
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How it works */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Как это работает
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Отправьте домен
                    </h4>
                    <p className="text-sm text-gray-600">
                      Заполните форму с информацией о домене
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Получите оценку
                    </h4>
                    <p className="text-sm text-gray-600">
                      Наши эксперты оценят ваш домен за 1-2 дня
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Согласуйте цену
                    </h4>
                    <p className="text-sm text-gray-600">
                      Обсудите условия размещения на площадке
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Продайте домен
                    </h4>
                    <p className="text-sm text-gray-600">
                      Получите деньги после успешной продажи
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Преимущества
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Высокая цена</h4>
                    <p className="text-sm text-gray-600">
                      Экспертная оценка для максимальной выгоды
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Безопасность</h4>
                    <p className="text-sm text-gray-600">
                      Эскроу защищает вашу сделку
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Быстрая продажа
                    </h4>
                    <p className="text-sm text-gray-600">
                      Более 500 000 покупателей на площадке
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Комиссия</h4>
                  <p className="text-sm text-gray-700">
                    Комиссия составляет{" "}
                    <span className="font-semibold">10%</span> от стоимости
                    продажи, но не менее{" "}
                    <span className="font-semibold">5 000 ₽</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Комиссия взимается только при успешной продаже
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
