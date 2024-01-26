import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";

const OnWayLocation = ({ route }) => {
  const [location, setLocation] = useState(null);
  const { orderLocation, orderId } = route.params;
  const [errorMsg, setErrorMsg] = useState(null);
  const [destination, setDestination] = useState({
    latitude: parseFloat(orderLocation.latitude),
    longitude: parseFloat(orderLocation.longitude),
  });

  const [locationText, setLocationText] = useState("");
  const fadeAnim = new Animated.Value(0);

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

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const updateLocation = async () => {
        try {
          const token = await getToken();

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);

          const latitude = currentLocation.coords.latitude || 0;
          const longitude = currentLocation.coords.longitude || 0;
          const currentLocationText = `Current Latitude: ${latitude}, Current Longitude: ${longitude}`;
          setLocationText(currentLocationText);

          const updateLocationResponse = await UseHttp(
            `updateDeliveryLocation`,
            "POST",
            JSON.stringify({
              latitude: latitude,
              longitude: longitude,
            }),
            {
              Authorization: "bearer " + token,
              "Content-Type": "application/json",
            }
          );

          // console.log(updateLocationResponse);
        } catch (error) {
          // console.log(error);
        }
      };

      updateLocation();

      const intervalId = setInterval(updateLocation, 5000);
      return () => {
        clearInterval(intervalId);
      };
    };

    fetchLocation();
  }, []);

  const origin = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : null;

  const handleMyLocationPress = () => {
    if (origin) {
      // console.log("My Current Location:", origin.latitude, origin.longitude);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  };

  const handleOrderLocationPress = () => {
    // console.log("Order Location Latitude:", orderLocation.latitude);
    // console.log("Order Location Longitude:", orderLocation.longitude);

    const orderLatitudeValue = parseFloat(orderLocation.latitude) || 0;
    const orderLongitudeValue = parseFloat(orderLocation.longitude) || 0;
    const orderLocationText = `Order Latitude: ${orderLatitudeValue}, Order Longitude: ${orderLongitudeValue}`;
    setLocationText(orderLocationText);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 5000);
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
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
              pinColor="red"
            />
          )}
          <Marker
            coordinate={{
              latitude: parseFloat(orderLocation.latitude),
              longitude: parseFloat(orderLocation.longitude),
            }}
            title="Order Location"
            pinColor="green"
          />
        </MapView>
      )}

      <Animated.View style={{ ...styles.textContainer, opacity: fadeAnim }}>
        <Text style={styles.text}>{locationText}</Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMyLocationPress}>
          <Text style={styles.buttonText}> My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleOrderLocationPress}
        >
          <Text style={styles.buttonText}> Order Location</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: "column",
    marginTop: 530,
    left: 20,
  },
  button: {
    backgroundColor: "#146C94",
    width: 320,
    height: 50,
    borderRadius: 10,
    elevation: 3,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFF",
    top: 9,
    textAlign: "center",
    fontWeight: "bold",
  },
  textContainer: {
    position: "absolute",
    top: 2,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 15.5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#146C94",
  },
});

export default OnWayLocation;
