import { createStackNavigator } from "@react-navigation/stack";
import BussSchedule from "../Screens/Donor/AddOrder";
import map from "../Screens/Donor/map";
import DonorTabStack from "./DonorTabStack";

const Stack = createStackNavigator();

const DonorOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Donor" component={DonorTabStack} />
      <Stack.Screen name="BussSchedule" component={BussSchedule} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Current Reservations",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
        name="map"
        component={map}
      />
    </Stack.Navigator>
  );
};

export default DonorOnboardingStack;
