import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Background from "./components/Background/Background";
export default function App() {
  return (
    <View style={styles.container}>
      <Background />
      <Text>Ghadder Hiiiiwssssssi</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
