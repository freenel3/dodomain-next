export const metadata = {
  title: 'О нас - dodomain',
  description: 'dodomain - ведущая площадка для покупки и продажи премиум доменов',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-6">О нас</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 leading-relaxed mb-6">
          dodomain — это ведущая площадка для покупки и продажи премиум доменных имен.
          Мы помогаем инвесторам, предпринимателям и компаниям находить идеальные домены
          для своих проектов.
        </p>

        <h2 className="text-2xl font-bold text-black mt-8 mb-4">Наша миссия</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Сделать процесс покупки и продажи доменов простым, безопасным и прозрачным.
          Мы предоставляем инструменты для оценки доменов, безопасных транзакций и
          экспертной поддержки.
        </p>

        <h2 className="text-2xl font-bold text-black mt-8 mb-4">Почему мы</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <span className="text-black font-bold">•</span>
            <span>Более 500,000 премиум доменов в нашей базе</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-black font-bold">•</span>
            <span>Безопасные транзакции с защитой эскроу</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-black font-bold">•</span>
            <span>Экспертная оценка и консультации</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-black font-bold">•</span>
            <span>Поддержка 24/7</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
