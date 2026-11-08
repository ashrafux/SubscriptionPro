import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Home2Options } from './Home2Options';
import '../../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home2Options />
  </StrictMode>,
);
