import { StyleSheet, Text, View } from "react-native";
import Background from "./components/Background/Background";
import Logo from "./components/Logo/logo";
import DonorMain from "./Screens/DonorMain/DonorMain";
import Search from "./components/Search/Search";

export default function App() {
  return (
    <View>
      {/* <Search /> */}
      <DonorMain />
      {/* <Logo />

      <Background />
      <Logo /> */}
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
