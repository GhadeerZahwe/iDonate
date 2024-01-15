import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Search from "../../components/Search/Search";
import DeliveryCompletedOrders from "../../components/DeliveryCompletedOrders/DeliveryCompletedOrders";

const DonorCompletedOrders = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <DeliveryCompletedOrders />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  // space: {
  //   marginBottom: 50,
  //   alignItems: "flex-start",
  //   height: 1,
  // },
});

export default DonorCompletedOrders;
