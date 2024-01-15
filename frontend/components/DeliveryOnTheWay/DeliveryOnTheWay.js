import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";

const DeliveryOnTheWay = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null ? value : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getToken = async () => {
    return await retrieveData();
  };

  const fetchData = async () => {
    try {
      const token = await getToken();
      const result = await UseHttp("getOrdersByStatus/on_the_way", "GET", "", {
        Authorization: "bearer " + token,
      });
      setDonations(result.orders);
      console.log(result);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onComplete = (orderId) => {
    console.log("Order Completed:", orderId);
  };

  const onCancel = (orderId) => {
    console.log("Order Canceled:", orderId);
  };

  const renderOnTheWayOrders = () => {
    return donations.map((item) => (
      <View style={styles.cardContainer} key={item.id}>
        <View style={[styles.card, { backgroundColor: "#146C94" }]}>
          <Text style={styles.boldText}>
            Donor Name: {item.donor.first_name} {item.donor.last_name}
          </Text>
          <Text style={styles.boldText}>Weight: {item.total_weight} kg</Text>
          <Text style={styles.boldText}>
            Picked Up Within: {item.pickup_within} hrs
          </Text>
          <Text style={styles.boldText}>
            Location: {item.locations.description}
          </Text>
          <Text style={styles.boldText}>Phone Number: {item.phone_number}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => onComplete(item.id)}
            >
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => onCancel(item.id)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  return <ScrollView>{renderOnTheWayOrders()}</ScrollView>;
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
