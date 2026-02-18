import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Nova Studio: Starting boot sequence...');

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Nova Studio: React successfully mounted to DOM.');
  } catch (err) {
    console.error('Nova Studio: Critical mounting error:', err);
    
    // Fallback UI in case of a crash
    rootElement.innerHTML = `
      <div style="padding: 40px; color: #22D3EE; font-family: sans-serif; background: #0B0D12; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <h1 style="color: #fff; margin-bottom: 20px;">Interface Failed to Load</h1>
        <p style="color: #94A3B8; max-width: 500px; margin-bottom: 24px;">The application encountered a critical error during startup. Please check the browser console for more details.</p>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); font-family: monospace; font-size: 0.85rem; text-align: left; max-width: 90%; overflow: auto;">
          ${err instanceof Error ? err.message : String(err)}
        </div>
        <button onclick="window.location.reload()" style="margin-top: 30px; background: #fff; color: #0B0D12; border: none; padding: 12px 24px; border-radius: 99px; font-weight: bold; cursor: pointer;">
          Try Again
        </button>
      </div>
    `;
  }
} else {
  console.error('Nova Studio: #root container missing from index.html.');
}