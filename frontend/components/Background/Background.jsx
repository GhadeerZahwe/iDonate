import React from "react";
import { Image } from "react-native";

function Background() {
  return (
    <Image
      source={require("../../assets/rectangle.png")}
      style={{
        width: "100%",
        height: "73%",
        zIndex: -1,
      }}
    />
  );
}

export default Background;
