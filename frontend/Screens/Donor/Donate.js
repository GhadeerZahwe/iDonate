// Donate.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Donate = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Donation Details Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#146C94",
  },
});

export default Donate;
