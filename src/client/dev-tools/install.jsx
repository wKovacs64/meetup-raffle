import { createRoot } from 'react-dom/client';

import DevTools from './DevTools';

export async function install() {
  const devToolsContainer = document.createElement('div');
  devToolsContainer.setAttribute('id', 'devToolsRoot');
  document.body.appendChild(devToolsContainer);
  const devToolsRoot = createRoot(devToolsContainer);
  devToolsRoot.render(<DevTools />);
}
