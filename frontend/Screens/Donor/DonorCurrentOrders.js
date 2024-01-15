import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Search from "../../components/Search/Search";
import CurrentOrders from "../../components/CurrentOrder/CurrentOrder";

const DonorCurrentOrders = () => {
  return (
    <View style={styles.container}>
      <CurrentOrders />
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

export default DonorCurrentOrders;
