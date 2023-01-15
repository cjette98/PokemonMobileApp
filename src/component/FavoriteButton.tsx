import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

//MODEL
import { PokemonEntity } from "../config/types";

//HOOKS
import { useFavorite } from "../hooks/useFavorite";


export default function FavoriteButton({ item }: { item: PokemonEntity }) {
  const {isFavorite, toggleFavorite } = useFavorite(item);
  

    return (
    <Icon
      solid={isFavorite}
      name="heart"
      color="red"
      size={25}
      onPress={toggleFavorite}
    />
  );
}