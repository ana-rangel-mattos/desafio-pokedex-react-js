import { useContext, createContext, useReducer, useEffect } from "react";

export const PokemonContext = createContext();

const initialState = {
  queryType: "Number",
  query: "",
  pokemons: [],
  pokemon: null,
  pokemon2: null,
  pokemonUrl: null,
  pokemonUrl2: null,
  isLoading: true,
  isLoadingDetails: false,
  nextPage: null,
  currentPage: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
  previousPage: null,
  errorDetails: null,
  errorPokemonList: null,
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
    case "searchPokemon": {
      if (!state.query.length) return state;
      return {
        ...state,
        pokemon: null,
        query: "",
        pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${
          state.queryType === "Number" ? Number(state.query) : state.query
        }/`,
        isLoadingDetails: true,
      };
    }
    case "dataReceived":
      return {
        ...state,
        pokemons: action.payload.results,
        nextPage: action.payload.next,
        previousPage: action.payload.previous,
        isLoading: false,
      };
    case "getDetailsPokemon":
      return {
        ...state,
        pokemonUrl: action.payload,
        isLoadingDetails: true,
        pokemon: null,
      };
    case "showDetailsPokemon":
      return {
        ...state,
        pokemon: action.payload,
        isLoadingDetails: false,
        errorDetails: null,
      };
    case "getNextPage":
      return { ...state, currentPage: state.nextPage, errorPokemonList: null };
    case "getPreviousPage":
      return {
        ...state,
        currentPage: state.previousPage,
        errorPokemonList: null,
      };
    case "closeDetails":
      return {
        ...state,
        pokemon: null,
        pokemonUrl: null,
        pokemon2: null,
        pokemonUrl2: null,
        isLoadingDetails: false,
      };
    case "errorFetchingDetails":
      return {
        ...state,
        isLoadingDetails: false,
        pokemon: null,
        errorDetails: action.payload,
      };
    case "errorFetchingList":
      return {
        ...state,
        isLoading: false,
        pokemons: [],
        errorPokemonList: action.payload,
      };
    case "selectToCompare":
      return { ...state, pokemonUrl2: action.payload, isLoadingDetails: true }; // Trigger a useEffect with pokemonUrl2 as dependecie.
    case "comparePokemons":
      return {
        ...state,
        pokemon2: action.payload,
        isLoadingDetails: false,
        errorDetails: null,
      };
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
      pokemon2,
      pokemonUrl,
      pokemonUrl2,
      isLoadingDetails,
      errorDetails,
      errorPokemonList,
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
        dispatch({ type: "errorFetchingList", payload: error.message });
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
        dispatch({ type: "errorFetchingDetails", payload: error?.message });
      }
    }
    getDetailsPokemon();
  }, [pokemonUrl]);

  useEffect(() => {
    async function getDetailsPokemon() {
      if (!pokemonUrl2) return;
      try {
        const res = await fetch(`${pokemonUrl2}`);
        const data = await res.json();
        dispatch({ type: "comparePokemons", payload: data });
      } catch (error) {
        dispatch({ type: "errorFetchingDetails", payload: error?.message });
      }
    }
    getDetailsPokemon();
  }, [pokemonUrl2]);

  const sharedStates = {
    query,
    queryType,
    dispatch,
    pokemons,
    isLoading,
    isLoadingDetails,
    pokemon,
    pokemon2,
    pokemonUrl,
    pokemonUrl2,
    nextPage,
    previousPage,
    errorDetails,
    errorPokemonList,
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
