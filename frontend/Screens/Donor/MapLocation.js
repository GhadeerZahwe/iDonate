import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

const MapLocation = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation(); // Get navigation prop
  const route = useRoute();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  const handleAddLocation = () => {
    console.log(
      "Location",
      location.coords.latitude,
      location.coords.longitude
    );
    route.params.onLocationSelected(
      location.coords.latitude,
      location.coords.longitude
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select your location:</Text>
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
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="This is my current location"
          />
        </MapView>
      )}
      <TouchableOpacity onPress={handleAddLocation}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add My Location</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  map: {
    width: "100%",
    height: 510,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#146C94",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 5,
    width: 300,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default MapLocation;
