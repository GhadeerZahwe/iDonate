import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import DonorTabStack from "./DonorTabStack";
import Donate from "../Screens/Donor/Donate";
import MapLocation from "../Screens/Donor/MapLocation";
import TrackLocation from "../Screens/Donor/TrackLocation";
import Chat from "../Screens/Donor/chat";
import { Text, View } from "react-native";

const Stack = createStackNavigator();

const DonorOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Donor" component={DonorTabStack} />
      <Stack.Screen
        name="Donate"
        component={Donate}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Donation Details",
        }}
      />
      <Stack.Screen
        name="MapLocation"
        component={MapLocation}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Current Location",
        }}
      />
      <Stack.Screen
        name="TrackLocation"
        component={TrackLocation}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Track Location",
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5
                name="robot"
                size={24}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "white", fontSize: 18 }}>Chatty</Text>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default DonorOnboardingStack;
