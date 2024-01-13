import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OnboardingStack from "./DonorOnboardingStack";
import DriverMain from "../Screens/Driver/DriverMain";
import CompletedOrders from "../Screens/Driver/CompletedOrders";
import Logout from "../Screens/Auth/Logout";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const DriverTabStack = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "DriverMain") {
            iconName = "home";
          } else if (route.name === "CompletedOrders") {
            iconName = "checkbox-marked-circle-outline";
          } else if (route.name === "Logout") {
            iconName = "exit-to-app";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#146C94", // Color for selected tab icon
        inactiveTintColor: "black", // Color for unselected tab icons
      }}
    >
      <Tabs.Screen
        name="DriverMain"
        component={DriverMain}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="CompletedOrders"
        component={CompletedOrders}
        options={{
          title: "Completed Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="Logout"
        component={Logout}
        options={{
          title: "Logout",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, // hide tab bar on this screen
        }}
      />
    </Tabs.Navigator>
  );
};

export default DriverTabStack;
