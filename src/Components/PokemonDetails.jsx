import DetailsField from "./DetailsField";
import { usePokemonContext } from "../Context/PokemonProvider";
import styles from "./PokemonDetails.module.css";
import DetailsSubtitle from "./DetailsSubtitle";

function PokemonDetails() {
  const { pokemon, dispatch } = usePokemonContext();

  const sumStats = pokemon["stats"].reduce(
    (accumulator, currentValue) => accumulator + currentValue.base_stat,
    0
  );

  if (!pokemon) return <h2>Nenhum pokémon selecionado.</h2>;

  return (
    <section className={styles.pokemonDetails}>
      <button
        className={styles.closeBtn}
        onClick={() => dispatch({ type: "closeDetails" })}
      >
        &times;
      </button>
      <h2 className={styles.title}>Detalhes sobre {pokemon["species"].name}</h2>
      <img
        className={styles.img}
        src={pokemon["sprites"].front_default}
        alt={`Imagem do ${pokemon["species"].name}`}
      />
      <DetailsField>
        <DetailsSubtitle>Experiência base:</DetailsSubtitle>
        <p>{pokemon["base_experience"]}</p>
      </DetailsField>
      <DetailsField>
        <DetailsSubtitle>Altura:</DetailsSubtitle> <p>{pokemon["height"]}</p>
      </DetailsField>
      <DetailsField>
        <DetailsSubtitle>Peso:</DetailsSubtitle> <p>{pokemon["weight"]}</p>
      </DetailsField>
      <DetailsField>
        <DetailsSubtitle>Habilidades:</DetailsSubtitle>
        {pokemon["abilities"].map((item, index) => (
          <p key={`${item}${index}`}>{item["ability"].name}</p>
        ))}
      </DetailsField>

      <DetailsField>
        <DetailsSubtitle>Stats: </DetailsSubtitle>
      </DetailsField>
      <ul className={styles.statsContainer}>
        {pokemon["stats"].map((stat, index) => (
          <li key={`${stat}-${index}`}>
            <strong>{stat.stat.name.toUpperCase()}:</strong> Estatística básica:{" "}
            {stat.base_stat} - Esforço: {stat.effort}
          </li>
        ))}
        <li>
          <DetailsSubtitle>Soma das Estatísticas:</DetailsSubtitle> {sumStats}
        </li>
      </ul>
    </section>
  );
}

export default PokemonDetails;
