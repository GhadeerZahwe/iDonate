import React from "react";
import { Image } from "react-native";

const Background = () => {
  return (
    <Image
      source={require("../../assets/rectangle.png")}
      style={{
        width: "100%",
        height: "60%",
        zIndex: 2,
      }}
    />
  );
};

export default Background;
