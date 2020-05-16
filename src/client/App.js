import React from 'react';
import Header from './components/Header';
import RaffleContainer from './components/RaffleContainer';

const App = () => (
  <div className="flex flex-column h-100">
    <Header />
    <RaffleContainer />
  </div>
);

App.displayName = 'App';

export default App;
