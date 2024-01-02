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
    <View style={{ backgroundColor: "#FFF" }}>
      <Background />
      <CenteredLogo />
      <TouchableOpacity style={styles.donor}>
        <Text style={{ fontSize: 24, color: "#FFF", top: 12, left: 90 }}>
          Donor
        </Text>
      </TouchableOpacity>

      <View style={{ top: 100 }}>
        <TouchableOpacity style={styles.driver}>
          <Text style={{ fontSize: 24, color: "#FFF", top: 13, left: 80 }}>
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
    marginBottom: 2,
    borderRadius: 15,
    elevation: 5,
  },
  driver: {
    backgroundColor: "#146C94",
    width: 250,
    height: 60,
    left: 60,
    marginTop: 150,
    borderRadius: 15,
    elevation: 5,
  },
});
