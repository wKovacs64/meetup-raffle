import React from 'react';
import ReactDOM from 'react-dom';
import { loadDevTools } from './client/dev-tools/load';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';

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

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});
