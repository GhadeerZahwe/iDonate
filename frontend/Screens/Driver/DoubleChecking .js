import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const DoubleChecking = ({ route }) => {
  const { handleWeightCheck, orderId, initialWeight } = route.params;
  const [checkedWeight, setCheckedWeight] = useState(initialWeight);

  useEffect(() => {
    // Initialize checkedWeight with initialWeight when the component mounts
    setCheckedWeight(initialWeight);
  }, [initialWeight]);

  const handleCheckWeight = async () => {
    try {
      const result = await handleWeightCheck(orderId);
      // Update checkedWeight with the newly retrieved value
      console.log(result.total_weight);
      setCheckedWeight(result.total_weight);
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/donation.png")}
          style={styles.image}
        />
        <View style={styles.weight_card}>
          {checkedWeight !== null && (
            <View>
              <Text style={styles.weightText}>Total Weight</Text>
              <Text style={styles.weightValue}>{checkedWeight} kg</Text>
            </View>
          )}
        </View>
      </View>
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
  card: {
    backgroundColor: "#146C94",
    borderRadius: 13,
    marginTop: 70,
    width: 330,
    padding: 20,
    height: 440,
    alignItems: "center",
  },
  weight_card: {
    backgroundColor: "#19A7CE",
    borderRadius: 15,
    marginTop: 18,
    left: 1,
    width: 190,
    padding: 20,
    alignItems: "center",
    height: 110,
  },
  image: {
    width: 260,
    height: 260,
    top: 11,
  },
  checkWeightButton: {
    backgroundColor: "#146C94",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 14,
    width: 332,
  },
  checkWeightButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18.5,
  },
  weightText: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
  },
  weightValue: {
    fontSize: 20,
    top: 10,
    fontWeight: "bold",
    color: "white",
    left: 26,
  },
});

export default DoubleChecking;
