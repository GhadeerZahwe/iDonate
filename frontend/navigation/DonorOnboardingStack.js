import { createStackNavigator } from "@react-navigation/stack";
import DonorTabStack from "./DonorTabStack";
import Donate from "../Screens/Donor/Donate";

const Stack = createStackNavigator();

const DonorOnboardingStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Donor" component={DonorTabStack} />
      <Stack.Screen
        name="Donate"
        component={Donate}
        options={{ headerShown: true, title: "Donate" }}
      />
    </Stack.Navigator>
  );
};

export default DonorOnboardingStack;
