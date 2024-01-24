import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import WeightAlert from "../../components/WeightAlert/WeightAlert";
import { useNavigation, useRoute } from "@react-navigation/native";

const DoubleChecking = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [checkedWeight, setCheckedWeight] = useState(
    route.params.initialWeight
  );

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log(
      "Initial Weight in DoubleChecking:",
      route.params.initialWeight
    );
    setCheckedWeight(route.params.initialWeight);
  }, [route.params.initialWeight]);

  const handleCheckWeight = async () => {
    try {
      const result = await route.params.handleWeightCheck(route.params.orderId);
      // Update checkedWeight with the newly retrieved value
      console.log(result.total_weight);
      setCheckedWeight(result.total_weight);

      // Set the title and message for the custom alert
      setAlertTitle("Total Weight Checked");
      setAlertMessage(`The total weight is ${result.total_weight} kg.`);

      // Show the custom alert
      setAlertVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseAlert = () => {
    // Hide the custom alert
    setAlertVisible(false);
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

      {/* Render the custom alert */}
      <WeightAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
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
    left: 29,
  },
});

export default DoubleChecking;
