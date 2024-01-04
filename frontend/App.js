import { StyleSheet, Text, View } from "react-native";
import Background from "./components/Background/Background";
import Logo from "./components/Logo/logo";
import Search from "./components/Search/Search";
import Order from "./components/Order/Order";
import RegisterLogo from "./components/RegisterLogo/RegisterLogo";
import CenteredLogo from "./components/CenteredLogo/CenteredLogo";
import DonorMain from "./Screens/Donor/DonorMain";
import PreRegister from "./Screens/Auth/PreRegister";
import Login from "./Screens/Auth/Login";
import RegisterDonor from "./Screens/Auth/RegisterDonor";
import RegisterDriver from "./Screens/Auth/RegisterDriver";

export default function App() {
  return (
    <View>
      <RegisterDriver />
      {/* <RegisterDonor /> */}
      {/* <Login /> */}
      {/* <PreRegister /> */}
      {/* <RegisterLogo /> */}
      {/* <DonorMain /> */}
      {/* <CenteredLogo /> */}
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
