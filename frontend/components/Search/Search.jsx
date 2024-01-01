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
      }}
      placeholder="Search"
      //   placeholderTextColor="#FFF"
    />
  );
};

export default Search;
