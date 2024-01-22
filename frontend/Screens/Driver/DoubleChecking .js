// DoubleChecking.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DoubleChecking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Double Checking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Set the desired background color
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Set the desired text color
  },
});

export default DoubleChecking;
