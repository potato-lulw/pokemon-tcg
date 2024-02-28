import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BenchCardsProvider } from './contexts/BenchCardContext';
import { OppBenchCardsProvider } from './contexts/OpponentCardContext';
import { P1HandCardProvider } from './contexts/P1HandCardContext';
import { P2HandCardProvider } from './contexts/P2HandCardContext';
import { P1ActiveCardProvider } from './contexts/P1ActiveCardContext';
import { EffectRotationProvider } from './contexts/EffectsRoationsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EffectRotationProvider>

      <P1ActiveCardProvider>
        <P1HandCardProvider>
          <P2HandCardProvider>

            <BenchCardsProvider>
              <OppBenchCardsProvider>

                <App />
              </OppBenchCardsProvider>
            </BenchCardsProvider>


          </P2HandCardProvider>

        </P1HandCardProvider>
      </P1ActiveCardProvider>
    </EffectRotationProvider>
  </React.StrictMode>
);



