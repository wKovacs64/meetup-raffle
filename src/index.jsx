import * as React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';
import { loadDevTools } from './client/dev-tools/load';
import App from './client/App';
import './index.css';

loadDevTools(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const { worker } = await import('./mocks/browser');
    worker.start();
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );

  registerSW();
});
