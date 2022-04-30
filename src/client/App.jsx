import Header from './header';
import Raffle from './raffle/raffle';
import './app.css';

export default function App() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4">
        <Raffle />
      </main>
    </div>
  );
}
