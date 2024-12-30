import React from 'react';

type Props = {
  html: string;
};

export function AIReport({ html }: Props) {
  // Strip markdown code block markers and any trailing template comments
  const cleanHtml = html
    .replace(/^```html\s*/, '')
    .replace(/\s*```$/, '')
    .replace(/This HTML document.*$/, '')
    .trim();

  return (
    <div 
      id="ai-report"
      className="bg-white text-gray-900 rounded-lg shadow-inner p-6 max-h-[70vh] overflow-y-auto print:max-h-none print:overflow-visible"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}