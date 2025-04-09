import { usePokemonContext } from "../Context/PokemonProvider";
import Loader from "./Loader";
import styles from "./PokemonList.module.css";

function PokemonList() {
  const { pokemons, dispatch, isLoading, previousPage, nextPage } =
    usePokemonContext();
  return (
    <section className={styles.pokemonList}>
      <h1>Lista de Pokémons</h1>

      <ul className={styles.list}>
        {isLoading && <Loader />}
        {!isLoading &&
          pokemons.map((pokemon, index) => (
            <li className={styles.pokemon} key={`${pokemon}-${index}`}>
              <div className={styles.selectPokemon}></div>
              <div className={styles.container}>
                <p className={styles.pokemonName}>{pokemon.name}</p>
                <button
                  className={styles.btn}
                  onClick={() =>
                    dispatch({
                      type: "getDetailsPokemon",
                      payload: pokemon.url,
                    })
                  }
                >
                  Ver mais
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.pagination}>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: "getPreviousPage" })}
          disabled={previousPage === null}
        >
          Página Anterior
        </button>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: "getNextPage" })}
          disabled={nextPage === null}
        >
          Próxima Página
        </button>
      </div>
    </section>
  );
}

export default PokemonList;
