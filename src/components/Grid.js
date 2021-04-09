import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import getFullList from "../hooks/getFullList";
import PokemonImage from "../components/PokemonImage";
import { withNavigation } from "react-navigation";
import { capitalizeName, extractId } from "../utils/helpers";

const Grid = ({ navigation }) => {
  const [results, showInitialList, errorMessage] = getFullList();

  const listOfAllPokemon = results.results;

  return (
    <View style={styles.wrapper}>
      <View>
        <FlatList
          data={listOfAllPokemon}
          keyExtractor={(result) => result.name}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View style={styles.pokemonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Stats", {
                      name: item.name,
                      url: item.url, // https://pokeapi.co/api/v2/pokemon/
                    })
                  }
                >
                  <PokemonImage name={item.name} id={extractId(item.url)} />
                  <Text style={styles.pokemonName}>
                    {capitalizeName(item.name)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  pokemonContainer: {
    flexGrow: 1,
    padding: 10,
    alignItems: "center",
  },
  pokemonName: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default withNavigation(Grid);
