import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCIIv9HI_Mv6_qJXiRpgn9NLjvDGyTt_g4",
  authDomain: "idonate-411910.firebaseapp.com",
  projectId: "idonate-411910",
  storageBucket: "idonate-411910.appspot.com",
  messagingSenderId: "124869000256",
  appId: "1:124869000256:android:d0b559ba5e7661b9cbf3a5",
  databaseURL: "https://idonate-411910-default-rtdb.firebaseio.com",
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
