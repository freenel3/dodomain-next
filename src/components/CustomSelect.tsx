"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  maxVisibleOptions?: number;
}

export default function CustomSelect({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Выберите...',
  maxVisibleOptions = 5
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const optionHeight = 40; // Height of each option in pixels
  const maxHeight = optionHeight * maxVisibleOptions;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm focus:outline-none focus:border-black transition-all flex items-center justify-between text-left"
      >
        <span className={value ? '' : 'text-gray-500'}>{displayText}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg"
          style={{ 
            maxHeight: `${maxHeight}px`,
            overflowY: 'auto'
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                value === option.value ? 'bg-gray-100 font-medium' : ''
              }`}
              style={{ height: `${optionHeight}px` }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
