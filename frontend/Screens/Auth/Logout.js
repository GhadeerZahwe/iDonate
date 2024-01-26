import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UseHttp from "../../hooks/request";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { FontAwesome5 } from "@expo/vector-icons"; // Make sure to install '@expo/vector-icons'
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      // console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="bell" size={20} color="#146C94" />
          <Text style={styles.tabButtonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="user" size={20} color="#146C94" />
          <Text style={styles.tabButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <FontAwesome5 name="file-alt" size={20} color="#146C94" />
          <Text style={styles.tabButtonText}>Notices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <MaterialCommunityIcons name="email" size={20} color="#146C94" />
          <Text style={styles.tabButtonText}>Contact us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="exit-to-app"
            size={20}
            color="#146C94"
          />
          <Text style={styles.tabButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    top: 0,
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
    top: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabsContainer: {
    alignItems: "start",
    width: "105%",
    innerHeight: 250,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "start",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 1,
  },
  tabButtonText: {
    color: "#146C94",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Logout;
