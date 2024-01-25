import { StyleSheet, View, Text } from "react-native";

function DonationBar() {
  return (
    <View style={styles.donation_bar}>
      <Text style={styles.donation_title_total}>TOTAL </Text>
      <Text style={styles.donation_title}> DONATIONS</Text>
      <Text style={styles.orders_count}>20</Text>
      <Text style={styles.delivered_title_people}>PEOPLE </Text>
      <Text style={styles.delivered_title}> FED</Text>
      <Text style={styles.donations_number}>520</Text>
    </View>
  );
}
export default DonationBar;

const styles = StyleSheet.create({
  donation_bar: {
    backgroundColor: "#19A7CE",
    top: 208,
    left: 13,
    height: 120,
    width: 333,
    position: "absolute",
    zIndex: 2,
    borderRadius: 15,
  },
  donation_title_total: {
    fontSize: 17,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.5)",
    top: 16,
    left: 69,
  },
  donation_title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.5)",
    top: 13,
    left: 50,
  },
  orders_count: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    top: 8,
    left: 75,
  },
  delivered_title_people: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    color: "rgba(255, 255, 255, 0.5)",
    top: -82,
    left: 210,
  },
  delivered_title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    color: "rgba(255, 255, 255, 0.5)",
    top: -85,
    left: 225,
  },
  donations_number: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    top: -92,
    left: 215,
  },
});
