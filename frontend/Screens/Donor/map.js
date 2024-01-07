import React from "react";
import { View, Text, StyleSheet } from "react-native";

const map = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map</Text>
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
    color: "#146C94", // You can customize the color
  },
});

export default map;
