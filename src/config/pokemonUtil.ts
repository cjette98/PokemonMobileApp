import { POKEMON_TYPE_COLORS } from './colors'
import { PokemonTypeEntity } from './types'

export const getColorByPokemonType = (type: PokemonTypeEntity[]) => {
  return POKEMON_TYPE_COLORS[type[0].name.toLowerCase()]
}
