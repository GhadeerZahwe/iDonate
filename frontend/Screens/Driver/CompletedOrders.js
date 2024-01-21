import { React, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const DonorCompletedOrders = ({ navigation }) => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

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
      const result = await UseHttp("getOrdersByStatus/completed", "GET", "", {
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const onReturnToOnTheWay = (orderId) => {
    setSelectedOrderId(orderId);
    setAlertVisible(true);
  };

  const handleReturnToOnTheWay = async () => {
    try {
      const token = await getToken();
      await UseHttp(`returnToOnTheWay/${selectedOrderId}`, "POST", "", {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      });

      fetchData();
      console.log("Order returned to on-the-way successfully");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setAlertVisible(false);
    }
  };
  const renderCompletedOrders = () => {
    return Array.isArray(donations) ? (
      donations.map((item, index) => (
        <View style={styles.container} key={item.id}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>✔ Order number {item.id}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.label}>
                Donor Name:{" "}
                <Text style={styles.value}>
                  {item.donor.first_name} {item.donor.last_name}
                </Text>
              </Text>
              <Text style={styles.label}>
                Phone Number:{" "}
                <Text style={styles.value}>{item.phone_number}</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Open phone dialer
                    Linking.openURL(`tel:${item.phone_number}`);
                  }}
                >
                  <MaterialIcons
                    name="local-phone"
                    size={18}
                    color="#fff"
                    style={styles.callIcon}
                  />
                </TouchableOpacity>
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

              <TouchableWithoutFeedback
                onPress={() => onReturnToOnTheWay(item.id)}
              >
                <MaterialIcons
                  name="local-shipping"
                  size={24}
                  color="#fff"
                  style={styles.onTheWayIcon}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      ))
    ) : (
      <Text>No completed orders available.</Text>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderCompletedOrders()}
      <CustomAlert
        visible={alertVisible}
        title="Return to on the way"
        message="Are you sure you want to return this order to on the way status?"
        onYes={() => handleReturnToOnTheWay()}
        onNo={() => setAlertVisible(false)}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#146C94",
    borderRadius: 10,
    width: 320,
    marginBottom: 17,
    top: 13,
    left: 20,
    height: 195,
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
    flex: 1,
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
  onTheWayIcon: {
    position: "absolute",
    bottom: 9,
    left: 285,
  },
  callIcon: {
    marginLeft: 3,
  },
});
export default DonorCompletedOrders;
