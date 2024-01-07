import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Auth/Login";
import PreRegister from "../Screens/Auth/PreRegister";
import RegisterDriver from "../Screens/Auth/RegisterDriver";
import RegisterDonor from "../Screens/Auth/RegisterDonor";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login Screen" component={Login} />
      <Stack.Screen name="Preregister Screen" component={PreRegister} />
      <Stack.Screen
        name="RegisterDriver Screen"
        component={RegisterDriver}
        options={{
          headerShown: true,
          title: "Register Delivery",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="RegisterDonor Screen"
        component={RegisterDonor}
        options={{
          headerShown: true,
          title: "Register Donor",
          headerStyle: { backgroundColor: "#146C94" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
