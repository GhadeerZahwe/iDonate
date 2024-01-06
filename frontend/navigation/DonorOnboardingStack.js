import { createStackNavigator } from "@react-navigation/stack";
import BussSchedule from "../Screens/Passenger/BussSchedule";
import map from "../Screens/Donor/map";
import DonorTabStack from "./DonorTabstack";

const Stack = createStackNavigator();

const DonorOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="donor" component={DonorTabStack} />
      {/* <Stack.Screen name="BussSchedule" component={BussSchedule} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Current Reservations",
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
