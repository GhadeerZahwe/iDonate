import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UseHttp from "../../hooks/request";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await UseHttp(
        "/logout",
        "POST",
        {},
        { Authorization: "Bearer " + token }
      );

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user_type");
      dispatch(logout());

      // navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    top: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#146C94",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#146C94",
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Logout;
