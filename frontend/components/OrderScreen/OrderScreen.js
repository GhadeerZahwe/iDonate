import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PendingOrders from "../../Screens/Driver/PendingOrders";
import OnTheWayOrders from "../../Screens/Driver/OnTheWayOrders";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const OrderTabs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {() => (
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: { fontSize: 16, fontWeight: "bold" },
              indicatorStyle: { backgroundColor: "#fff" },
              style: { backgroundColor: "#146C94", marginTop: 70 }, // Add marginTop here
              //   tabBarStyle: { marginTop: 50 }, // Alternative way to add top space
              activeTintColor: "#FFF",
              inactiveTintColor: "#FFF",
            }}
            unmountOnBlur={false}
          >
            <Tab.Screen name="Pending" component={PendingOrders} />
            <Tab.Screen name="OnTheWay" component={OnTheWayOrders} />
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default OrderTabs;
