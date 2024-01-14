import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DeliveryOnTheWay = ({ order, onCancel, onComplete }) => {
  // Mock data for testing
  const mockData = {
    weight: 2.0,
    pickupWithin: 3, // in hours
    donorName: "John Karam",
    phoneNumber: "+961 98765432",
    location: "456 Oak Avenue, Town",
  };

  // Combine mock data with actual order data
  const orderData = { ...mockData, ...order };

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.card, { backgroundColor: "#146C94" }]}>
        <Text style={styles.boldText}>Donor Name: {orderData.donorName}</Text>

        <Text style={styles.boldText}>Weight: {orderData.weight} kg</Text>
        <Text style={styles.boldText}>
          Pickup Within: {orderData.pickupWithin} hrs
        </Text>

        <Text style={styles.boldText}>
          Phone Number: {orderData.phoneNumber}
        </Text>
        <Text style={styles.boldText}>Location: {orderData.location}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onComplete(orderData.id)}
          >
            <Text style={styles.buttonText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onCancel(orderData.id)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    width: 330,
    top: 17,
    left: 17,
  },
  card: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#ba181b", // Red color for cancel button
    padding: 10,
    borderRadius: 10,
    width: "48%",
  },
  completeButton: {
    backgroundColor: "#4CAF50", // Green color for completed button
    padding: 10,
    borderRadius: 10,
    width: "48%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DeliveryOnTheWay;
