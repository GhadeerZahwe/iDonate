import { StyleSheet, View, Text } from "react-native";
import UseHttp from "../../hooks/request";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  const token = await retrieveData();
  return token;
};

export default function PassengerMain() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const result = await UseHttp("getFullName", "GET", "", {
        Authorization: "bearer " + token,
      });
      setFirstName(result.first_name);
      setLastName(result.last_name);
    };
    fetchData();
  }, []);
  // ...
  const profile = () => {
    alert("my profile");
  };
  return (
    <Text style={styles.name} onPress={profile}>
      Hello,{"\n"}
      {first_name} {last_name}
    </Text>
  );
}

const styles = StyleSheet.create({
  name: {
    left: 255,
    top: 80,
    position: "absolute",
    zIndex: 2,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
