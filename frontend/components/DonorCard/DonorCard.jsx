import React from "react";
import { StyleSheet, View, Text } from "react-native";

function DonorCard() {
  return (
    <View style={styles.container}>
      <View style={styles.donorCard}>{/* Content of the donor card */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  donorCard: {
    backgroundColor: "#FFF",
    height: 160,
    width: 200,
    top: 50,
    borderRadius: 15,
    elevation: 45,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 15,
  },
});

export default DonorCard;
