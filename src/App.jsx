import PokemonList from "./components/PokemonList";
import PokeballImage from "./assets/pokeball.png";

function App() {
  return (
    <main className="flex flex-col items-center gap-6 p-4">
      <aside className="flex flex-col gap-5 items-center">
        <div className="flex items-center gap-2">
          <img src={PokeballImage} alt="Pokeball picture" />
          <h1 className="font-bold text-4xl">
            <span className="text-yellow-300">Poké</span>
            Match
          </h1>
        </div>

        <div className="flex gap-5 backdrop-blur rounded px-5">
          <p className="text-3xl">SCORE: 5</p>
          <p className="text-3xl">HIGH SCORE: 7</p>
        </div>

        <div>
          <p className="text-4xl backdrop-blur rounded px-3">0 / 5</p>
        </div>
      </aside>

      <PokemonList cardsCount={5} />
    </main>
  );
}

export default App;
