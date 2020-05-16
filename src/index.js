/** @jsx jsx */
import 'tachyons';
import React from 'react';
import ReactDOM from 'react-dom';
import { jsx, css, Global } from '@emotion/core';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        html,
        body,
        #root {
          height: 100%;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

registerServiceWorker();
