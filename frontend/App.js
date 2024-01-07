import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import StackSwitcher from "./navigation/StackSwitcher";
import { store } from "./redux/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackSwitcher />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
