import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('Nova Studio: Initializing application...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Nova Studio: Target container 'root' not found in index.html");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Nova Studio: Application mounted successfully.');
} catch (error) {
  console.error('Nova Studio: Failed to mount application', error);
}