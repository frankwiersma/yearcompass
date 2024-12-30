import React, { useEffect } from 'react';
import { Info } from 'lucide-react';

type Props = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

export function Toast({ message, isVisible, onClose }: Props) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 lg:bottom-28 lg:right-8 z-50 animate-slide-up">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-400" />
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}