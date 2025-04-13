import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./PokemonNotFound.module.css";

function PokemonNotFound() {
  const { query } = usePokemonContext();
  return (
    <h2 className={styles.pokemonNotFound}>
      O pokémon {query} não foi encontrado.
    </h2>
  );
}

export default PokemonNotFound;
