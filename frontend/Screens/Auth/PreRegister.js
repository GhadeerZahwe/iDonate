import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Background from "../../components/Background/Background";
import CenteredLogo from "../../components/CenteredLogo/CenteredLogo";
import { useNavigation } from "@react-navigation/native";

// function click() {
//   alert("register");
// }
export default function PreRegister() {
  //   const navigation = useNavigation();

  //   const donor = () => {
  //     navigation.navigate("RegisterDonor Screen");
  //   };

  //   const driver = () => {
  //     navigation.navigate("RegisterDriver Screen");
  //   };

  return (
    <View style={{ backgroundColor: "#F6F1F1" }}>
      <Background />
      <CenteredLogo />
      <View style={{ backgroundColor: "#F6F1F1", top: 30 }}>
        <TouchableOpacity style={styles.donor}>
          <Text style={{ fontSize: 24, color: "#F6F1F1", top: 12, left: 90 }}>
            Donor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.driver}>
          <Text style={{ fontSize: 24, color: "#F6F1F1", top: 13, left: 80 }}>
            Delivery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  donor: {
    backgroundColor: "#19A7CE",
    width: 250,
    height: 60,
    left: 60,
    marginBottom: 40,
    borderRadius: 15,
    elevation: 5,
  },
  driver: {
    backgroundColor: "#146C94",
    width: 250,
    height: 60,
    left: 60,
    top: 20,
    marginBottom: 190,
    borderRadius: 15,
    elevation: 5,
  },
});
