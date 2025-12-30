"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, TrendingUp, Shield, Check } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { isValidDomain } from "@/lib/utils";

/**
 * Страница продажи домена
 * Client Component - требует useState для формы
 */
export default function SellDomain() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Валидация домена
      if (domain && !isValidDomain(domain)) {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
        return;
      }

      // TODO: Здесь будет Server Action для отправки формы
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");

      // Сбрасываем форму через 3 секунды
      setTimeout(() => {
        setDomain("");
        setEmail("");
        setPrice("");
        setDescription("");
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs
        items={[
          { label: "Главная", path: "/" },
          { label: "Домены", path: "/domains" },
          { label: "Продать домен" },
        ]}
      />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">Продать домен</h1>
          <p className="text-sm text-gray-600">
            Заполните форму и мы свяжемся с вами для оценки и продажи вашего
            домена
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="border border-gray-200 p-5">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2 text-center">
              Глобальный охват
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Ваш домен будет доступен покупателям со всего мира через нашу
              площадку
            </p>
          </div>

          <div className="border border-gray-200 p-5">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2 text-center">
              Экспертная оценка
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Профессиональная оценка рыночной стоимости вашего домена
            </p>
          </div>

          <div className="border border-gray-200 p-5">
            <div className="w-10 h-10 bg-black flex items-center justify-center mx-auto mb-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2 text-center">
              Безопасная сделка
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Эскроу и гарантия возврата средств
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="border border-gray-200 p-5">
          <h2 className="text-xl font-bold text-black mb-5">
            Информация о домене
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Доменное имя *
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Ваш Email *
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

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Желаемая цена (₽)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPrice(
                    value ? parseInt(value).toLocaleString("ru-RU") : ""
                  );
                }}
                placeholder="100 000"
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-black mb-1.5">
                Описание домена
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Расскажите о вашем домене..."
                className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-500 focus:outline-none focus:border-black transition-all resize-none"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-green-600 text-sm mb-2">
                  <Check className="w-5 h-5" />
                  <span>Заявка отправлена!</span>
                </div>
                <p className="text-sm text-gray-700">
                  Мы свяжемся с вами в ближайшее время для оценки вашего домена
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="text-center py-4">
                <div className="text-red-600 text-sm mb-2">
                  Произошла ошибка при отправке. Попробуйте позже.
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        </div>

        {/* Process Info */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h2 className="text-xl font-bold text-black mb-4">Процесс продажи</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Анализ домена</h4>
                <p>Экспертная оценка рыночной стоимости</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">
                  Подготовка материалов
                </h4>
                <p>Создание описания и фотографий</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">
                  Публикация на площадке
                </h4>
                <p>Размещение домена в каталоге</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Переговоры</h4>
                <p>Связь с потенциальными покупателями</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">5</span>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Сделка</h4>
                <p>Трансфер домена покупателю</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Обычно процесс занимает от 3 до 7 дней в зависимости от сложности
              сделки
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-black p-8 text-center mt-8">
          <h2 className="text-2xl font-bold text-white mb-3">Есть вопросы?</h2>
          <p className="text-base text-gray-300 mb-4">
            Свяжитесь с нами для консультации по продаже вашего домена
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all"
            >
              Связаться с нами
            </Link>
            <Link
              href="/domains"
              className="px-6 py-2 bg-transparent border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Смотреть каталог доменов
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
