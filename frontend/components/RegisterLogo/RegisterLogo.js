import React from "react";
import { Image } from "react-native";

function RegisterLogo() {
  return (
    <Image
      source={require("../../assets/RegisterLogo.png")}
      style={{
        marginLeft: "15%",
        top: 70,
        width: "70%",
        height: 200,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
}

export default RegisterLogo;
