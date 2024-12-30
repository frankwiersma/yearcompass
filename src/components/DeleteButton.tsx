import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

type Props = {
  type: 'section' | 'category' | 'question';
  onDelete: () => void;
  itemName: string;
};

export function DeleteButton({ type, onDelete, itemName }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirm(true)}
        className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        title={`Delete ${type}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {showConfirm && (
        <div className="absolute z-50 right-0 top-6 w-64 p-3 bg-white dark:bg-gray-800 
                       rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Are you sure you want to delete this {type}:
            <span className="font-medium block mt-1">{itemName}</span>
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 
                        hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              className="px-2 py-1 text-xs text-white bg-red-500 hover:bg-red-600 
                        dark:bg-red-600 dark:hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}