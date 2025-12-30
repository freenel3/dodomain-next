'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const faqCategories = [
  {
    name: 'Покупка доменов',
    questions: [
      {
        q: 'Как купить домен на dodomain?',
        a: 'Для покупки домена найдите нужный домен в каталоге, нажмите "Купить домен" и заполните контактную форму. Наш менеджер свяжется с вами для оформления сделки через безопасный эскроу-сервис.',
      },
      {
        q: 'Как происходит передача домена?',
        a: 'После оплаты мы инициируем передачу домена через официальный регистратор. Вы получите инструкции по созданию аккаунта и подтверждению передачи. Обычно процесс занимает 1-3 дня.',
      },
      {
        q: 'Можно ли купить домен в рассрочку?',
        a: 'Да, для доменов стоимостью от 100 000 ₽ мы предлагаем рассрочку на срок до 6 месяцев. Свяжитесь с нами для обсуждения условий.',
      },
      {
        q: 'Какие способы оплаты принимаются?',
        a: 'Мы принимаем банковские карты (Visa, MasterCard, МИР), банковские переводы и электронные кошельки. Оплата проходит через защищенный платежный шлюз.',
      },
    ],
  },
  {
    name: 'Продажа доменов',
    questions: [
      {
        q: 'Как продать домен на dodomain?',
        a: 'Заполните форму на странице "Продать домен" или отправьте домен на оценку по email info@dodomain.ru. Наши эксперты оценят домен и предложат оптимальную цену.',
      },
      {
        q: 'Как происходит оценка домена?',
        a: 'Оценка включает анализ истории домена, его трафика, позиций в поисковиках, схожих продаж и рыночной ситуации. Обычно оценка занимает 1-2 рабочих дня.',
      },
      {
        q: 'Какая комиссия за продажу домена?',
        a: 'Комиссия составляет 10% от стоимости домена, но не менее 5 000 ₽. Комиссия взимается только при успешной продаже.',
      },
      {
        q: 'Можно ли продать домен с историей?',
        a: 'Да, мы принимаем домены с историей. Однако домены с негативной историей (спам, санкции) могут быть отклонены или оценены ниже.',
      },
    ],
  },
  {
    name: 'Безопасность',
    questions: [
      {
        q: 'Как гарантируется безопасность сделки?',
        a: 'Все сделки проходят через эскроу-сервис. Деньги покупателя блокируются на гарантийном счете до успешной передачи домена. Это защищает обе стороны.',
      },
      {
        q: 'Что такое эскроу?',
        a: 'Эскроу (escrow) — это услуга безопасного проведения сделок, когда посредник держит средства до выполнения условий договора. В нашем случае — до передачи домена.',
      },
      {
        q: 'Мои данные конфиденциальны?',
        a: 'Да, мы не раскрываем личную информацию участников сделки. WHOIS-данные могут быть скрыты по желанию покупателя.',
      },
      {
        q: 'Что делать при возникновении спора?',
        a: 'При споре эскроу-сервис проводит расследование на основе предоставленных доказательств. Решение принимается в соответствии с правилами сервиса.',
      },
    ],
  },
  {
    name: 'Общие вопросы',
    questions: [
      {
        q: 'Как связаться с поддержкой?',
        a: 'Вы можете связаться с нами через форму обратной связи, по email info@dodomain.ru или по телефону +7 (800) 555-35-35. Поддержка работает 24/7.',
      },
      {
        q: 'Можно ли вернуть домен после покупки?',
        a: 'Возврат домена возможен только в случае выявления существенных скрытых дефектов, о которых продавец не сообщил. Обычный возврат не предусмотрен.',
      },
      {
        q: 'Какие доменные зоны вы работаете с?',
        a: 'Мы работаем со всеми популярными зонами: .com, .ru, .рф, .net, .org, .io и многими другими. Каталог содержит домены в 50+ зонах.',
      },
      {
        q: 'Есть ли гарантия на домен?',
        a: 'Мы гарантируем, что домен свободен от обременений и может быть передан покупателю. Однако мы не гарантируем будущую доходность или SEO-эффект.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<{
    category: number
    question: number
  } | null>(null)

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    if (
      openQuestion?.category === categoryIndex &&
      openQuestion?.question === questionIndex
    ) {
      setOpenQuestion(null)
    } else {
      setOpenQuestion({ category: categoryIndex, question: questionIndex })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Часто задаваемые вопросы
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Ответы на популярные вопросы о покупке, продаже и работе с доменами
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {category.questions.map((item, questionIndex) => {
                  const isOpen =
                    openQuestion?.category === categoryIndex &&
                    openQuestion?.question === questionIndex
                  return (
                    <div
                      key={questionIndex}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        onClick={() =>
                          toggleQuestion(categoryIndex, questionIndex)
                        }
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-700 font-light">{item.a}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-black rounded-xl p-8 text-white text-center">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-gray-300 mb-6 font-light">
            Наша команда поддержки готова помочь вам с любым вопросом
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors"
          >
            Связаться с поддержкой
          </Link>
        </div>
      </div>
    </div>
  )
}
