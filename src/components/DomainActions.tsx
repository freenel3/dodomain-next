"use client";

import { useState } from 'react';
import ContactModal from './ContactModal';

interface DomainActionsProps {
  domainName: string;
  price: number;
}

export default function DomainActions({ domainName, price }: DomainActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'buy' | 'offer'>('buy');

  const openBuyModal = () => {
    setModalType('buy');
    setIsModalOpen(true);
  };

  const openOfferModal = () => {
    setModalType('offer');
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  return (
    <>
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domainName={domainName}
        type={modalType}
      />
      <div className="border border-gray-200 p-4 sticky top-20">
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Цена покупки</div>
          <div className="text-3xl font-display font-bold text-black mb-4 tracking-tight">{formatPrice(price)}</div>
          <button 
            onClick={openBuyModal}
            className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all mb-2"
          >
            Купить сейчас
          </button>
          <button 
            onClick={openOfferModal}
            className="w-full py-2.5 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all"
          >
            Сделать предложение
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-700">
          <div>✓ Безопасный перевод</div>
          <div>✓ Мгновенный перенос</div>
          <div>✓ Гарантия возврата</div>
        </div>
      </div>
    </>
  );
}
