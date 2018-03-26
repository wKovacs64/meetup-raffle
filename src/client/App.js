import React from 'react';
import { Header, RaffleContainer } from './components';

const App = () => (
  <div className="flex flex-column h-100">
    <Header />
    <RaffleContainer />
  </div>
);

App.displayName = 'App';

export default App;
