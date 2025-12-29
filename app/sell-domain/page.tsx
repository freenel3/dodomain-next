export const metadata = {
  title: 'Продать домен - dodomain',
  description: 'Разместите свой домен на нашей площадке',
}

export default function SellDomainPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-4">Продать домен</h1>
      <p className="text-gray-600 mb-8">
        Разместите свой домен на крупнейшей площадке и найдите покупателя
      </p>

      <div className="bg-gray-50 border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">Как это работает</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-black mb-1">Оценка домена</h3>
              <p className="text-sm text-gray-600">
                Наши эксперты оценят ваш домен и предложат оптимальную цену
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-black mb-1">Размещение</h3>
              <p className="text-sm text-gray-600">
                Разместим ваш домен в каталоге с детальным описанием
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-black mb-1">Продажа</h3>
              <p className="text-sm text-gray-600">
                Мы найдем покупателя и проведем безопасную сделку
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Готовы продать свой домен?
        </h2>
        <p className="text-gray-300 mb-6">
          Заполните форму и мы свяжемся с вами для обсуждения деталей
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-all"
        >
          Связаться с нами
        </a>
      </div>
    </div>
  )
}
