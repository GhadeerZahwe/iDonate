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
      <View style={{ height: 80 }}></View>
      <RegisterLogo />

      <View style={{ gap: 25 }}>
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
        <Text style={{ fontSize: 24, color: "#FFF", left: 100 }}>Register</Text>
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
    top: 145,
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
    width: 317,
    padding: 10,
    top: 530,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 15,
    position: "absolute",
    elevation: 10,
  },
});
