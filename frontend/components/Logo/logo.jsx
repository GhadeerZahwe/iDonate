import React from "react";
import { Image } from "react-native";

const logo = () => {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={{
        width: 170,
        height: 40,
        marginLeft: 30,
        top: 40,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
};

export default logo;
