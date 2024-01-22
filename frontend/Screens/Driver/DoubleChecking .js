// DoubleChecking.js

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DoubleChecking = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Double Checking</Text> */}
      <Image
        source={require("../../assets/donation.png")}
        style={styles.image}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Set the desired text color
  },
  image: {
    marginTop: 100, // Adjust the margin as needed
    width: 260, // Set the width of the image
    height: 260, // Set the height of the image
  },
});

export default DoubleChecking;
