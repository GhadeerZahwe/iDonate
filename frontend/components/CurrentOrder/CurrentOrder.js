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
import Search from "../Search/Search";
import CustomAlert from "../CustomAlert/CustomAlert";

const CurrentOrders = () => {
  const formData = new FormData();
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
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
  const [expandedOrders, setExpandedOrders] = useState({});
  const [isMapPageVisible, setMapPageVisibility] = useState(false);

  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const FilterDonations = () => {
    const filteredData = donations.filter((donation) => {
      return (
        donation.status === "pending" ||
        donation.status === "on_the_way" ||
        donation.description.toLowerCase().includes(searchText.toLowerCase()) ||
        donation.phone_number.includes(searchText) ||
        donation.location_pickup
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    });
    setFilteredDonationData(filteredData);
  };

  useEffect(() => {
    if (donations.length > 0) {
      FilterDonations();
    }
  }, [donations, searchText]);

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

  const toggleCard = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleMapIconClick = () => {
    setMapPageVisibility(!isMapPageVisible);
  };

  const cancelOrder = (orderId) => {
    setCancelOrderId(orderId); // Store the orderId to be canceled
    setShowCancelAlert(true);
  };

  const handleCancel = async () => {
    try {
      const token = await getToken();
      await UseHttp(`cancelDonation/${cancelOrderId}`, "DELETE", "", {
        Authorization: "bearer " + token,
      });

      fetchData();
      console.log("deleted");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setShowCancelAlert(false);
    }
  };

  return (
    <>
      <Search onSearch={setSearchText} />
      <ScrollView style={styles.container}>
        {filteredDonationData.length > 0 &&
          filteredDonationData.map((item) => {
            const isExpanded = expandedOrders[item.id] || false;

            if (item.status === "pending" || item.status === "on_the_way") {
              return (
                <View style={styles.cardContainer} key={item.id}>
                  <View style={styles.cardHeader}>
                    <TouchableOpacity
                      style={styles.expandButton}
                      onPress={() => toggleCard(item.id)}
                    >
                      <Icon
                        name={isExpanded ? "angle-up" : "angle-down"}
                        size={30}
                        color="#ffffff"
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardTitle}>
                      Order #{item.id} -{" "}
                      {item.status === "pending" ? "Pending" : "On the Way"}
                    </Text>
                  </View>
                  {item.status === "pending" && isExpanded && (
                    <View style={styles.card}>
                      <Text style={styles.boldText}>
                        Weight:{" "}
                        <Text style={styles.value}>{item.total_weight} kg</Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Pickup Within:
                        <Text style={styles.value}>
                          {" "}
                          {item.pickup_within} hrs
                        </Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Description:
                        <Text style={styles.value}> {item.description}</Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Phone Number:
                        <Text style={styles.value}> {item.phone_number}</Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Location:
                        <Text style={styles.value}>
                          {" "}
                          {item.locations.description}
                        </Text>
                      </Text>

                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => cancelOrder(item.id)}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {item.status === "on_the_way" && isExpanded && (
                    <View style={[styles.card, { backgroundColor: "#87CEEB" }]}>
                      <Text style={styles.boldText}>
                        Weight:{" "}
                        <Text style={styles.value_way}>
                          {" "}
                          {item.total_weight} kg{" "}
                        </Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Pickup Within:{" "}
                        <Text style={styles.value_way}>
                          {" "}
                          {item.pickup_within} hrs{" "}
                        </Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Description:{" "}
                        <Text style={styles.value_way}>
                          {" "}
                          {item.description}{" "}
                        </Text>
                      </Text>
                      {/* <Text style={styles.boldText}>
            Delivered By: {item.deliveredBy}
          </Text> */}
                      <Text style={styles.boldText}>
                        Phone Number:{" "}
                        <Text style={styles.value_way}>
                          {" "}
                          {item.phone_number}
                        </Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Location:{" "}
                        <Text style={styles.value_way}>
                          {" "}
                          {item.locations.description}
                        </Text>
                      </Text>
                      <TouchableOpacity
                        style={styles.trackButton}
                        onPress={() => {
                          navigation.navigate("Map");
                          handleMapIconClick();
                        }}
                      >
                        <Text style={styles.trackButtonText}>Track</Text>
                      </TouchableOpacity>
                      {isMapPageVisible && <Map />}
                    </View>
                  )}
                </View>
              );
            }
            return null; // If status is neither "pending" nor "on_the_way", don't render
          })}
        <CustomAlert
          visible={showCancelAlert}
          title="Cancel Order"
          message="Are you sure you want to cancel this order?"
          onYes={handleCancel}
          onNo={() => setShowCancelAlert(false)}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#F2BE22",
    padding: 10,
    borderRadius: 10,
    top: 2,
  },
  boldText: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 15.5,
  },
  trackButton: {
    backgroundColor: "#146C94",
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
  value: {
    left: 10,
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
  },
  value_way: {
    left: 10,
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.75)",
  },
});

export default CurrentOrders;
