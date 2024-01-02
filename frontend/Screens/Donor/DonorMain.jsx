import { StyleSheet, View, Image, Text } from "react-native";
import Background from "../../components/Background/Background";
import Greeting from "../../components/Greeting/Greeting";
import Logo from "../../components/Logo/logo";
import Search from "../../components/Search/Search";
import Donorcard from "../../components/DonorCard/DonorCard";

const DonorMain = () => {
  return (
    <View>
      <Background />
      <Logo />
      {/* <Greeting />
      <Search /> */}
      <Donorcard />
    </View>
  );
};
export default DonorMain;

const styles = StyleSheet.create({});
