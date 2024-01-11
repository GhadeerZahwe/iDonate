import DonorMain from "../Screens/Donor/DonorMain";
import DonorCurrentOrders from "../Screens/Donor/DonorCurrentOrders";
import DonorAllOrders from "../Screens/Donor/DonorAllOrders";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import OnboardingStack from "./DonorOnboardingStack";

const DonorTabStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
        name="DonorMain"
        component={DonorMain}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "Current Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="clipboard-clock-outline"
              size={24}
              color="black"
            />
          ),
        }}
        name="DonorCurrentOrders"
        component={DonorCurrentOrders}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          title: "Completed Orders",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
          tabBarIcon: () => (
            <FontAwesome5 name="check-circle" size={24} color="black" />
          ),
        }}
        name="DonorCompletedOrders"
        component={DonorAllOrders}
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

export default DonorTabStack;
