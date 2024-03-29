import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DoubleChecking from "./DoubleChecking";

const OnTheWayOrders = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [checkedWeight, setCheckedWeight] = useState(null);
  const route = useRoute();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null ? value : null;
    } catch (error) {
      // console.log(error);
      return null;
    }
  };

  const getToken = async () => {
    return await retrieveData();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const token = await getToken();
      const result = await UseHttp("getOrdersByStatus/on_the_way", "GET", "", {
        Authorization: "bearer " + token,
      });
      setDonations(result.orders);
    } catch (error) {
      // console.log(error);
      // setError(error);
    }
  }, [isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleComplete = async (orderId) => {
    setAlertType("completed");
    setSelectedOrderId(orderId);
    setAlertVisible(true);
  };

  const handleCancel = async (orderId) => {
    setAlertType("cancel");
    setSelectedOrderId(orderId);
    setAlertVisible(true);
  };
  const handleAlertAction = async () => {
    try {
      const token = await getToken();

      if (alertType === "completed") {
        await UseHttp(`updateOrderStatus/${selectedOrderId}`, "POST", "", {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        });
        // console.log("Order completed successfully");
        fetchData();
        navigation.navigate("DonorCompletedOrders");
      } else if (alertType === "cancel") {
        await UseHttp(`cancelOrder/${selectedOrderId}`, "POST", "", {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        });
        // console.log("Order canceled successfully");
        fetchData();
        navigation.navigate("Tabs", { screen: "Pending" });
      }
    } catch (error) {
      // console.log(error);
      setError(error);
    } finally {
      setAlertVisible(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleWeightCheck = async (orderId) => {
    try {
      const token = await getToken();
      // console.log("Calling handleWeightCheck for orderId:", orderId);

      const result = await UseHttp(`getTotalWeight/${orderId}`, "GET", "", {
        Authorization: "bearer " + token,
      });

      // console.log("Total Weight:", result.total_weight);
      return result;
    } catch (error) {
      // console.log("Error in handleWeightCheck:", error);
      setError(error);
      return { total_weight: null };
    }
  };

  const renderOnTheWayOrders = (handleWeightCheck) => {
    return (
      donations &&
      donations.map((item) => (
        <View style={styles.cardContainer} key={item.id}>
          <View style={[styles.card, { backgroundColor: "#146C94" }]}>
            <Text style={styles.boldText}>
              Donor Name:{" "}
              <Text style={styles.value}>
                {item.donor.first_name} {item.donor.last_name}
              </Text>
            </Text>

            <Text style={styles.boldText}>
              Total Weight:{" "}
              <Text style={styles.value}>
                {item.total_weight} kg
                <TouchableOpacity
                  onPress={() => {
                    // console.log("Initial Weight:", item.total_weight);
                    navigation.navigate("DoubleChecking", {
                      handleWeightCheck: handleWeightCheck,
                      orderId: item.id,
                      initialWeight: item.total_weight,
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name="weight-kilogram"
                    size={20}
                    color="#fff"
                    style={{ marginLeft: 7, top: 4 }}
                  />
                </TouchableOpacity>
              </Text>
            </Text>

            <Text style={styles.boldText}>
              Picked Up Within:{" "}
              <Text style={styles.value}>{item.pickup_within} hrs</Text>
            </Text>

            <View style={styles.locationContainer}>
              <Text style={styles.boldText}>
                Location:{" "}
                <Text style={styles.value}>{item.locations.description}</Text>
              </Text>
              <TouchableOpacity onPress={() => handleLocationPress(item)}>
                <FontAwesome
                  name="map-marker"
                  size={20}
                  color="#fff"
                  style={styles.locationIcon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.boldText}>
              Phone Number:{" "}
              <Text style={styles.value}>{item.phone_number}</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${item.phone_number}`);
                }}
              >
                <FontAwesome
                  name="phone"
                  size={17}
                  color="#fff"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => handleComplete(item.id)}
              >
                <Text style={styles.buttonText}>Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(item.id)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))
    );
  };

  const handleLocationPress = (order) => {
    navigation.navigate("OnWayLocation", {
      orderLocation: order.locations,
      orderId: order.id,
    });
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderOnTheWayOrders(handleWeightCheck)}
      <CustomAlert
        visible={alertVisible}
        title={alertType === "completed" ? "Complete Order" : "Cancel Order"}
        message={`Are you sure you want to ${
          alertType === "completed" ? "complete" : "cancel"
        } this order?`}
        onYes={() => handleAlertAction()}
        onNo={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    width: 330,
    top: 19,
    left: 17,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  boldText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  value: {
    left: 13,
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.7)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#BD2031",
    padding: 10,
    borderRadius: 10,
    width: "48%",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationIcon: {
    marginLeft: 10,
  },
});
export default OnTheWayOrders;
