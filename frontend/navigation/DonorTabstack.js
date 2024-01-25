import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DonorMain from "../Screens/Donor/DonorMain";
import DonorCurrentOrders from "../Screens/Donor/DonorCurrentOrders";
import DonorAllOrders from "../Screens/Donor/DonorAllOrders";
import DonorOnboardingStack from "./DonorOnboardingStack";
import Logout from "../Screens/Auth/Logout";
import MapLocation from "../Screens/Donor/MapLocation";
import Chat from "../Screens/Donor/chat";

const DonorTabStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: "#146C94",
        inactiveTintColor: "grey",
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hand-holding-heart" size={24} color={color} />
          ),
        }}
        name="DonorMain"
        component={DonorMain}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "Current Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-clock-outline"
              size={24}
              color={color}
            />
          ),
        }}
        name="DonorCurrentOrders"
        component={DonorCurrentOrders}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "Completed Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="check-circle" size={24} color={color} />
          ),
        }}
        name="DonorCompletedOrders"
        component={DonorAllOrders}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "Chatty",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="robot" size={24} color={color} />
          ),
        }}
        name="Chat"
        title="Chatty For Assistance"
        component={Chat}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={24} color={color} />
          ),
        }}
        name="Settings"
        component={Logout}
      />
      <Tabs.Screen
        name="DonorOnboardingStack"
        component={DonorOnboardingStack}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default DonorTabStack;
