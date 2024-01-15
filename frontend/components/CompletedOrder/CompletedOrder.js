import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";

const CompletedOrder = () => {
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
      const result = await UseHttp("getDonorDonations", "GET", "", {
        Authorization: "bearer " + token,
      });
      setDonations(result.donations);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCompletedOrders = () => {
    return donations.map((item) => {
      if (item.status === "completed") {
        return (
          <View style={styles.container} key={item.id}>
            <View style={styles.header}>
              <Text style={styles.title}>✔ Order number {item.id}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.label}>
                Phone Number:{" "}
                <Text style={styles.value}>{item.phone_number}</Text>
              </Text>

              <Text style={styles.label}>
                Picked up Within:{" "}
                <Text style={styles.value}>{item.pickup_within} hrs</Text>
              </Text>
              <Text style={styles.label}>
                Description:{" "}
                <Text style={styles.value}>{item.description}</Text>
              </Text>
              <Text style={styles.label}>
                Total Weight:{" "}
                <Text style={styles.value}>{item.total_weight} kg</Text>
              </Text>
            </View>
          </View>
        );
      }
      return null;
    });
  };

  return <ScrollView>{renderCompletedOrders()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#146C94",
    borderRadius: 10,
    width: 320,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#32cd32",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    color: "#fff",
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
