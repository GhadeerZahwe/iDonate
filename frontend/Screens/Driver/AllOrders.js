import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

function AllOrders() {
  return <Text style={styles.welcome_title}>All Orders</Text>;
}
const styles = StyleSheet.create({
  welcome_title: {
    marginTop: 50,
    fontSize: 32,
    fontWeight: "bold",
    // justifyContent: "center",
    // alignContent: "center",
    left: 80,
  },
});
export default AllOrders;
