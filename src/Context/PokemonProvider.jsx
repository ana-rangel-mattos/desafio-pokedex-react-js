import { useContext, createContext, useReducer, useEffect } from "react";

export const PokemonContext = createContext();

const initialState = {
  queryType: "Number",
  query: "",
  pokemons: [],
  pokemon: null,
  pokemonUrl: null,
  isLoading: true,
  isLoadingDetails: false,
  nextPage: null,
  currentPage: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
  previousPage: null,
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
        previousPage: action.payload.previous,
        isLoading: false,
      };
    case "getDetailsPokemon":
      return { ...state, pokemonUrl: action.payload, isLoadingDetails: true };
    case "showDetailsPokemon":
      return { ...state, pokemon: action.payload, isLoadingDetails: false };
    case "getNextPage":
      return { ...state, currentPage: state.nextPage };
    case "getPreviousPage":
      return { ...state, currentPage: state.previousPage };
    default:
      return state;
  }
}

export function PokemonProvider({ children }) {
  const [
    {
      queryType,
      query,
      pokemons,
      isLoading,
      nextPage,
      currentPage,
      previousPage,
      pokemon,
      pokemonUrl,
      isLoadingDetails,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function handlePokemons() {
      try {
        const res = await fetch(`${currentPage}`);
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: {
            results: data.results,
            next: data.next,
            previous: data.previous,
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    handlePokemons();
  }, [currentPage]);

  useEffect(() => {
    async function getDetailsPokemon() {
      if (!pokemonUrl) return;
      try {
        const res = await fetch(`${pokemonUrl}`);
        const data = await res.json();
        dispatch({ type: "showDetailsPokemon", payload: data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    getDetailsPokemon();
  }, [pokemonUrl]);

  const sharedStates = {
    query,
    queryType,
    dispatch,
    pokemons,
    isLoading,
    isLoadingDetails,
    pokemon,
    pokemonUrl,
    nextPage,
    previousPage,
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
