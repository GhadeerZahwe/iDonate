import { StyleSheet, Text, View } from "react-native";
import Background from "./components/Background/Background";
import Logo from "./components/Logo/logo";
import DonorMain from "./Screens/DonorMain/DonorMain";
import Search from "./components/Search/Search";
import Order from "./components/Order/Order";
import RegisterLogo from "./components/RegisterLogo/RegisterLogo";
export default function App() {
  return (
    <View>
      <RegisterLogo />
      {/* <DonorMain /> */}

      {/* <Order /> */}
      {/* <Search /> */}
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
