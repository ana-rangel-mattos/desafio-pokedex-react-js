import { usePokemonContext } from "../Context/PokemonProvider";

function PokemonDetails() {
  const { pokemon } = usePokemonContext();

  if (!pokemon) return <h2>Nenhum pokémon selecionado.</h2>;

  return (
    <section>
      <h1>Detalhes sobre {pokemon["species"].name}</h1>
      <img
        src={pokemon["sprites"].front_default}
        alt={`Imagem do ${pokemon["species"].name}`}
      />
      <h2>Stats: </h2>
      <ul>
        {pokemon["stats"].map((stat, index) => (
          <p key={`${stat}-${index}`}>
            {stat.stat.name} - Base stat: {stat.base_stat} - Effort:{" "}
            {stat.effort}
          </p>
        ))}
      </ul>
    </section>
  );
}

export default PokemonDetails;
