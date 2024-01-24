import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Background from "../../components/Background/Background";
import DonationBar from "../../components/DonationBar/DonationBar";
import Greeting from "../../components/Greeting/Greeting";
import Donationcard from "../../components/DonationCard/DonationCard";

const DonorMain = () => {
  const header = () => {
    return (
      <View style={styles.main}>
        <Background />

        <Greeting />
        <Image
          source={require("../../assets/CenteredLogo.png")}
          style={{
            marginLeft: 256,
            top: 65,
            width: 90,
            height: 100,
            position: "absolute",
            zIndex: 2,
          }}
        />
        <DonationBar />
        <Text style={styles.title}>Donate today. Change a life!</Text>

        <Donationcard />
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            top: 60,
          }}
        ></View>
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
    marginBottom: 500,
    height: 560,
    position: "relative",
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

export default DonorMain;
