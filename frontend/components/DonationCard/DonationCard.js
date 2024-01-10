import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import UseHttp from "../../hooks/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
function Donationcard() {
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
  const [total_earned, setTotalEarned] = useState("");
  const [total_trips, setTotalTrips] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const result = await UseHttp("get_driver_total_earned", "GET", "", {
        Authorization: "bearer " + token,
      });
      setTotalEarned(result.total_driver_earned);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const result = await UseHttp("get_driver_total_trips", "GET", "", {
        Authorization: "bearer " + token,
      });
      setTotalTrips(result.total_driver_trips);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.trips_bar}>
      <Image
        source={require("../../assets/foodwaste.jpg")}
        style={{ width: 140, height: 123, left: 47, top: 13, marginBottom: 0 }}
      />
      <Text style={styles.trips_title}>TOTAL TRIPS</Text>
      <TouchableOpacity style={styles.add_trip_btn}>
        <Text style={styles.add_trip_txt}>Donate</Text>
      </TouchableOpacity>
      {/* <Text style={styles.trips_count}>{total_trips}</Text>
      <Text style={styles.paid_title}>TOTAL Earned</Text>
      <Text style={styles.paid_number}>{total_earned}$</Text> */}
    </View>
  );
}
export default Donationcard;

const styles = StyleSheet.create({
  trips_bar: {
    backgroundColor: "white",
    top: 400,
    left: 70,
    height: 200,
    width: 225,
    position: "absolute",
    zIndex: 2,
    borderRadius: 18,
  },
  add_trip_btn: {
    backgroundColor: "#146C94",
    borderRadius: 15,
    padding: 10,
    left: 43,

    width: 150,
    borderRadius: 18,
  },
  add_trip_txt: {
    color: "#FFF",
    fontSize: 18,
    left: 34,
  },
  trips_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.5)",
    top: 20,
    left: 30,
  },
  trips_count: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    top: 20,
    left: 65,
  },
  paid_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    color: "rgba(255, 255, 255, 0.5)",
    top: -65,
    left: 210,
  },
  paid_number: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    top: -65,
    left: 245,
  },
});
