import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

const TrackLocation = () => {
  const route = useRoute();
  const { deliveryLatitude, deliveryLongitude } = route.params;
  const [locationText, setLocationText] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const updateLocation = async () => {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        const latitude = currentLocation.coords.latitude || 0;
        const longitude = currentLocation.coords.longitude || 0;
        const currentLocationText = `Current Latitude: ${latitude}, Current Longitude: ${longitude}`;
        setLocationText(currentLocationText);
      };

      updateLocation();

      const intervalId = setInterval(updateLocation, 2000);
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

  const deliveryLocationCoords =
    deliveryLatitude !== undefined && deliveryLongitude !== undefined
      ? {
          latitude: parseFloat(deliveryLatitude),
          longitude: parseFloat(deliveryLongitude),
        }
      : null;

  const animateLocation = () => {
    if (location) {
      const latitude = location.coords.latitude || 0;
      const longitude = location.coords.longitude || 0;
      const currentLocationText = `Current Latitude: ${latitude}, Current Longitude: ${longitude}`;
      // console.log(currentLocationText);
      setLocationText(currentLocationText);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 1000);
    }
  };

  const animateDeliveryLocation = () => {
    if (deliveryLatitude && deliveryLongitude) {
      const deliveryLatitudeValue = parseFloat(deliveryLatitude) || 0;
      const deliveryLongitudeValue = parseFloat(deliveryLongitude) || 0;
      // console.log("Delivery Latitude value:", deliveryLatitudeValue);
      const deliveryLocationText = `Delivery Latitude: ${deliveryLatitude}, Delivery Longitude: ${deliveryLongitude}`;
      // console.log("Delivery Location Button Pressed");
      // console.log("Delivery Location Text:", deliveryLocationText);
      setLocationText(deliveryLocationText);

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
      }, 10000);
    }
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
          {deliveryLocationCoords && (
            <Marker
              coordinate={deliveryLocationCoords}
              title="Delivery Location"
              pinColor="green"
            />
          )}
        </MapView>
      )}

      <Animated.View style={{ ...styles.textContainer, opacity: fadeAnim }}>
        <Text style={styles.text}>{locationText}</Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={animateLocation}>
          <Text style={styles.buttonText}> My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={animateDeliveryLocation}
        >
          <Text style={styles.buttonText}> Delivery Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 107,
  },
  button: {
    backgroundColor: "#146C94",
    width: 320,
    height: 50,
    top: 195,
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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

export default TrackLocation;
