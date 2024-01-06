import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { startTransition } from "react";
import AuthStack from "./AuthStack";
import UserTypeSwitcher from "./UsertypeSwitcher";

const StackSwitcher = () => {
  const stack = createStackNavigator();
  const auth = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen
          name="Main Screen"
          component={auth.isLoggedIn ? UserTypeSwitcher : AuthStack}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackSwitcher;