import { NavigationContainer, useNavigate } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTypeSwitcher from "./UserTypeSwitcher";
import AuthStack from "./Authstack";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StackSwitcher = () => {
  const stack = createStackNavigator();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function executeLogout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user_type");
    dispatch(logout());
  }

  return (
    <>
      <NavigationContainer>
        <FetchNavigation callback={executeLogout} />
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen
            name="Main Screen"
            component={auth.isLoggedIn ? UserTypeSwitcher : AuthStack}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

function FetchNavigation({ callback }) {
  const { fetch: originalFetch } = window;

  useEffect(() => {
    window.fetch = async (...args) => {
      let [resource, config] = args;
      const response = await originalFetch(resource, config);
      if (response.status === 401) {
        callback();
      }
      return response;
    };
    return () => {};
  }, []);
  return <></>;
}

export default StackSwitcher;
