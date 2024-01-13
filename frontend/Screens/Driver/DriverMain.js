import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Background from "../../components/Background/Background";
import DonationBar from "../../components/DonationBar/DonationBar";
import Greeting from "../../components/Greeting/Greeting";
import Donationcard from "../../components/DonationCard/DonationCard";
import Search from "../../components/Search/Search";
import DeliveryOrderBar from "../../components/DeliveryOrderBar/DeliveryOrderBar";
import OrdersScreen from "../../components/OrderScreen/OrderScreen";

const DriverMain = () => {
  const header = () => {
    return (
      <View style={styles.main}>
        <Background
          style={{
            height: 50,
          }}
        />
        <Image
          source={require("../../assets/CenteredLogo.png")}
          style={{
            marginLeft: 15,
            top: 55,
            width: 90,
            height: 100,
            position: "absolute",
            zIndex: 2,
          }}
        />
        <Greeting />
        <DeliveryOrderBar />
        <OrdersScreen />
        {/* <View
          style={{
            flexDirection: "column",
            gap: 10,
            top: 60,
          }}
        ></View> */}
      </View>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <DriverTripCard item={item} refreshData={refreshData} />
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ gap: -10 }}
      style={styles.list}
    />
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#F6F1F1",
    marginBottom: 200,
    height: 560,
  },
  logo: {
    top: 300,
  },
  title: {
    left: 20,
    top: 350,
    position: "absolute",
    zIndex: 2,
    fontSize: 13,
    color: "black",
    fontStyle: "italic",
  },
});

export default DriverMain;
