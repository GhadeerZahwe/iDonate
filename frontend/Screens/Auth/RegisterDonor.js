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
  const navigation = useNavigation();

  const [value, setValue] = useState("first");

  const login = () => {
    navigation.navigate("DonorOnboardingStack");
  };
  return (
    <View style={{ backgroundColor: "#F6F1F1", flex: 1 }}>
      <View style={{ height: 100 }}></View>
      <RegisterLogo />

      <View style={{ gap: 20 }}>
        <TextInput style={styles.first_name} placeholder="  First Name" />
        <TextInput style={styles.last_name} placeholder="  Last Name" />
        <TextInput style={styles.TextInput} placeholder="  Email" />
        <TextInput style={styles.TextInput} placeholder="  Password" />
      </View>
      <TouchableOpacity style={styles.register_btn} onPress={login}>
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
    left: 50,
    elevation: 10,
  },
  last_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 150,
    borderRadius: 15,
    top: 152,
    left: 220,
    elevation: 10,
  },
  TextInput: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 320,
    borderRadius: 15,
    top: 155,
    left: 50,
    elevation: 10,
  },
  register_btn: {
    backgroundColor: "#146C94",
    width: 150,
    height: 50,
    top: 200,
    left: 135,
    borderRadius: 15,
    elevation: 5,
  },
});
