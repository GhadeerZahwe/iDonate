import { createStackNavigator } from "@react-navigation/stack";
import DriverTabStack from "./DriverTabStack";

const Stack = createStackNavigator();

const DriverOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="driver" component={DriverTabStack} />
    </Stack.Navigator>
  );
};

export default DriverOnboardingStack;
