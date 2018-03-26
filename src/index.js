import 'tachyons/css/tachyons.css';
import 'core-js/fn/object/entries';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html,
  body,
  #root {
    height: 100%;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
