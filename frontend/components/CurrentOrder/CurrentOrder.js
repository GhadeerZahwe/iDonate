import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import UseHttp from "../../hooks/request";

const CurrentOrders = () => {
  const navigation = useNavigation();

  const [showPending, setShowPending] = useState(true);
  const [showOnWay, setShowOnWay] = useState(true);
  const [isMapPageVisible, setMapPageVisibility] = useState(false);

  const toggleCard = (orderType) => {
    if (orderType === "pending") {
      setShowPending(!showPending);
    } else if (orderType === "onWay") {
      setShowOnWay(!showOnWay);
    }
  };

  const navigateToTracking = (order) => {
    console.log(`Navigate to tracking for order ${order.id}`);
  };
  const handleMapIconClick = () => {
    setMapPageVisibility(!isMapPageVisible);
  };
  const cancelOrder = (orderType) => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleCancel(orderType) },
      ],
      { cancelable: false }
    );
  };

  const handleCancel = (orderType) => {
    console.log(`Cancel order ${orderType}`);
  };

  const pendingOrder = {
    id: 1,
    weight: 3.5,
    pickupWithin: 5,
    description: "Hamburger food donation",
    phoneNumber: "+961 12345678",
    location: "123 Main Street, City",
  };

  const onWayOrder = {
    id: 2,
    deliveredBy: "John Karam",
    weight: 2.0,
    pickupWithin: 3,
    description: "Pizza Donation",
    phoneNumber: "+961 98765432",
    location: "456 Oak Avenue, Town",
  };

  return (
    <View style={styles.container}>
      {renderOrderCard(pendingOrder, "pending")}
      {renderOrderCard(onWayOrder, "onWay")}
    </View>
  );

  function renderOrderCard(order, orderType) {
    return (
      <View style={styles.cardContainer} key={order.id}>
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => toggleCard(orderType)}
          >
            <Icon
              name={
                orderType === "pending"
                  ? showPending
                    ? "angle-up"
                    : "angle-down"
                  : showOnWay
                  ? "angle-up"
                  : "angle-down"
              }
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
          <Text style={styles.cardTitle}>
            Order #{order.id} -{" "}
            {orderType === "pending" ? "Pending" : "On the Way"}
          </Text>
        </View>
        {orderType === "pending" && showPending && (
          <View style={styles.card}>
            <Text style={styles.boldText}>Weight: {order.weight} kg</Text>
            <Text style={styles.boldText}>
              Pickup Within: {order.pickupWithin} hrs
            </Text>
            <Text style={styles.boldText}>
              Description: {order.description}
            </Text>
            <Text style={styles.boldText}>
              Phone Number: {order.phoneNumber}
            </Text>
            <Text style={styles.boldText}>Location: {order.location}</Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelOrder(orderType)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {orderType === "onWay" && showOnWay && (
          <View style={[styles.card, { backgroundColor: "#87CEEB" }]}>
            <Text style={styles.boldText}>Weight: {order.weight} kg</Text>
            <Text style={styles.boldText}>
              Pickup Within: {order.pickupWithin} hrs
            </Text>
            <Text style={styles.boldText}>
              Description: {order.description}
            </Text>
            <Text style={styles.boldText}>
              Delivered By: {order.deliveredBy}
            </Text>
            <Text style={styles.boldText}>
              Phone Number: {order.phoneNumber}
            </Text>
            <Text style={styles.boldText}>Location: {order.location}</Text>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => navigation.navigate("Map")}
            >
              <Text style={styles.trackButtonText}>Track</Text>
            </TouchableOpacity>
            {isMapPageVisible && <Map />}
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 70,
    marginLeft: 3,
  },
  cardContainer: {
    marginBottom: 20,
    width: 320,
  },
  expandButton: {
    marginRight: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#146C94", // Blue color for the header
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#ffffff",
  },
  card: {
    backgroundColor: "#ED9ED6", // Pink color for pending order
    padding: 10,
    borderRadius: 10,
    top: 2,
  },
  cardText: {
    color: "#ffffff",
    fontSize: 16,
    marginVertical: 1,
  },
  boldText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  trackButton: {
    backgroundColor: "#146C94", // Light blue color for on the way order
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  trackButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#ba181b", // Red color for cancel button
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CurrentOrders;
