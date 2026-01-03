"use client";

import { useState } from 'react';
import { ShoppingCart, Mail } from 'lucide-react';

interface PurchaseButtonProps {
  domainName: string;
  price: string;
}

export function PurchaseButton({ domainName, price }: PurchaseButtonProps) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  return (
    <div className="border border-gray-200 p-5 sticky top-4">
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600 mb-1">Стоимость домена</div>
        <div className="text-3xl font-display font-bold text-black tracking-tight">
          {price}
        </div>
      </div>

      <button
        onClick={() => setShowContactInfo(!showContactInfo)}
        className="w-full px-5 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-3"
      >
        <ShoppingCart className="w-4 h-4" />
        Купить домен
      </button>

      {showContactInfo && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <Mail className="w-4 h-4" />
            <span className="font-medium">Свяжитесь с нами:</span>
          </div>
          <a
            href="mailto:info@dodomain.ru"
            className="text-sm text-black underline hover:no-underline"
          >
            info@dodomain.ru
          </a>
          <div className="mt-3 text-xs text-gray-600">
            Укажите домен <strong>{domainName}</strong> в теме письма
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"></div>
            <span>Безопасная сделка через эскроу</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"></div>
            <span>Полное юридическое сопровождение</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"></div>
            <span>Гарантия передачи прав</span>
          </div>
        </div>
      </div>
    </div>
  );
}
