import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  apiKey: "AIzaSyCIIv9HI_Mv6_qJXiRpgn9NLjvDGyTt_g4",
  authDomain: "idonate-411910.firebaseapp.com",
  projectId: "idonate-411910",
  storageBucket: "idonate-411910.appspot.com",
  messagingSenderId: "124869000256",
  appId: "1:124869000256:android:d0b559ba5e7661b9cbf3a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
