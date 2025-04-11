import { usePokemonContext } from "../Context/PokemonProvider";
import CloseButton from "./CloseButton";
import styles from "./ComparePokemons.module.css";
import DetailsField from "./DetailsField";
import DetailsSubtitle from "./DetailsSubtitle";
import PokemonImage from "./PokemonImage";

function ComparePokemons() {
  const { pokemon, pokemon2, dispatch } = usePokemonContext();

  const sumStatsPokemon1 = pokemon["stats"].reduce(
    (accumulator, currentValue) => accumulator + currentValue.base_stat,
    0
  );

  const sumStatsPokemon2 = pokemon2["stats"].reduce(
    (accumulator, currentValue) => accumulator + currentValue.base_stat,
    0
  );

  return (
    <section className={styles.comparePokemons}>
      <CloseButton onClick={() => dispatch({ type: "closeDetails" })}>
        &times;
      </CloseButton>
      <h2 className={styles.title}>Comparador de Pokémons</h2>
      <div className={styles.pokemon}>
        <div className={styles.container}>
          <h2 className={styles.name1}>{pokemon["species"].name}</h2>
          <PokemonImage
            src={pokemon["sprites"].front_default}
            alt={`Imagem do ${pokemon["species"].name}`}
          />
        </div>
        <p>
          <DetailsSubtitle>Soma dos Status: </DetailsSubtitle>{" "}
          {sumStatsPokemon1}
        </p>
      </div>
      <p className={styles.versus}>Versus</p>
      <div className={styles.pokemon}>
        <div className={styles.container}>
          <h2 className={styles.name2}>{pokemon2["species"].name}</h2>
          <PokemonImage
            src={pokemon2["sprites"].front_default}
            alt={`Imagem do ${pokemon2["species"].name}`}
          />
        </div>
        <p className={styles.stats}>
          <DetailsSubtitle>Soma dos Status: </DetailsSubtitle>
          {sumStatsPokemon2}
        </p>
      </div>

      {sumStatsPokemon1 !== sumStatsPokemon2 ? (
        <h3>
          {sumStatsPokemon1 > sumStatsPokemon2
            ? pokemon["species"].name
            : pokemon2["species"].name}{" "}
          tem a soma de status maior por{" "}
          {sumStatsPokemon1 > sumStatsPokemon2
            ? sumStatsPokemon1 - sumStatsPokemon2
            : sumStatsPokemon2 - sumStatsPokemon1}{" "}
          pontos.
        </h3>
      ) : (
        <h3>Houve um empate.</h3>
      )}
    </section>
  );
}

export default ComparePokemons;
