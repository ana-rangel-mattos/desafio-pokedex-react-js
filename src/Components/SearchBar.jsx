import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const { query, queryType, dispatch } = usePokemonContext();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "searchPokemon" });
        }}
      >
        <input
          value={query}
          type={`${queryType === "Number" ? "number" : "text"}`}
          onChange={(e) => {
            e.preventDefault();
            dispatch({ type: "changeQuery", payload: e.target.value });
          }}
          placeholder={`${
            queryType === "Number"
              ? "Pesquisar pokémon por número"
              : "Pesquisar pokémon por nome"
          }`}
          className={styles.searchInput}
        />
      </form>
      <div
        className={styles.toogleQueryType}
        onClick={() => dispatch({ type: "changeQueryType" })}
      >
        {queryType === "Number" ? "#️⃣ Por número" : "🔖 Por nome"}
      </div>
    </>
  );
}

export default SearchBar;
