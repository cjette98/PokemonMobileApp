import { initialState } from './initialState'
import {
  ADD_FAVORITE_POKEMON,
  POPULATE_POKEMON_LIST,
  REMOVE_FAVORITE_POKEMON,
} from '../types/pokemon.types'

export const PokemonReducer = (state = initialState.pokemon, action) => {
  switch (action.type) {
    case POPULATE_POKEMON_LIST:
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          list: [...state.pokemons.list, ...action.payload.pokemons],
          currentPage: action.payload.currentPage,
          nextPage: action.payload.nextPage,
          isGettingMoreData: action.payload.isGettingMoreData,
        },
      }
    case ADD_FAVORITE_POKEMON:
      return {
        ...state,
        favorite: [
          ...state.favorite,
          {
            ...action.payload,
          },
        ],
      }
    case REMOVE_FAVORITE_POKEMON:
      return {
        ...state,
        favorite: [...state.favorite.filter((pokemon) => pokemon.id !== action.payload.pokemonId)],
      }
    default:
      return state
  }
}
