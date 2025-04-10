import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import PokemonNotFound from "./PokemonNotFound";
import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./Main.module.css";
import Loader from "./Loader";

function Main() {
  const { pokemon, errorDetails, isLoadingDetails } = usePokemonContext();
  return (
    <main className={styles.Main}>
      <PokemonList />
      {isLoadingDetails && <Loader />}
      {pokemon && <PokemonDetails />}
      {errorDetails && <PokemonNotFound />}
    </main>
  );
}

export default Main;
