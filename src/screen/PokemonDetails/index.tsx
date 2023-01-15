import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { PokemonEntity } from "../../config/types";

import Header from "../../component/Header";
import Types from "../../component/Types";
import Details from "../../component/Details";
import FavoriteButton from "../../component/FavoriteButton";

export default function PokemonScreen({
  route,
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  const pokemon: PokemonEntity = route.params! as PokemonEntity;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => pokemon && <FavoriteButton item={pokemon} />,
    });
  }, [navigation, pokemon]);

  return (
    <ScrollView>
      <Header pokemon={pokemon} />
      <Types types={pokemon.types} />
      <Details pokemon={pokemon} />
    </ScrollView>
  );
}