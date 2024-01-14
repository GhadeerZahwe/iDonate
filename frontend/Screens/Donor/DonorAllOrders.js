import React from "react";
import { View, StyleSheet } from "react-native";
import Search from "../../components/Search/Search";
import CompletedOrder from "../../components/CompletedOrder/CompletedOrder";

const DonorAllOrders = () => {
  return (
    <View style={styles.container}>
      <Search />
      <View style={styles.space} />
      <CompletedOrder />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  space: {
    height: 60,
  },
});

export default DonorAllOrders;
