'use client';

import Script from 'next/script';

declare global {
  interface Window {
    lvevInitializePage?: () => void;
  }
}

function initializeEvaluationPage() {
  window.lvevInitializePage?.();
}

export default function EvaluationInteractions() {
  return (
    <Script
      src="/assets/js/live/evaluation.js"
      strategy="afterInteractive"
      onReady={initializeEvaluationPage}
    />
  );
}
