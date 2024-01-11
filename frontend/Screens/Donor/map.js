import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Geolocation from "react-native-geolocation-service";

const Map = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    // Request location permission
    Geolocation.requestAuthorization("whenInUse").then((granted) => {
      if (granted) {
        // Get current location
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        // Watch for location updates
        const watchId = Geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          (error) => console.error(error),
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 10,
          }
        );

        // Clean up the watcher on component unmount
        return () => Geolocation.clearWatch(watchId);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="My Location"
          />
        )}
      </MapView>
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

export default Map;
