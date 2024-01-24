import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import UseHttp from "../../hooks/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScanQRCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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

  const handleStatusOnScan = async (orderId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(orderId);

      const response = await UseHttp(
        `updateOrderStatusOnScan/${orderId}`,
        "POST",
        "",
        { Authorization: "Bearer " + token }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch API: ${response.status} ${response.statusText}`
        );
      }
      console.log(response);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(`Error during API fetch: ${error.message}`);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    console.log(data);
    const parts = data.split("_");
    const orderId = parts[1];

    console.log("Order ID:", orderId);

    Alert.alert(
      `BarCode ${data} has been scanned!`,
      "Do you want to update the order status?",
      [
        {
          text: "Cancel",
          onPress: () => setScanned(false),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const token = await getToken();
              const response = await handleStatusOnScan(orderId);

              Alert.alert("API Response", response.message);
            } catch (error) {
              console.error("Error updating order status:", error.message);
            } finally {
              setScanned(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    marginBottom: 20,
  },
});

export default ScanQRCode;
