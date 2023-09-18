import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKBUBqgumGrgyO8VpAz1YPV89PEst9iWg",
  authDomain: "fir-auth-9865c.firebaseapp.com",
  projectId: "fir-auth-9865c",
  storageBucket: "fir-auth-9865c.appspot.com",
  messagingSenderId: "482405879508",
  appId: "1:482405879508:web:d86ba02ae4ad13ed89b541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export {auth, db};