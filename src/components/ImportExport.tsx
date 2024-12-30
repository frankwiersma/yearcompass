import React from 'react';
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { ReflectionData } from '../types';
import { RoundButton } from './RoundButton';
import { useLanguage } from '../hooks/useLanguage';

type Props = {
  data: ReflectionData;
  onImport: (data: ReflectionData) => void;
  onReset: () => void;
};

export function ImportExport({ data, onImport, onReset }: Props) {
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const { t } = useLanguage();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reflection-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        onImport(imported);
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error importing file. Please make sure it\'s a valid reflection data file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <RoundButton
        icon={Download}
        label={t.ui.import.export}
        onClick={handleExport}
        iconClassName="text-blue-600 dark:text-blue-400"
      />
      <RoundButton
        as="label"
        icon={Upload}
        label={t.ui.import.import}
        iconClassName="text-blue-600 dark:text-blue-400"
      >
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </RoundButton>
      <RoundButton
        icon={Trash2}
        label={t.ui.import.reset}
        onClick={() => setShowResetConfirm(true)}
        iconClassName="text-red-500 dark:text-red-400"
      />

      {showResetConfirm && (
        <div className="absolute left-0 bottom-14 w-72 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl
                      border border-gray-200 dark:border-gray-700 z-60">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.ui.import.confirmReset}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t.ui.import.confirmResetDescription}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100
                        dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              {t.ui.navigation.cancel}
            </button>
            <button
              onClick={() => {
                onReset();
                setShowResetConfirm(false);
              }}
              className="px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700
                        dark:bg-red-500 dark:hover:bg-red-600 rounded-md transition-colors"
            >
              {t.ui.navigation.delete}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}