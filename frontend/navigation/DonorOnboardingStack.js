// DonorOnboardingStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DonorTabStack from "./DonorTabStack";
import Donate from "../Screens/Donor/Donate";
import MapLocation from "../Screens/Donor/MapLocation";
import TrackLocation from "../Screens/Donor/TrackLocation";

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
    </Stack.Navigator>
  );
};

export default DonorOnboardingStack;
