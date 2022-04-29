import ReactDOM from 'react-dom';
import DevTools from './DevTools';

export async function install() {
  const devToolsRoot = document.createElement('div');
  devToolsRoot.setAttribute('id', 'devToolsRoot');
  document.body.appendChild(devToolsRoot);
  ReactDOM.render(<DevTools />, devToolsRoot);
}
