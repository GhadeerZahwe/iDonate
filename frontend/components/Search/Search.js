import React from "react";
import { Text, TextInput } from "react-native";

const Search = () => {
  return (
    <TextInput
      style={{
        height: 40,
        top: 20,
        left: 20,
        position: "absolute",
        zIndex: 2,
        width: 320,
        borderWidth: 1,
        borderColor: "#146C94",
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
      placeholder="Search"
      placeholderTextColor="#146C94"
    />
  );
};

export default Search;
