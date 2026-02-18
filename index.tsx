import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Nova Studio: System Online');
  } catch (err) {
    console.error('Nova Studio: Mounting failed', err);
    rootElement.innerHTML = `
      <div style="padding: 2rem; color: #22D3EE; background: #0B0D12; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
        <div style="max-width: 400px; text-align: center;">
          <h1 style="color: white;">Initialization Error</h1>
          <p style="color: #94A3B8;">The studio interface failed to initialize. Please check the connection or refresh the page.</p>
          <pre style="text-align: left; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-size: 0.8rem; overflow: auto;">${err}</pre>
        </div>
      </div>
    `;
  }
}