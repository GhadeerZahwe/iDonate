import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";

const DeliveryPending = () => {
  const navigation = useNavigation();
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
      const result = await UseHttp("getOrdersByStatus/pending", "GET", "", {
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

  const onTakeOrder = () => {
    console.log("Take order with id:");
  };

  const renderPendingOrders = () => {
    return donations.map((item) => (
      <View style={styles.cardContainer} key={item.id}>
        <View style={styles.card}>
          <Text style={styles.boldText}>
            Donor Name: {item.donor.first_name} {item.donor.last_name}
          </Text>
          <Text style={styles.boldText}>Weight: {item.total_weight} kg</Text>
          <Text style={styles.boldText}>
            PickUp Within: {item.pickup_within} hrs
          </Text>
          <Text style={styles.boldText}>
            Location: {item.locations.description}
          </Text>
          <Text style={styles.boldText}>Phone Number: {item.phone_number}</Text>
          <TouchableOpacity
            style={styles.takeOrderButton}
            onPress={() => onTakeOrder(item.id)}
          >
            <Text style={styles.takeOrderButtonText}>Take the Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return <ScrollView>{renderPendingOrders()}</ScrollView>;
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    width: 335,
    left: 13,
    top: 10,
    height: 184,
  },
  card: {
    backgroundColor: "#ED9ED6", // Pink color for pending order
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "flex-start",
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
