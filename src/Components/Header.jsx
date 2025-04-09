import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./Header.module.css";

function Header() {
  const { queryType, dispatch } = usePokemonContext();
  return (
    <header className={styles.header}>
      <img
        src="/pokemon-logo.png"
        alt="Pokémon logo."
        className={styles.logo}
      />
      <input
        type={`${queryType === "Number" ? "number" : "text"}`}
        onChange={(e) =>
          dispatch({ type: "changeQuery", payload: e.target.value })
        }
        placeholder={`${
          queryType === "Number"
            ? "Pesquisar pokémon por número"
            : "Pesquisar pokémon por nome"
        }`}
        className={styles.searchInput}
      />
      <div
        className={styles.toogleQueryType}
        onClick={() => dispatch({ type: "changeQueryType" })}
      >
        {queryType === "Number" ? "#️⃣ Por número" : "🔖 Por nome"}
      </div>
    </header>
  );
}

export default Header;
