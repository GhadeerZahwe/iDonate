import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import StackSwitcher from "./navigation/StackSwitcher";
import { store } from "./redux/store";
import { AppRegistry } from "react-native";

import { iDonate } from "@react-native-firebase/app";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackSwitcher />
      </Provider>
    </>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyCIIv9HI_Mv6_qJXiRpgn9NLjvDGyTt_g4",
  authDomain: "idonate-411910.firebaseapp.com",
  databaseURL: "https://idonate-411910-default-rtdb.firebaseio.com",
  projectId: "idonate-411910",
  storageBucket: "gs://idonate-411910.appspot.com",
  messagingSenderId: "124869000256",
  appId: "1:124869000256:android:d0b559ba5e7661b9cbf3a5",
  measurementId: "your-measurement-id",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
