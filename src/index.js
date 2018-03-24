import 'tachyons/css/tachyons.css';
import 'core-js/fn/object/entries';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
