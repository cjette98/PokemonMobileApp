import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from 'react-redux'
import { PokemonEntity } from "../config/types";

///REDUX TYPES
import * as types from '../redux/types'

export const useFavorite = (item: PokemonEntity) => {
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const dispatch=useDispatch()
  const { favorite } = useSelector((state:any) => state.pokemon)

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsFavorite(await isFavoritePokemon(item));
      })();
    }, [item,favorite])
  );

  const isFavoritePokemon = (data:PokemonEntity) => {
    const isExisting = favorite.filter((res: PokemonEntity) => res.id === data.id);
    if (isExisting.length > 0) {
      return true
    }
    else {
      return false
    }
  }
  const toggleFavorite = async () => {
    if (!isFavoritePokemon(item)) {
       dispatch({
        type: types.ADD_FAVORITE_POKEMON,
        payload:{...item}
      })
    } else {
        dispatch({
        type: types.REMOVE_FAVORITE_POKEMON,
        payload:{pokemonId:item.id}
      })
    }

  };
  return {
    isFavorite,
    toggleFavorite,
  };
};