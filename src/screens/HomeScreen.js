import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import useResults from "../hooks/useResults";
import Grid from "../components/Grid";
import SearchBar from "../components/SearchBar";
import PokemonImage from "../components/PokemonImage";
import NavigationButton from "../components/NavigationButton";

const HomeScreen = () => {
  const [userQuery, setUserQuery] = useState("");
  const [
    queryResults,
    setResults,
    searchQuery,
    queryErrorMessage,
  ] = useResults();

  const submitQuery = (userQuery) => {
    return userQuery !== "" ? searchQuery(userQuery) : setUserQuery("");
  };

  const clearQuery = () => {
    setUserQuery("");
    setResults("");
  };

  const setUserQueryHandler = (value) => {
    if (value.length == 0) {
      clearQuery();
    } else {
      setUserQuery(value);
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <SearchBar
        query={userQuery}
        onQueryChange={(value) => setUserQueryHandler(value)}
        onQuerySubmit={() => submitQuery(userQuery)}
      />
      {queryResults.name && userQuery ? (
        <View>
          <NavigationButton
            screen="Stats"
            dataObj={{ name: queryResults.name }}
          >
            <PokemonImage name={queryResults.name} />
          </NavigationButton>
          <TouchableOpacity onPress={() => setUserQuery("")}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Grid />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "hotpink",
    padding: 20,
  },
});

export default HomeScreen;
