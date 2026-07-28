import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import './index.css';

const rootElement = document.getElementById('root')!;
// Cloudflare injects crawlable article HTML for bots and no-JS visitors.
// React owns the container once the interactive application starts.
rootElement.replaceChildren();

createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
