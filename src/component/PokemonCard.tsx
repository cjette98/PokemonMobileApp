import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getColorByPokemonType } from "../config/pokemonUtil";
import { PokemonEntity } from "../config/types";
import FastImage from 'react-native-fast-image'
interface PokemonCardProps {
  pokemon: PokemonEntity;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation();

  const cardStyles = {
    backgroundColor: getColorByPokemonType(pokemon.types),
    ...styles.card,
  };

  const handlePress = () => {
    navigation.navigate("PokemonDetails" as never, pokemon as never);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={cardStyles}>
        <Text style={styles.name}>{pokemon.name?.toUpperCase()}</Text>
        <Text style={styles.name}>#{String(pokemon.id).padStart(3, "0")}</Text>
        <View style={styles.shadow} />
        <FastImage source={{ uri: pokemon.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    height: 130,
    margin: 5,
    borderRadius: 15,
    padding: 8,
  },
  image: {
    position: "absolute",
    right: -15,
    bottom: -15,
    height: 110,
    width: 110,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  shadow: {
    height: 120,
    width: 120,
    backgroundColor: "#fff",
    opacity: 0.2,
    position: "absolute",
    borderRadius: 60,
    bottom: -25,
    right: -25,
  },
});

export default React.memo(PokemonCard);