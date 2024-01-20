import { createStackNavigator } from "@react-navigation/stack";
import DriverTabStack from "./DriverTabStack";
import DriverMain from "../Screens/Driver/DriverMain";
import PendingOrders from "../Screens/Driver/PendingOrders";
import OrderLocation from "../Screens/Driver/OrderLocation";

const Stack = createStackNavigator();

const DriverOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="delivery" component={DriverTabStack} />
      <Stack.Screen
        name="OrderLocation"
        component={OrderLocation}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Order Location",
        }}
      />
      {/* <Stack.Screen
        name="DriverMain"
        component={DriverMain}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Pending Orders",
        }}
      /> */}
      {/* <Stack.Screen
        name="PendingOrders"
        component={PendingOrders}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Pending Orders", // Set the title for this component
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default DriverOnboardingStack;
