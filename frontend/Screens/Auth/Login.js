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
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("driver2@gmail.com");
  const [password, setPassword] = useState("code123");
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
      console.log("Error storing token:", error);
    }

    if (result.status === "success") {
      dispatch(login());
    } else {
      alert("wrong credentials");
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#F6F1F1" }}>
      <Background />
      <CenteredLogo />
      <View style={{ gap: 20 }}>
        <TextInput
          style={styles.TextInput}
          placeholder="  Email"
          placeholderTextColor={"black"}
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="  Password"
          placeholderTextColor={"black"}
          secureTextEntry={true}
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
      </View>
      <TouchableOpacity style={styles.Login_btn}>
        <Text style={{ fontSize: 24, color: "#FFF", top: 8, left: 125 }}>
          Login
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 17,
          color: "#000",
          top: 40,
          left: 40,
          marginBottom: 500,
        }}
      >
        Don't have an account?{" "}
        <Text style={{ fontWeight: "bold" }}>Sign up</Text>
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 300,
    borderRadius: 15,
    top: 20,
    height: 50,
    alignSelf: "center",
    elevation: 20,
  },
  Login_btn: {
    backgroundColor: "#146C94",
    width: 300,
    padding: 10,
    marginTop: 7,
    top: 20,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
    elevation: 10,
  },
  loginText: {
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
  },
});
