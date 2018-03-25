import React from 'react';
import { Header, RaffleContainer } from './components';

const App = () => (
  <div className="flex flex-column">
    <Header />
    <RaffleContainer />
  </div>
);

App.displayName = 'App';

export default App;
