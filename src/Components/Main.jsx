import PokemonList from "./PokemonList";
import styles from "./Main.module.css";

function Main() {
  return (
    <main className={styles.Main}>
      <PokemonList />
    </main>
  );
}

export default Main;
