import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const PendingOrders = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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

  const fetchData = useCallback(async () => {
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
  }, [isFocused]); // Fetch data when the component mounts and when it is focused

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onTakeOrder = async (orderId) => {
    setSelectedOrderId(orderId);
    setAlertVisible(true);
  };
  const handleTakeOrder = async () => {
    try {
      const token = await getToken();
      await UseHttp(`acceptOrder/${selectedOrderId}`, "POST", "", {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      });

      fetchData();
      console.log("Order accepted successfully");
      navigation.navigate("Tabs", { screen: "OnTheWay" });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setAlertVisible(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

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

  return (
    <ScrollView>
      {renderPendingOrders()}
      <CustomAlert
        visible={alertVisible}
        title="Take Order"
        message="Are you sure you want to take this order?"
        onYes={() => handleTakeOrder()}
        onNo={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    width: 335,
    left: 13,
    height: 188,
    bottom: 100,
  },
  card: {
    backgroundColor: "#ED9ED6", // Pink color for pending order
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "flex-start",
    top: 100,
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

export default PendingOrders;
