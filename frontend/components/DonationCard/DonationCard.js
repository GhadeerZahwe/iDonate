import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function DonationCard() {
  const navigation = useNavigation();
  const handleDonatePress = () => {
    navigation.navigate("Donate");
  };
  return (
    <View style={styles.donation_bar}>
      <Image
        source={require("../../assets/foodwaste.jpg")}
        style={{ width: 140, height: 123, left: 47, top: 13, marginBottom: 0 }}
      />
      <Text style={styles.donation_title}></Text>
      <TouchableOpacity
        style={styles.add_donation_btn}
        onPress={handleDonatePress}
      >
        <Text style={styles.add_donation_txt}>Donate</Text>
      </TouchableOpacity>
    </View>
  );
}
export default DonationCard;

const styles = StyleSheet.create({
  donation_bar: {
    backgroundColor: "white",
    top: 400,
    left: 70,
    height: 200,
    width: 225,
    position: "absolute",
    zIndex: 2,
    borderRadius: 18,
  },
  add_donation_btn: {
    backgroundColor: "#146C94",
    borderRadius: 15,
    padding: 10,
    left: 43,
    width: 150,
    borderRadius: 18,
  },
  add_donation_txt: {
    color: "#FFF",
    fontSize: 18,
    left: 34,
  },
  donation_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.5)",
    top: 20,
    left: 30,
  },
});
