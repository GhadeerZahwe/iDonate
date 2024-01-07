import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTypeSwitcher from "./UserTypeSwitcher";
import AuthStack from "./Authstack";
import { useSelector } from "react-redux";

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
