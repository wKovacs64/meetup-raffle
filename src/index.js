import React from 'react';
import ReactDOM from 'react-dom';
import { loadDevTools } from './client/dev-tools/load';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';

loadDevTools(() => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { worker } = require('./mocks/browser');
    worker.start();
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );

  registerServiceWorker();
});
