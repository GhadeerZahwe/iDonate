import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CompletedOrder = ({
  order = {
    id: 1,
    deliveredBy: "George Karim",
    phoneNumber: "+961 81791454",
    receivedAt: new Date("2022-01-15T12:30:00Z"),
    deliveredAt: new Date("2022-01-15T15:45:00Z"),
    typeOfItems: "Food Waste",
    weight: 2.5,
  },
}) => {
  const completed = true;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {completed ? "✔" : "❌"} Order number {order.id}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>
          Delivered by: <Text style={styles.value}>{order.deliveredBy}</Text>
        </Text>

        <Text style={styles.label}>
          Phone Number: <Text style={styles.value}>{order.phoneNumber}</Text>
        </Text>

        <Text style={styles.label}>
          Received in:{" "}
          <Text style={styles.value}>
            {new Date(order.receivedAt).toLocaleString()}
          </Text>
        </Text>

        <Text style={styles.label}>
          Delivered in:{" "}
          <Text style={styles.value}>
            {new Date(order.deliveredAt).toLocaleString()}
          </Text>
        </Text>

        <Text style={styles.label}>
          Type of Items: <Text style={styles.value}>{order.typeOfItems}</Text>
        </Text>

        <Text style={styles.label}>
          Weight: <Text style={styles.value}>{order.weight} kg</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#146C94", // Light blue color
    padding: 10,
    borderRadius: 10,
    top: 0,
    width: 320,
  },
  header: {
    flexDirection: "row", // Align items in a row
    backgroundColor: "#32cd32",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between", // Space items evenly
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    padding: 10,
  },
  label: {
    color: "#fff", // Light blue color
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    marginVertical: 1,
  },
});

export default CompletedOrder;
