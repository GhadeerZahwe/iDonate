import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function DonorCard() {
  return (
    <View style={styles.container}>
      <View style={styles.donorCard}>
        <Image
          style={styles.foodwaste_img}
          source={require("../../assets/foodwaste.jpg")}
        />
        <Text style={styles.category}>Food Waste</Text>
      </View>
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
    backgroundColor: "#146C94",
    height: 199,
    width: 200,
    top: 70,
    borderRadius: 15,
    elevation: 45,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 15,
  },
  foodwaste_img: {
    top: 10,
    left: 13,
    borderRadius: 15,
    width: 150,
    height: 117,
  },
  category: {
    fontWeight: "500",
    fontSize: 20,
    color: "white",
    top: 20,
    left: 33,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DonorCard;
