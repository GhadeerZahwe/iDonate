import React from "react";
import { Image } from "react-native";

function Background() {
  return (
    <Image
      source={require("../../assets/rectangle.png")}
      style={{
        width: "100%",
        height: "50%",
        zIndex: -1,
        marginTop: 0,
      }}
    />
  );
}

export default Background;
