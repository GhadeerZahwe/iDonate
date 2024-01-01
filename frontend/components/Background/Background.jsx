import React from "react";
import { Image } from "react-native";

function Background() {
  return (
    <Image
      source={require("../../assets/rectangle.png")}
      style={{
        width: 420,
        height: 340,
        zIndex: -1,
      }}
    />
  );
}

export default Background;
