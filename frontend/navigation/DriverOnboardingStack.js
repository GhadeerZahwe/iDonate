import { createStackNavigator } from "@react-navigation/stack";
import AcceptOrder from "../Screens/Driver/AcceptOrder";
import DriverTabStack from "./DriverTabStack";
import map from "../Screens/Donor/map";

const Stack = createStackNavigator();

const DriverOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="driver" component={DriverTabStack} />
      <Stack.Screen
        name="AcceptOrder"
        component={AcceptOrder}
        options={{ headerShown: true, title: "Add Order" }}
      />
    </Stack.Navigator>
  );
};

export default DriverOnboardingStack;
