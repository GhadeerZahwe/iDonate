import React from "react";
import { Image } from "react-native";

function RegisterLogo() {
  return (
    <Image
      source={require("../../assets/RegisterLogo.png")}
      style={{
        marginLeft: "20%",
        top: 100,
        width: "60%",
        height: 210,
        position: "absolute",
        zIndex: 2,
      }}
    />
  );
}

export default RegisterLogo;
