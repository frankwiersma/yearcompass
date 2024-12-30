import React, { useState, useEffect } from 'react';
import { Bot, Download, AlertCircle, Copy } from 'lucide-react';
import { Modal } from './Modal';
import { AIReport } from './AIReport';
import { Toast } from './Toast';
import { LoadingSpinner } from './LoadingSpinner';
import { generatePDF } from '../utils/pdf';
import { generateYearAnalysis } from '../utils/gemini';
import { useProgress } from '../contexts/ProgressContext'; // Update this import
import { useLanguage } from '../hooks/useLanguage';

export function AIAnalysisButton() {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { progress, data } = useProgress(); // Use ProgressContext
  const { percentageComplete } = progress;

  // Reset report when progress changes
  useEffect(() => {
    if (report && percentageComplete < 10) {
      setReport(null);
    }
  }, [percentageComplete, report]);


  const handleAnalyze = async () => {
    if (percentageComplete < 10) {
      setError(t.ui.aiAnalysis.error.minimum);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysis = await generateYearAnalysis(data.answers);
      if (!analysis) {
        throw new Error('Failed to generate analysis');
      }
      setReport(analysis);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.ui.aiAnalysis.error.failed;
      console.error('Error generating analysis:', errorMessage);
      setError(`${t.ui.aiAnalysis.error.failed}${errorMessage}. ${t.ui.aiAnalysis.error.pleaseRetry}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('ai-report');
    if (!element) return;
    
    try {
      setIsGeneratingPDF(true);
      // Wait for any images to load
      await new Promise(resolve => setTimeout(resolve, 500));
      await generatePDF(element);
      setToastMessage(t.ui.aiAnalysis.toast.pdfSuccess);
      setShowToast(true);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCopyText = async () => {
    const element = document.getElementById('ai-report');
    if (!element) return;
    
    try {
      const text = element.innerText;
      await navigator.clipboard.writeText(text);
      setToastMessage(t.ui.aiAnalysis.toast.copySuccess);
      setShowToast(true);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          if (!report && percentageComplete >= 10) {
            // Small delay to ensure modal is visible first
            setTimeout(handleAnalyze, 100);
          }
        }}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 p-4 rounded-full
                   bg-gradient-to-r from-purple-600 to-blue-600 text-white
                   shadow-lg hover:shadow-xl transition-all duration-300
                   flex items-center justify-center group z-50
                   hover:scale-105 active:scale-95"
        aria-label={t.ui.aiAnalysis.button}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-2 py-1 text-sm font-medium text-white
                        bg-gray-900 rounded opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 whitespace-nowrap">
          {t.ui.aiAnalysis.button}
        </span>
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t.ui.aiAnalysis.title}
        className="max-w-4xl"
      >
        <div className="space-y-6">
          {percentageComplete < 10 ? (
            <div className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t.ui.aiAnalysis.incomplete.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.ui.aiAnalysis.incomplete.description}
                <br/>
                <span className="font-medium">{t.ui.aiAnalysis.incomplete.progress}{percentageComplete}%</span>
              </p>
            </div>
          ) : isAnalyzing ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t.ui.aiAnalysis.error.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {error}
              </p>
              <button 
                onClick={handleAnalyze} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t.ui.aiAnalysis.error.tryAgain}
              </button>
            </div>
          ) : report ? (
            <>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white
                           bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {t.ui.aiAnalysis.actions.copyText}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white
                           bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t.ui.aiAnalysis.actions.generatingPDF}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      {t.ui.aiAnalysis.actions.downloadPDF}
                    </>
                  )}
                </button>
              </div>
              <AIReport html={report} />
            </>
          ) : null}
        </div>
      </Modal>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}