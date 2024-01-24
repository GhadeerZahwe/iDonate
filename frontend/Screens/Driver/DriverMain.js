import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PendingOrders from "../../Screens/Driver/PendingOrders";
import OnTheWayOrders from "../../Screens/Driver/OnTheWayOrders";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const DriverMain = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFF",
                  textTransform: "none",
                },
                tabBarIndicatorStyle: { backgroundColor: "#fff" },
                tabBarStyle: {
                  backgroundColor: "#146C94",
                  marginTop: 40,
                  height: 50,
                },
                activeTintColor: "#FFF",
                inactiveTintColor: "#FFF",
              })}
            >
              <Tab.Screen name="Pending" component={PendingOrders} />
              <Tab.Screen name="On The Way" component={OnTheWayOrders} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default DriverMain;
