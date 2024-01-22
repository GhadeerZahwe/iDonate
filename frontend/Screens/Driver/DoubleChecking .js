// DoubleChecking.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const DoubleChecking = ({ route }) => {
  const { handleWeightCheck, orderId } = route.params;
  const [checkedWeight, setCheckedWeight] = useState(null);

  const handleCheckWeight = async () => {
    try {
      const result = await handleWeightCheck(orderId);
      setCheckedWeight(result.total_weight);
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/donation.png")}
        style={styles.image}
      />
      {checkedWeight !== null && (
        <Text style={styles.weightText}>Total Weight: {checkedWeight} kg</Text>
      )}
      <TouchableOpacity
        onPress={handleCheckWeight}
        style={styles.checkWeightButton}
      >
        <Text style={styles.checkWeightButtonText}>Check Weight</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    marginTop: 50,
    width: 260,
    height: 260,
  },
  checkWeightButton: {
    backgroundColor: "#146C94",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 200,
    width: 332,
  },
  checkWeightButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  weightText: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "#146C94",
  },
});

export default DoubleChecking;
