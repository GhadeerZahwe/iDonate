import { createStackNavigator } from "@react-navigation/stack";
import DonorTabStack from "./DonorTabStack";
import Donate from "../Screens/Donor/Donate";
import Map from "../Screens/Donor/Map";

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
        name="Map"
        component={Map}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          title: "Map",
        }}
      />
    </Stack.Navigator>
  );
};

export default DonorOnboardingStack;
