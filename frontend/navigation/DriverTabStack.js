import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OnboardingStack from "./DonorOnboardingStack";
import DriverMain from "../Screens/Driver/DriverMain";
import Logout from "../Screens/Auth/Logout";
import DonorCompletedOrders from "../Screens/Driver/CompletedOrders";
import ScanQRCode from "../Screens/Driver/ScanQRCode"; // Import the new component
import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons library

const DriverTabStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "PendingOrders") {
            iconName = "clipboard-clock-outline";
          } else if (route.name === "OnTheWayOrders") {
            iconName = "truck-delivery";
          } else if (route.name === "DonorCompletedOrders") {
            iconName = "checkmark-done-outline";
          } else if (route.name === "Logout") {
            iconName = "settings";
          } else if (route.name === "ScanQRCode") {
            iconName = "qr-code-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#146C94",
        inactiveTintColor: "grey",
      }}
    >
      <Tabs.Screen
        name="Home"
        component={DriverMain}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="DonorCompletedOrders"
        component={DonorCompletedOrders}
        options={{
          headerShown: true,
          title: "Completed Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="ScanQRCode"
        component={ScanQRCode}
        options={{
          headerShown: true,
          title: "Scan",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
      {/* <Tabs.Screen
        name="PendingOrders"
        component={PendingOrders}
        options={{
          headerShown: true,
          title: "Pending Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="OnTheWayOrders"
        component={OnTheWayOrders}
        options={{
          headerShown: true,
          title: "On The Way Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      /> */}
      {/* <Tabs.Screen
        name="CompletedOrders"
        component={DonorCompletedOrders}
        options={{
          headerShown: true,
          title: "Completed Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      /> */}
      <Tabs.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: true,
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
