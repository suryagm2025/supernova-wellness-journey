
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/seniorMode.css';

// Add a listener to check if senior mode is enabled on app load
document.addEventListener('DOMContentLoaded', () => {
  const useSeniorMode = localStorage.getItem('useSeniorMode') === 'true';
  if (useSeniorMode) {
    document.documentElement.classList.add('senior-mode');
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
