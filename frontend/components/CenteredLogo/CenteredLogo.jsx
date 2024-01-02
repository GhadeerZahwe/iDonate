import React from "react";
import { Image } from "react-native";
const CenteredLogo = () => {
  return (
    <Image
      source={require("../../assets/CenteredLogo.png")}
      style={{
        marginLeft: 50,
        top: 100,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
};

export default CenteredLogo;
