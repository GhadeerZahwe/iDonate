// DeliveryPending.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DeliveryPending = ({ order, onTakeOrder }) => {
  // Example mock data for the first card
  const mockData1 = {
    donorName: "John Doe",
    weight: 3.5,
    location: "123 Main Street, City",
    phoneNumber: "+961 12345678",
    // pickupWithin: 5,
    // date: "2024-01-11",
  };

  // Example mock data for the second card
  const mockData2 = {
    donorName: "Jane Smith",
    weight: 2.8,
    location: "456 Oak Avenue, Town",
    phoneNumber: "+961 98765432",
    // pickupWithin: 3,
    // date: "2024-01-12",
  };

  // Combine mock data with actual order data
  const orderData1 = { ...mockData1, ...order };
  const orderData2 = { ...mockData2, ...order };

  return (
    <View>
      {/* First Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.boldText}>
            Donor Name: {orderData1.donorName}
          </Text>
          <Text style={styles.boldText}>Weight: {orderData1.weight} kg</Text>
          <Text style={styles.boldText}>Location: {orderData1.location}</Text>
          <Text style={styles.boldText}>
            Phone Number: {orderData1.phoneNumber}
          </Text>
          {/*
          <Text style={styles.boldText}>
            Pickup Within: {orderData1.pickupWithin} hrs
          </Text>
          <Text style={styles.boldText}>Date: {orderData1.date}</Text> */}
          <TouchableOpacity
            style={styles.takeOrderButton}
            onPress={() => onTakeOrder(order.id)}
          >
            <Text style={styles.takeOrderButtonText}>Take the Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Second Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.boldText}>
            Donor Name: {orderData2.donorName}
          </Text>
          <Text style={styles.boldText}>Weight: {orderData2.weight} kg</Text>
          <Text style={styles.boldText}>Location: {orderData2.location}</Text>
          <Text style={styles.boldText}>
            Phone Number: {orderData2.phoneNumber}
          </Text>
          {/* <Text style={styles.boldText}>
            Pickup Within: {orderData2.pickupWithin} hrs
          </Text>
          <Text style={styles.boldText}>Date: {orderData2.date}</Text> */}
          <TouchableOpacity
            style={styles.takeOrderButton}
            onPress={() => onTakeOrder(order.id)}
          >
            <Text style={styles.takeOrderButtonText}>Take the Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    width: 335,
    left: 13,
  },
  card: {
    backgroundColor: "#ED9ED6", // Pink color for pending order
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "flex-start", // Align items to the start horizontally
  },
  boldText: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 16,
    marginVertical: 1,
  },
  takeOrderButton: {
    backgroundColor: "#146C94", // Light blue color for the button
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 310,
  },
  takeOrderButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DeliveryPending;
