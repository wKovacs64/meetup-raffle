/** @jsx jsx */
import 'tachyons';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { jsx, css, Global } from '@emotion/core';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StrictMode>
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
  </StrictMode>,
  document.getElementById('root'),
);
registerServiceWorker();
