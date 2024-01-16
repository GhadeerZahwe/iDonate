import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import RegisterLogo from "../../components/RegisterLogo/RegisterLogo";
import { useNavigation } from "@react-navigation/native";
import { login, setUserData } from "../../redux/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import DonorOnboardingStack from "../../navigation/DonorOnboardingStack";
import UseHttp from "../../hooks/request";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterDonor() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("first");
  const [first_name, setfirstName] = useState("Ali2");
  const [last_name, setLastName] = useState("Ayoub");
  const [email, setEmail] = useState("Ali2@gmail.com");
  const [password, setPassword] = useState("code123");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("user_type", "donor");

    const result = await UseHttp("register", "POST", formData, {
      "Content-Type": "multipart/form-data",
    });

    try {
      await AsyncStorage.setItem("token", result.authorisation.token);
      await AsyncStorage.setItem("user_type", result.user.user_type);
    } catch (error) {
      console.log("Error storing token:", error);
    }

    if (result.status === "success") {
      dispatch(login());
    } else {
      alert("wrong credentials");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#F6F1F1", flex: 1 }}>
      <View style={{ top: -40 }}>
        <RegisterLogo />
      </View>

      <View style={{ gap: 20, marginBottom: 180, top: 40 }}>
        <TextInput
          style={styles.first_name}
          placeholder="  First Name"
          onChangeText={(e) => {
            setfirstName(e);
          }}
        />
        <TextInput
          style={styles.last_name}
          placeholder="  Last Name"
          onChangeText={(e) => {
            setLastName(e);
          }}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="  Email"
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="  Password"
            secureTextEntry={!showPassword}
            onChangeText={(e) => {
              setPassword(e);
            }}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.register_btn} onPress={handleRegister}>
        <Text
          style={{
            fontSize: 24,
            color: "#FFF",
            top: 7,
            left: 113,
            fontWeight: 500,
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  first_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 154,
    borderRadius: 10,
    top: 220,
    left: 21,
    height: 49,
    elevation: 3,
  },
  last_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 156,
    height: 49,
    borderRadius: 10,
    top: 150,
    left: 185,
    elevation: 3,
  },
  TextInput: {
    backgroundColor: "#FFF",
    padding: 13,
    width: 320,
    borderRadius: 10,
    top: 155,
    left: 22,
    elevation: 3,
  },
  register_btn: {
    backgroundColor: "#146C94",
    width: 319,
    height: 53,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 10,
    marginBottom: 50,
    elevation: 5,
    // alignItems: center,
    // justifyContent: center,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 5,
    width: 320,
    borderRadius: 15,
    top: 155,
    left: 22,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    padding: 10,
  },
});
