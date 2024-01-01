import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Background from "./components/Background/Background";
import Logo from "./components/Logo/logo";
export default function App() {
  return (
    <View style={styles.container}>
      <Logo />

      <Background />
      <Logo />

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
