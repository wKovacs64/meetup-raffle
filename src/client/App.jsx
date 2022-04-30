import Header from './components/Header';
import Raffle from './components/Raffle';

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
