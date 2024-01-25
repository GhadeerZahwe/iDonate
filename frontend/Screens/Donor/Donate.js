import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import UseHttp from "../../hooks/request";
import { DatePicker } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import QRCodeDisplay from "./QRCodeDisplay";
import MapLocation from "./MapLocation";

const Donate = () => {
  const navigation = useNavigation();
  const [selectedWeight, setSelectedWeight] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+961 | ");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [date, setDate] = useState("2024-01-16");
  const [location_description, setLocationDescription] = useState(" ");
  const [location_pickup, setLocationPickup] = useState("123 Street");
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const [isMapPageVisible, setMapPageVisibility] = useState(false);

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };
  const handleWeightChange = (value) => {
    setSelectedWeight(value);
  };
  const handleLocationDescription = (text) => {
    setLocationDescription(text);
  };
  const handleLatitude = (value) => {
    setLatitude(value);
  };
  const handleLongitude = (value) => {
    setLongitude(value);
  };
  const handleLocationPickup = (text) => {
    setLocationPickup(text);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text.startsWith("+961") ? text : "+961 " + text);
  };

  const handleMapIconClick = () => {
    navigation.navigate("MapLocation", {
      onLocationSelected: handleLocationSelected,
    });
  };

  const handleLocationSelected = (latitude, longitude) => {
    console.log(
      "Latitude and Longitude received in Donate:",
      latitude,
      longitude
    );
    setLatitude(latitude);
    setLongitude(longitude);
    setMapPageVisibility(false);
  };

  const formData = new FormData();
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getToken = async () => {
    const token = await retrieveData();
    return token;
  };

  const handleOrder = async () => {
    formData.append("total_weight", selectedWeight);
    formData.append("pickup_within", selectedDuration);
    formData.append("description", description);
    formData.append("phone_number", phoneNumber);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("location_description", location_description);
    formData.append("date", date);
    formData.append("location_pickup", location_pickup);
    const token = await getToken();
    const result = await UseHttp("addDonation", "POST", formData, {
      Authorization: "bearer " + token,
    });
    console.log(result);
  };

  const handleConfirm = () => {
    console.log(latitude);
    setShowCustomAlert(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}> Weight Range</Text>

        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={40}
          step={1}
          value={selectedWeight}
          onValueChange={handleWeightChange}
          minimumTrackTintColor="#146C94"
          thumbTintColor="#146C94"
        />
        <Text style={styles.selectedWeightText}>
          {`Selected Weight: <${selectedWeight}kg`}
        </Text>
        <Text style={styles.subText}>Pickup within</Text>
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
        <Text
          style={styles.selectedDurationText}
        >{`Duration: ${selectedDuration} hrs`}</Text>
        <Text style={styles.subText}>Donation Description</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Write your description here..."
          value={description}
          onChangeText={handleDescriptionChange}
        />

        <Text style={styles.subText}>Phone Number</Text>
        <TextInput
          style={styles.phoneNumberInput}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
        />
        <Text
          style={styles.selectedWeightText}
        >{`Phone Number: ${phoneNumber}`}</Text>
        {/* <Text style={styles.subText}>Location Pickup:</Text>
        <TextInput
          style={styles.LocationInput}
          placeholder="Enter location pickup"
          value={location_pickup}
          onChangeText={handleLocationPickup}
        /> */}

        <Text style={styles.subText}>Location Description</Text>
        <TextInput
          style={styles.LocationInput}
          placeholder="Enter location description"
          value={location_description}
          onChangeText={handleLocationDescription}
        />
        <Text
          style={styles.selectedWeightText}
        >{`Location Description: ${location_description}`}</Text>
        <TouchableOpacity onPress={handleMapIconClick}>
          <View style={styles.pickupContainer}>
            <Text style={styles.pickupText}>Pick Up Order</Text>
            <Icon
              name="map-marker"
              style={styles.pickupicon}
              size={30}
              color="#146C94"
            />
          </View>
        </TouchableOpacity>

        {/* <Text
          style={styles.selectedWeightText}
        >{`Location Pickup: ${location_pickup}`}</Text> */}

        <TouchableOpacity onPress={handleConfirm}>
          <View style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </View>
        </TouchableOpacity>

        <CustomAlert
          visible={showCustomAlert}
          title="Confirm Donation"
          message="Are you sure you want to confirm this donation?"
          onYes={() => {
            setShowCustomAlert(false);
            handleOrder();
            navigation.navigate("DonorCurrentOrders");
          }}
          onNo={() => setShowCustomAlert(false)}
        />
        {/* {<MapLocation />} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#146C94",
    marginTop: 11,
    marginBottom: 10,
  },
  text_weight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#146C94",
  },
  subText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#146C94",
    marginBottom: 10,
    marginLeft: 4,
    top: 8,
  },
  slider: {
    width: 330,
    height: 5,
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
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
    top: 4,
    height: 50,
    marginBottom: 5,
    color: "#146C94",
    backgroundColor: "#fff",
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: "#146C94",
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
    height: 50,
    color: "#146C94",
    backgroundColor: "#fff",
  },
  selectedWeightText: {
    fontSize: 16,
    color: "grey",
    top: 0,
    bottom: 25,
    left: 8,
  },
  pickupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  pickupText: {
    fontSize: 22,
    color: "#146C94",
    marginRight: 10,
    fontWeight: "bold",
    top: 14,
    left: 4,
  },
  pickupicon: {
    left: 15,
    top: 11,
  },
  confirmButton: {
    backgroundColor: "#146C94",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 30,
    width: 332,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  LocationInput: {
    borderWidth: 1,
    borderColor: "#146C94",
    borderRadius: 5,
    top: 4,
    height: 50,
    marginBottom: 5,
    color: "#146C94",
    backgroundColor: "#fff",
  },
  selectedDurationText: {
    fontSize: 16,
    color: "#146C94",
    left: 8,
  },
});

export default Donate;
