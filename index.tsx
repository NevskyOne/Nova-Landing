import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Nova Studio: Starting initialization...');

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Nova Studio: Rendered to DOM.');
  } catch (err) {
    console.error('Nova Studio: Render error:', err);
  }
} else {
  console.error('Nova Studio: Root element not found.');
}