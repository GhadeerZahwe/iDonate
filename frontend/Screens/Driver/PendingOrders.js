import { React, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const PendingOrders = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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

  const fetchData = useCallback(async () => {
    try {
      const token = await getToken();
      const result = await UseHttp("getOrdersByStatus/pending", "GET", "", {
        Authorization: "bearer " + token,
      });
      setDonations(result.orders);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [isFocused]);

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
            Donor Name:{" "}
            <Text style={styles.value}>
              {item.donor.first_name} {item.donor.last_name}
            </Text>
          </Text>
          <Text style={styles.boldText}>
            Weight: <Text style={styles.value}> {item.total_weight} kg </Text>
          </Text>
          <Text style={styles.boldText}>
            PickUp Within:
            <Text style={styles.value}> {item.pickup_within} hrs</Text>
          </Text>
          <Text style={styles.boldText}>
            Location:{" "}
            <Text style={styles.value}>{item.locations.description}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderLocation", { orderId: item.id });
              }}
            >
              <FontAwesome
                name="map-marker"
                size={20}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.boldText}>
            Phone Number: <Text style={styles.value}>{item.phone_number}</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item.phone_number}`);
              }}
            >
              <FontAwesome
                name="phone"
                size={18}
                color="#fff"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </Text>

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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
    backgroundColor: "#FFBB33",
    // opacity: 0.,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "flex-start",
    top: 100,
  },
  boldText: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 16.3,
    marginVertical: 1,
  },
  takeOrderButton: {
    backgroundColor: "#146C94",
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
  value: {
    left: 10,
    fontSize: 15.3,
    color: "rgba(255, 255, 255, 0.85)",
  },
});

export default PendingOrders;
