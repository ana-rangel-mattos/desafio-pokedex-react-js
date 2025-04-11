import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import PokemonNotFound from "./PokemonNotFound";
import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./Main.module.css";
import Loader from "./Loader";
import ComparePokemons from "./ComparePokemons";

function Main() {
  const { pokemon, pokemon2, errorDetails, isLoadingDetails } =
    usePokemonContext();
  return (
    <main className={styles.Main}>
      <PokemonList />
      {isLoadingDetails && <Loader />}
      {!pokemon2 && pokemon && <PokemonDetails />}
      {pokemon && pokemon2 && <ComparePokemons />}
      {errorDetails && <PokemonNotFound />}
    </main>
  );
}

export default Main;
