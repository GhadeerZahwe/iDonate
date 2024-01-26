import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Background from "../../components/Background/Background";
import CenteredLogo from "../../components/CenteredLogo/CenteredLogo";
import { useNavigation } from "@react-navigation/native";
import UseHttp from "../../hooks/request";
import { useDispatch } from "react-redux";
import { login, setUserData } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

export default function Login() {
  const [email, setEmail] = useState("driver2@gmail.com");
  const [password, setPassword] = useState("code123");
  const [alertVisible, setAlertVisible] = useState(false);

  const formData = new FormData();
  const navigation = useNavigation();
  const register = () => {
    navigation.navigate("Preregister Screen");
  };

  const dispatch = useDispatch();

  const handleLogin = async () => {
    formData.append("email", email);
    formData.append("password", password);
    const result = await UseHttp("login", "POST", formData);

    try {
      await AsyncStorage.setItem("token", result.authorisation.token);
      await AsyncStorage.setItem("user_type", result.user.user_type);
    } catch (error) {
      // console.log("Error storing token:", error);
    }

    if (result.status === "success") {
      dispatch(login());
    } else {
      showAlert();
    }
  };

  const showAlert = () => {
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "#F6F1F1" }}>
      <Background />
      <CenteredLogo />
      <View style={{ gap: 20 }}>
        <TextInput
          style={styles.TextInput}
          placeholder="  Email"
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="  Password"
          secureTextEntry={true}
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
      </View>
      <TouchableOpacity style={styles.Login_btn} onPress={handleLogin}>
        <Text
          style={{
            fontSize: 22,
            color: "#FFF",
            top: 8,
            left: 125,
            fontWeight: 500,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 17,
          color: "#000",
          top: 150,
          left: 33,
          marginBottom: 490,
        }}
      >
        Don't have an account?{" "}
        <Text style={{ fontWeight: "bold" }} onPress={register}>
          Sign up
        </Text>
      </Text>
      <AlertMessage
        visible={alertVisible}
        title="Wrong Credentials"
        message="Please check your email and password and try again."
        onClose={closeAlert} // Close the alert when "OK" is pressed
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  welcome_title: {
    fontSize: 32,
    fontWeight: "bold",
    left: 80,
  },
  TextInput: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 300,
    borderRadius: 10,
    top: 70,
    left: 30,
    elevation: 1,
  },
  Login_btn: {
    backgroundColor: "#146C94",
    width: 300,
    height: 50,
    top: 130,
    left: 30,
    borderRadius: 10,
    elevation: 1,
    fontWeight: 500,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#146C94",
  },
  alertMessage: {
    fontSize: 16,
    color: "#555",
  },
  alertContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  alertButton: {
    backgroundColor: "#146C94",
  },
});
