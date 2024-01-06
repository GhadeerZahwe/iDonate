import DriverAllTrips from "../Screens/Driver/AllTrips";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import OnboardingStack from "./DonorOnboardingStack";
import DriverMain from "../Screens/Driver/DriverMain";

const DriverTabStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
        name="DriverMain"
        component={DriverMain}
      />

      <Tabs.Screen
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="clipboard-clock-outline"
              size={24}
              color="black"
            />
          ),
        }}
        name="DriverAllTrips"
        component={DriverAllTrips}
      />
      <Tabs.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
    </Tabs.Navigator>
  );
};

export default DriverTabStack;
