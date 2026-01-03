"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Ссылка скопирована в буфер обмена");
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="text-gray-400 hover:text-black transition-colors"
      aria-label="Поделиться"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}
