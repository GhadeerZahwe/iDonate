import { StyleSheet, View, Text } from "react-native";

function DeliveryOrderBar() {
  return (
    <View style={styles.donation_bar}>
      <Text style={styles.donation_title}>TOTAL DONATIONS</Text>
      <Text style={styles.orders_count}>20</Text>
      <Text style={styles.delivered_title}>PEOPLE FED</Text>
      <Text style={styles.donations_number}>520</Text>
    </View>
  );
}
export default DeliveryOrderBar;

const styles = StyleSheet.create({
  donation_bar: {
    backgroundColor: "#19A7CE",
    top: 200,
    left: 13,
    height: 120,
    width: 335,
    position: "absolute",
    zIndex: 2,
    borderRadius: 15,
    marginBottom: 10,
  },
  donation_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.5)",
    top: 20,
    left: 30,
  },
  orders_count: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    top: 20,
    left: 75,
  },
  delivered_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    color: "rgba(255, 255, 255, 0.5)",
    top: -57,
    left: 210,
  },
  donations_number: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    top: -57,
    left: 220,
  },
});
