import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from './DevTools';

export const install = async () => {
  const devToolsRoot = document.createElement('div');
  devToolsRoot.setAttribute('id', 'devToolsRoot');
  document.body.appendChild(devToolsRoot);
  ReactDOM.render(<DevTools />, devToolsRoot);
};
