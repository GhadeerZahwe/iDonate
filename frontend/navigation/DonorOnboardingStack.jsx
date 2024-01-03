import { createStackNavigator } from "@react-navigation/stack";
import map from "../Screens/Donor/map";
import { Ionicons } from "@expo/vector-icons";
import DonorTabStack from "./DonorTabstack";

const Stack = createStackNavigator();

const DonorOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="donor" component={DonorTabStack} />
      {/* <Stack.Screen name="orders" component={Orders} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Current Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
        name="map"
        component={map}
      /> */}
    </Stack.Navigator>
  );
};

export default DonorOnboardingStack;
