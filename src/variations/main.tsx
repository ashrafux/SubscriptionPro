import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeaderVariations } from './HeaderVariations';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderVariations />
  </StrictMode>,
);
