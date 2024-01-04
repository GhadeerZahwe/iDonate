import React from "react";
import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={{
        width: 150,
        height: 50,
        // marginTop: 30,
        marginLeft: 30,
        top: 40,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
};

export default Logo;
