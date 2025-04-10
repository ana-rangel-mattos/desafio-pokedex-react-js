import Button from "./Button";
import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";

function Header() {
  const { dispatch } = usePokemonContext();
  return (
    <header className={styles.header}>
      <img
        src="/pokemon-logo.png"
        alt="Pokémon logo."
        className={styles.logo}
      />
      <div className={styles.container}>
        <SearchBar />
        <Button onClick={() => dispatch({ type: "searchPokemon" })}>
          Buscar
        </Button>
      </div>
    </header>
  );
}

export default Header;
