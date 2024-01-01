import React from "react";
import { Text, TextInput } from "react-native";

const Search = () => {
  return (
    <TextInput
      style={{
        height: 40,
        top: 160,
        left: 40,
        position: "absolute",
        zIndex: 2,
        width: 300,
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
      placeholder="Search"
      placeholderTextColor="#FFF"
    />
  );
};

export default Search;
