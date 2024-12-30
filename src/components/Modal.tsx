import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ isOpen, onClose, title, children, className = '' }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full p-8 relative
                      animate-fade-in ${className}`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-500 
                     dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {title}
          </h2>
          
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}