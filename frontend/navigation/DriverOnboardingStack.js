import { createStackNavigator } from "@react-navigation/stack";
import DriverTabStack from "./DriverTabStack";
import OrderLocation from "../Screens/Driver/OrderLocation";
import OnWayLocation from "../Screens/Driver/OnWayLocation";
import DoubleChecking from "../Screens/Driver/DoubleChecking ";

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
      <Stack.Screen
        name="DoubleChecking"
        component={DoubleChecking}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Double Checking Weight",
        }}
      />
      <Stack.Screen
        name="OnWayLocation"
        component={OnWayLocation}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "On Way Location",
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
