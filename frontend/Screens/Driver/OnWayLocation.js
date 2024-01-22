import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import database from "@react-native-firebase/database"; // Import Firebase database

const OnWayLocation = ({ route }) => {
  const [location, setLocation] = useState(null);
  const { orderLocation } = route.params;
  const [errorMsg, setErrorMsg] = useState(null);
  const [destination, setDestination] = useState({
    latitude: parseFloat(orderLocation.latitude),
    longitude: parseFloat(orderLocation.longitude),
  });

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    fetchLocation();

    const locationInterval = setInterval(async () => {
      fetchLocation();

      const orderRef = database().ref(`/${orderId}`);
      if (location) {
        await orderRef.set({
          Latitude: location.coords.latitude,
          Longitude: location.coords.longitude,
        });
      }
    }, 5000);

    return () => clearInterval(locationInterval);
  }, []);

  const origin = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : null;

  console.log("Order Location Latitude:", orderLocation.latitude);
  console.log("Order Location Longitude:", orderLocation.longitude);
  if (origin) {
    console.log("My Current Location:", origin.latitude, origin.longitude);
  }

  const GOOGLE_MAPS_APIKEY = "YOUR_GOOGLE_MAPS_API_KEY_HERE";

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {origin && (
            <Marker
              coordinate={origin}
              title="My Location"
              description="This is my current location"
              pinColor="red" // Set pinColor to red
            />
          )}
          <Marker
            coordinate={{
              latitude: parseFloat(orderLocation.latitude),
              longitude: parseFloat(orderLocation.longitude),
            }}
            title="Order Location"
            pinColor="green" // Set pinColor to green
          />
          {origin && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="red"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OnWayLocation;
