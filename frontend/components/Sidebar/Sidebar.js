// Sidebar.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Sidebar = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("Logout");
    // Implement your logout logic here
    // For example, you can navigate to the logout screen or dispatch a logout action
    // navigation.navigate("Logout");
  };

  const handleCompletedOrders = () => {
    console.log("Orders");
    // Implement your logic for navigating to the completed orders screen
    // navigation.navigate("DonorCompletedOrders");
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={handleCompletedOrders}
      >
        <FontAwesome name="check-circle" size={20} color="black" />
        <Text style={styles.sidebarItemText}>Completed Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={20} color="black" />
        <Text style={styles.sidebarItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#fff",
    padding: 20,
    width: 200,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    elevation: 5,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sidebarItemText: {
    marginLeft: 10,
  },
});

export default Sidebar;
