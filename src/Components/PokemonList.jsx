import { usePokemonContext } from "../Context/PokemonProvider";
import Button from "./Button";
import Loader from "./Loader";
import styles from "./PokemonList.module.css";
import Error from "./Error";

function PokemonList() {
  const {
    pokemon: pokemon1,
    pokemon2,
    pokemons,
    dispatch,
    isLoading,
    previousPage,
    nextPage,
    errorPokemonList,
  } = usePokemonContext();
  return (
    <section className={styles.pokemonList}>
      <h1>Lista de Pokémons</h1>

      <ul className={styles.list}>
        {isLoading && <Loader />}
        {errorPokemonList && <Error error={errorPokemonList} />}
        {!isLoading &&
          pokemons.map((pokemon, index) => (
            <li className={styles.pokemon} key={`${pokemon}-${index}`}>
              <div className={styles.bulletPoint}></div>
              <div className={styles.container}>
                <p className={styles.pokemonName}>{pokemon.name}</p>
                <div className={styles.container2}>
                  {pokemon1 && (
                    <Button
                      onClick={() =>
                        dispatch({
                          type: "selectToCompare",
                          payload: pokemon.url,
                        })
                      }
                    >
                      Comparar
                    </Button>
                  )}
                  {!pokemon2 && (
                    <Button
                      onClick={() =>
                        dispatch({
                          type: "getDetailsPokemon",
                          payload: pokemon.url,
                        })
                      }
                    >
                      Ver mais
                    </Button>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.pagination}>
        <Button
          onClick={() => dispatch({ type: "getPreviousPage" })}
          disabled={previousPage === null}
        >
          Página Anterior
        </Button>
        <Button
          onClick={() => dispatch({ type: "getNextPage" })}
          disabled={nextPage === null}
        >
          Próxima Página
        </Button>
      </div>
    </section>
  );
}

export default PokemonList;
