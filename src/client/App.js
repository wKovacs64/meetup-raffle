import React from 'react';
import Header from './components/Header';
import Raffle from './components/Raffle';

const App = () => {
  return (
    <div className="flex flex-column h-100">
      <Header />
      <main className="flex flex-column flex-grow-1 flex-shrink-0 ph3 w-100 mw6-m mw7-l self-center-ns">
        <Raffle />
      </main>
    </div>
  );
};

App.displayName = 'App';

export default App;
