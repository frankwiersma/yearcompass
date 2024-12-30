import React, { useState, useEffect } from 'react';
import { Info, Twitter, Github, Compass, BookOpen, Heart } from 'lucide-react';
import { RoundButton } from './RoundButton';
import { Modal } from './Modal';
import { useLanguage } from '../hooks/useLanguage';

export function InfoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleOpen = () => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    setIsOpen(false);
  };

  return (
    <>
      <RoundButton
        icon={Info}
        label={t.ui.about.title}
        onClick={handleOpen}
        iconClassName="text-blue-600 dark:text-blue-400"
      />

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={t.ui.about.title}
      >
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <section className="text-center mb-8">
            <Compass className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">YearCompass</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your guided journey through annual reflection</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">{t.ui.about.dataPrivacy.title}</h3>
            <p className="leading-relaxed">
              {t.ui.about.dataPrivacy.content}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">{t.ui.about.shortcuts.title}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Tab</kbd>
                <span>{t.ui.about.shortcuts.moveQuestions}</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">{t.ui.about.autoSave.title}</h3>
            <p className="leading-relaxed">
              {t.ui.about.autoSave.content}
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">{t.ui.about.yearCompass.title}</h3>
            <p className="leading-relaxed mb-4">
              {t.ui.about.yearCompass.description}
            </p>
            <div className="space-y-2">
              <a
                href="https://yearcompass.osint-app.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 
                       dark:hover:text-blue-400 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Visit YearCompass
              </a>
              <a
                href="https://github.com/frankwiersma/yearcompass"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 
                       dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                Open Source
              </a>
              <a
                href="https://yearcompass.osint-app.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 
                       dark:hover:text-blue-400 transition-colors"
              >
                <Heart className="w-5 h-5" />
                Support Us
              </a>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Made By</h3>
            <div className="space-y-2">
              <a
                href="https://x.com/frankwiersma_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 
                       dark:hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                @frankwiersma_
              </a>
              <a
                href="https://github.com/frankwiersma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 
                       dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                @frankwiersma
              </a>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
}