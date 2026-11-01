import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StatsOptions } from './StatsOptions';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StatsOptions />
  </StrictMode>,
);
