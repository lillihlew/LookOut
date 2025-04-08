// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC45Bb7GZlS8Ybb5OiFR7wtDoYU7U746b4",
  authDomain: "lookout-3ddf7.firebaseapp.com",
  projectId: "lookout-3ddf7",
  storageBucket: "lookout-3ddf7.firebasestorage.app",
  messagingSenderId: "609472168794",
  appId: "1:609472168794:web:8b24c068138aea3ef72963",
  measurementId: "G-9CHJYX9GNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let auth;
if (typeof window !== 'undefined') {
  // Web browser environment
  auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence, // Or browserLocalPersistence
  });
} else {
  // React Native environment
  const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage').default;
  const { getReactNativePersistence } = require('firebase/auth');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}
export { auth };