import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const { worker } = require('./test/mocks');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

registerServiceWorker();
