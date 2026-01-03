"use client";

import { useState } from "react";
import ContactModal from "@/components/ui/ContactModal";
import { Check, Mail } from "lucide-react";

interface DomainInteractionsProps {
  domainName: string;
}

export default function DomainInteractions({ domainName }: DomainInteractionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"buy" | "offer">("buy");

  const openBuyModal = () => {
    setModalType("buy");
    setIsModalOpen(true);
  };

  const openOfferModal = () => {
    setModalType("offer");
    setIsModalOpen(true);
  };

  return (
    <>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domainName={domainName}
        type={modalType}
      />
      
      <button
        onClick={openBuyModal}
        className="w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all mb-2 flex items-center justify-center gap-2"
      >
        <Check className="w-4 h-4" />
        Купить сейчас
      </button>
      <button
        onClick={openOfferModal}
        className="w-full py-2.5 bg-white border border-black text-black text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Сделать предложение
      </button>
    </>
  );
}
