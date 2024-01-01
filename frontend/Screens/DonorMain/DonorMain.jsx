import { StyleSheet, View, Image, Text } from "react-native";
import Background from "../../components/Background/Background";
import Greeting from "../../components/Greeting/Greeting";
import Logo from "../../components/Logo/logo";
const DonorMain = () => {
  return (
    <View>
      <Background />
      <Logo />
      <Greeting />
    </View>
  );
};

const styles = StyleSheet.create({});
