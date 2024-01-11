import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Map from "./Map";

const Donate = () => {
  const navigation = useNavigation();

  const [selectedWeight, setSelectedWeight] = useState(1); // Default weight: <1kg
  const [selectedDuration, setSelectedDuration] = useState(5); // Default duration: 5 hrs
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+961 ");
  const [isMapPageVisible, setMapPageVisibility] = useState(false);

  const handleWeightChange = (value) => {
    setSelectedWeight(value);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handlePhoneNumberChange = (text) => {
    // Ensure that the phone number always starts with "+961 " and add a space
    setPhoneNumber(text.startsWith("+961") ? text : "+961 " + text);
  };
  const handleMapIconClick = () => {
    // Toggle the visibility of the map page
    setMapPageVisibility(!isMapPageVisible);
  };
  const handleConfirm = () => {
    // Implement the logic you want to execute when the Confirm button is pressed
    // For example, you might want to submit the donation details to a server
    // and then navigate to a success page.
    alert("Donation confirmed!"); // You can replace this with your actual logic.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Weight Range:</Text>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={40}
        step={1}
        value={selectedWeight}
        onValueChange={handleWeightChange}
        minimumTrackTintColor="#146C94" // Set the color of the slider track before the thumb
        thumbTintColor="#146C94" // Set the color of the thumb (circle)
      />

      <Text style={styles.subText}>Pickup within:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDuration === 5 && styles.selectedButton,
          ]}
          onPress={() => handleDurationChange(5)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedDuration === 5 && styles.selectedButtonText,
            ]}
          >
            5 hrs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedDuration === 10 && styles.selectedButton,
          ]}
          onPress={() => handleDurationChange(10)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedDuration === 10 && styles.selectedButtonText,
            ]}
          >
            10 hrs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedDuration === 24 && styles.selectedButton,
          ]}
          onPress={() => handleDurationChange(24)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedDuration === 24 && styles.selectedButtonText,
            ]}
          >
            24 hrs
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subText}>Description:</Text>
      <TextInput
        style={styles.descriptionInput}
        multiline
        placeholder="Write your description here..."
        value={description}
        onChangeText={handleDescriptionChange}
      />

      <Text style={styles.subText}>Phone Number:</Text>
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="phone-pad"
      />

      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <View style={styles.pickupContainer}>
          <Text style={styles.pickupText}>Pick Up Order:</Text>
          <Icon
            name="map-marker"
            style={styles.pickupicon}
            size={30}
            color="#146C94"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleConfirm}>
        <View style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </View>
      </TouchableOpacity>
      {/* Display the map page if it's visible */}
      {isMapPageVisible && <Map />}
      <Text style={styles.selectedWeightText}>
        {`Selected Weight: <${selectedWeight}kg`}
      </Text>
      <Text
        style={styles.selectedWeightText}
      >{`Duration: ${selectedDuration} hrs`}</Text>
      <Text
        style={styles.selectedWeightText}
      >{`Phone Number: ${phoneNumber}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#146C94",
    marginTop: 20,
    marginBottom: 20,
  },
  subText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#146C94",
    marginBottom: 10,
    marginLeft: 4,
  },
  slider: {
    width: 330,
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 85,
    height: 50,
  },
  buttonText: {
    color: "#146C94",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 4,
  },
  selectedButton: {
    backgroundColor: "#146C94",
  },
  selectedButtonText: {
    color: "#fff",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#146C94",
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
    color: "#146C94",
    backgroundColor: "#fff",
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: "#146C94",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#146C94",
    backgroundColor: "#fff",
    marginBottom: 0,
  },
  selectedWeightText: {
    fontSize: 16,
    color: "#146C94",
    marginTop: 8,
  },
  pickupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  pickupText: {
    fontSize: 22,
    color: "#146C94",
    marginRight: 10,
    fontWeight: "bold",
    left: 4,
  },
  pickupicon: {
    size: 35,
    left: 15,
  },
  confirmButton: {
    backgroundColor: "#146C94",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 2,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Donate;
