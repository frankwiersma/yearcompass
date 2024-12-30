import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Modal } from './Modal';

export function AIAnalysisButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 p-4 rounded-full
                   bg-gradient-to-r from-purple-600 to-blue-600 text-white
                   shadow-lg hover:shadow-xl transition-all duration-300
                   flex items-center justify-center group z-50
                   hover:scale-105 active:scale-95"
        aria-label="AI Analysis"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-2 py-1 text-sm font-medium text-white
                        bg-gray-900 rounded opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 whitespace-nowrap">
          AI Analysis
        </span>
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="AI Analysis"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center py-8">
            <Bot className="w-16 h-16 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            AI Analysis feature is coming soon! This will provide personalized insights
            based on your reflection answers.
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">
              Planned Features
            </h3>
            <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
              <li>• Pattern recognition across answers</li>
              <li>• Emotional tone analysis</li>
              <li>• Personalized growth recommendations</li>
              <li>• Interactive visualization of insights</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
}