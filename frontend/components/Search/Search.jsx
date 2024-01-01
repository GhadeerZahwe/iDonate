import React from "react";
import { Text, TextInput } from "react-native";

const Search = () => {
  return (
    <TextInput
      style={{
        height: 40,
        top: 400,
        marginLeft: 20,
      }}
      placeholder="Search"
    />
  );
};

export default Search;
