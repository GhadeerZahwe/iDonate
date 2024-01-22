import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";
import { useFocusEffect } from "@react-navigation/native";
import { Linking } from "react-native";

const CompletedOrder = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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
      console.log(result);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  // Use the useFocusEffect hook to refetch data when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
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
            </View>
          </View>
        );
      }
      return null;
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderCompletedOrders()}
    </ScrollView>
  );
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
    marginRight: 2,
  },
  callIcon: {
    marginLeft: 5,
    top: 3,
  },
});

export default CompletedOrder;
