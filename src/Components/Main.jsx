import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./Main.module.css";
import Loader from "./Loader";

function Main() {
  const { pokemon, isLoadingDetails } = usePokemonContext();
  return (
    <main className={styles.Main}>
      <PokemonList />
      {isLoadingDetails && <Loader />}
      {pokemon && <PokemonDetails />}
    </main>
  );
}

export default Main;
