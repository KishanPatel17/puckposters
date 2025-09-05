import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';

// ---- Mobile debug console (eruda) — loads ONLY when URL has ?debug ----
(function () {
  try {
    if (new URLSearchParams(window.location.search).has('debug')) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/eruda';
      s.onload = () => { window.eruda?.init(); };
      document.body.appendChild(s);
    }
  } catch {}
})();
// -----------------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
