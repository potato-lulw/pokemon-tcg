import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BenchCardsProvider } from './contexts/BenchCardContext';
import { OppBenchCardsProvider } from './contexts/OpponentCardContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BenchCardsProvider>
      <OppBenchCardsProvider>

      <App />
      </OppBenchCardsProvider>
    </BenchCardsProvider>
  </React.StrictMode>
);



