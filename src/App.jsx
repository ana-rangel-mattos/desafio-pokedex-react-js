import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import PokemonProvider from "./Context/PokemonProvider";

function App() {
  return (
    <PokemonProvider>
      <Header />
      <Main />
    </PokemonProvider>
  );
}

export default App;
