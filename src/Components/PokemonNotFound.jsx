import { usePokemonContext } from "../Context/PokemonProvider";

function PokemonNotFound() {
  const { query } = usePokemonContext();
  return <h2>O pokémon {query} não foi encontrado.</h2>;
}

export default PokemonNotFound;
