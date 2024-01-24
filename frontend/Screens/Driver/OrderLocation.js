import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import UseHttp from "../../hooks/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderLocation = ({ route }) => {
  const { orderId } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    handleLocation();
  }, []);

  useEffect(() => {
    if (orderData) {
      const { latitude, longitude } = orderData.locations;
      setLocation({ latitude, longitude });
    }
  }, [orderData]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null ? value : null;
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    const token = await retrieveData();
    return token;
  };

  const handleLocation = async (orderId) => {
    try {
      const token = await getToken();

      const result = await UseHttp(
        `getLocationByOrderId/${orderId}`,
        "GET",
        "",
        {
          Authorization: "Bearer " + token,
        }
      );

      if (result.orders && result.orders.length > 0) {
        const order = result.orders[0];
        setOrderData(order);
      } else {
        setErrorMsg("Invalid order data");
      }
    } catch (error) {
      setErrorMsg("Error fetching order data");
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Order Location"
          />
        </MapView>
      ) : (
        <Text>{errorMsg || "Loading..."}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default OrderLocation;
