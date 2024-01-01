import { StyleSheet, View, Text } from "react-native";
export default function DonorMain() {
  return <Text style={StyleSheet.name}> Hello, {"\n"} Ghadeer Zahwe</Text>;
}

const styles = StyleSheet.create({
  name: {
    left: 300,
    top: 40,
    position: "absolute",
    zIndex: 2,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
