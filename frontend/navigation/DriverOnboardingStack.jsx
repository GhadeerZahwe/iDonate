import { createStackNavigator } from "@react-navigation/stack";
import AddTrip from "../Screens/Driver/AddTrip";
import DriverTabStack from "./DriverTabStack";

const Stack = createStackNavigator();

const DriverOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="driver" component={DriverTabStack} />
      <Stack.Screen
        name="AddTrip"
        component={AddTrip}
        options={{ headerShown: true, title: "Add Trip" }}
      />
    </Stack.Navigator>
  );
};

export default DriverOnboardingStack;
