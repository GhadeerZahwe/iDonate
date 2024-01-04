import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RegisterLogo from "../../components/RegisterLogo/RegisterLogo";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { useState } from "react";

function register() {
  alert("register");
}
export default function RegisterDonor() {
  //   const navigation = useNavigation();

  //   const [value, setValue] = useState("first");

  //   const login = () => {
  //     navigation.navigate("DonorOnboardingStack");
  //   };
  return (
    <View style={{ backgroundColor: "#F6F1F1", flex: 1 }}>
      <View style={{ height: 100 }}></View>
      <RegisterLogo />

      <View style={{ gap: 30 }}>
        <TextInput
          style={styles.first_name}
          placeholder="  First Name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.last_name}
          placeholder="  Last Name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.TextInput}
          placeholder="  Email"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.TextInput}
          placeholder="  Password"
          placeholderTextColor="black"
        />
      </View>
      <TouchableOpacity style={styles.register_btn}>
        <Text style={{ fontSize: 24, color: "#FFF", top: 8, left: 30 }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  first_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 150,
    borderRadius: 15,
    top: 220,
    left: 20,
    height: 50,
    elevation: 10,
  },
  last_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 150,
    borderRadius: 15,
    top: 140,
    left: 190,
    height: 50,
    elevation: 10,
  },
  TextInput: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 320,
    height: 50,
    borderRadius: 15,
    top: 155,
    left: 20,
    elevation: 10,
  },
  register_btn: {
    backgroundColor: "#146C94",
    width: 150,
    height: 50,
    top: 500,
    left: 110,
    borderRadius: 15,
    elevation: 5,
  },
});
