import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Search from "../../components/Search/Search";

const DonorAllOrders = () => {
  return (
    <View style={styles.container}>
      <Search />
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

export default DonorAllOrders;
