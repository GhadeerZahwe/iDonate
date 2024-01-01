import React from "react";
import { Image } from "react-native";
const CenteredLogo = () => {
  return (
    <Image
      source={require("../../assetes/CenteredLogo.png")}
      style={{
        marginLeft: 150,
        top: 110,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
};

export default CenteredLogo;
