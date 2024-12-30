import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Section } from '../types';

type Props = {
  type: 'section' | 'category' | 'question';
  sections: Section[];
  currentSection?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
};

export function AddForm({ type, sections, currentSection, onSubmit, onCancel }: Props) {
  const [value, setValue] = useState('');
  const [selectedSection, setSelectedSection] = useState(currentSection || sections[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = sections.find(s => s.id === selectedSection)?.categories || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      switch (type) {
        case 'section':
          onSubmit(value.trim());
          break;
        case 'category':
          onSubmit(value.trim(), selectedSection);
          break;
        case 'question':
          onSubmit(value.trim(), selectedSection, selectedCategory);
          break;
      }
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Add New {type.charAt(0).toUpperCase() + type.slice(1)}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {type !== 'section' && <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Add to Section
        </label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 
                   dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent text-gray-900 dark:text-gray-100"
        >
          {sections.map(section => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>}
      {type === 'question' && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Add to Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 
                     dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent text-gray-900 dark:text-gray-100"
            required
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          type === 'section' ? 'Enter section name...' :
          type === 'category' ? 'Enter category name...' :
          'Enter question text...'
        }
        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 
                 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 
                 focus:border-transparent text-gray-900 dark:text-gray-100"
        autoFocus
      />
      <div className="flex justify-end gap-2 mt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100
                    dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700
                    dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </form>
  );
}