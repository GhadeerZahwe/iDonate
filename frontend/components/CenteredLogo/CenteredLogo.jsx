import React from "react";
import { Image } from "react-native";
const CenteredLogo = () => {
  return (
    <Image
      source={require("../../assets/CenteredLogo.png")}
      style={{
        marginLeft: 100,
        top: 70,
        width: 170,
        height: 145,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
};

export default CenteredLogo;
