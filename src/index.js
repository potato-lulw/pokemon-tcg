import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BenchCardsProvider } from './contexts/BenchCardContext';
import { OppBenchCardsProvider } from './contexts/OpponentCardContext';
import { P1HandCardProvider } from './contexts/P1HandCardContext';
import { P2HandCardProvider } from './contexts/P2HandCardContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <P1HandCardProvider>
      <P2HandCardProvider>

        <BenchCardsProvider>
          <OppBenchCardsProvider>

            <App />
          </OppBenchCardsProvider>
        </BenchCardsProvider>
      </P2HandCardProvider>

    </P1HandCardProvider>
  </React.StrictMode>
);



