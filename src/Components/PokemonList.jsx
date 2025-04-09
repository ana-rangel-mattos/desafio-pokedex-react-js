import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./PokemonList.module.css";

function PokemonList() {
  const { pokemons, dispatch, isLoading } = usePokemonContext();
  return (
    <section className={styles.pokemonList}>
      <h1>Lista de Pokémons</h1>

      <ul>
        {!isLoading &&
          pokemons.map((pokemon, index) => (
            <li className={styles.pokemon} key={`${pokemon}-${index}`}>
              <div className={styles.selectPokemon}></div>
              <div className={styles.container}>
                <p className={styles.pokemonName}>{pokemon.name}</p>
                <button
                  className={styles.showMore}
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
    </section>
  );
}

export default PokemonList;
