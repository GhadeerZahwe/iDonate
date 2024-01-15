import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import UseHttp from "../../hooks/request";

const CurrentOrders = () => {
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    const token = await retrieveData();
    return token;
  };
  const navigation = useNavigation();
  const [donations, setDonations] = useState([]);
  const [filteredDonationData, setFilteredDonationData] = useState([]);

  const [error, setError] = useState("");
  const [showPending, setShowPending] = useState(true);
  const [showOnWay, setShowOnWay] = useState(true);
  const [isMapPageVisible, setMapPageVisibility] = useState(false);
  const FilterDonations = () => {
    const filteredData = donations.filter((donation) => {
      return donation.status === "pending" || donation.status === "on_the_way";
    });
    setFilteredDonationData(filteredData);
    console.log(filteredDonationData);
  };

  useEffect(() => {
    if (donations.length > 0) {
      FilterDonations();
    }
  }, [donations]);

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

  const toggleCard = (status) => {
    if (status === "pending") {
      setShowPending(!showPending);
    } else if (status === "on_the_way") {
      setShowOnWay(!showOnWay);
    }
  };

  const navigateToTracking = (order) => {
    console.log(`Navigate to tracking for order ${item.id}`);
  };

  const handleMapIconClick = () => {
    setMapPageVisibility(!isMapPageVisible);
  };

  const cancelOrder = (status) => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleCancel(status) },
      ],
      { cancelable: false }
    );
  };
  const handleCancel = async (orderId) => {
    try {
      const token = await getToken();
      const result = await UseHttp(
        "cancelDonation",
        "DELETE",
        "",
        {
          Authorization: "bearer " + token,
        },
        orderId
      );
      setDonations(result.donations);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      {filteredDonationData.length > 0 &&
        filteredDonationData.map((item) => {
          return (
            <View style={styles.cardContainer} key={item.id}>
              <View style={styles.cardHeader}>
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => toggleCard(item.status)}
                >
                  <Icon
                    name={
                      item.status === "pending"
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
                  Order #{item.id} -{" "}
                  {item.status === "pending" ? "Pending" : "On the Way"}
                </Text>
              </View>
              {item.status === "pending" && showPending && (
                <View style={styles.card}>
                  <Text style={styles.boldText}>
                    Weight: {item.total_weight} kg
                  </Text>
                  <Text style={styles.boldText}>
                    Pickup Within: {item.pickup_within} hrs
                  </Text>
                  <Text style={styles.boldText}>
                    Description: {item.description}
                  </Text>
                  <Text style={styles.boldText}>
                    Phone Number: {item.phone_number}
                  </Text>
                  <Text style={styles.boldText}>
                    Location: {item.location_pickup}
                  </Text>

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => cancelOrder(item.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.status === "on_the_way" && showOnWay && (
                <View style={[styles.card, { backgroundColor: "#87CEEB" }]}>
                  <Text style={styles.boldText}>
                    Weight: {item.total_weight} kg
                  </Text>
                  <Text style={styles.boldText}>
                    Pickup Within: {item.pickup_within} hrs
                  </Text>
                  <Text style={styles.boldText}>
                    Description: {item.description}
                  </Text>
                  {/* <Text style={styles.boldText}>
                  Delivered By: {item.deliveredBy}
                </Text> */}
                  <Text style={styles.boldText}>
                    Phone Number: {item.phone_number}
                  </Text>
                  <Text style={styles.boldText}>
                    Location: {item.location_pickup}
                  </Text>
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
        })}
    </View>
  );
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
