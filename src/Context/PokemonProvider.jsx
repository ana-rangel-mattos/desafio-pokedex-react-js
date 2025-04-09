import { useContext, createContext, useReducer, useEffect } from "react";

export const PokemonContext = createContext();

const initialState = {
  queryType: "Number",
  query: "",
  pokemons: [],
  pokemonUrl: "",
  isLoading: true,
  nextPage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "changeQueryType":
      return {
        ...state,
        queryType: state.queryType === "Number" ? "Name" : "Number",
      };
    case "changeQuery":
      return { ...state, query: action.payload };
    case "dataReceived":
      return {
        ...state,
        pokemons: action.payload.results,
        nextPage: action.payload.next,
        isLoading: false,
      };
    case "getDetailsPokemon":
      return { ...state, pokemonUrl: action.payload };
  }
}

export function PokemonProvider({ children }) {
  const [{ queryType, query, pokemons, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function handlePokemons() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20`);
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: { results: data.results, next: data.next },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    handlePokemons();
  }, []);

  const sharedStates = {
    query,
    queryType,
    dispatch,
    pokemons,
    isLoading,
  };

  return (
    <PokemonContext.Provider value={sharedStates}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);

  if (context === undefined) {
    throw new Error("usePokemonContext must be within a Provider");
  }

  return context;
}

export default PokemonProvider;
