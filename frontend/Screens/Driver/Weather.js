import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UseHttp from "../../hooks/request";
import WeatherAlert from "../../components/WeeatherAlert/WeatherAlert";

const WeatherComponent = () => {
  const [weatherText, setWeatherText] = useState("");
  const [temperature, setTemperature] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null ? value : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getToken = async () => {
    return await retrieveData();
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = await getToken();
        const weatherData = await UseHttp("getWeatherAdvice", "GET", "", {
          Authorization: "bearer " + token,
        });

        const advice = weatherData.response;
        const temp = weatherData.temperature;

        setWeatherText(advice);
        setTemperature(temp);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWeatherData();
  }, []);

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/weather.png")}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.checkWeatherButton}
          onPress={() => setIsAlertVisible(true)}
        >
          <Text style={styles.checkWeatherButtonText}>Check Weather</Text>
        </TouchableOpacity>
        <WeatherAlert
          visible={isAlertVisible}
          title="Current Temperature"
          message={weatherText || "The weather temperature in Beirut is 13°C"}
          onClose={handleCloseAlert}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#146C94",
    borderRadius: 13,
    marginTop: 120,
    width: 330,
    padding: 20,
    height: 370,
    alignItems: "center",
  },
  image: {
    width: 290,
    height: 250,
    top: 1,
    left: 5,
  },
  weatherText: {
    marginTop: 20,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  checkWeatherButton: {
    backgroundColor: "#19A7CE",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 5,
    width: 270,
    left: 3,
    marginBottom: 10,
  },
  checkWeatherButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WeatherComponent;
