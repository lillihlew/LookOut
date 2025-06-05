import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getReactNativePersistence,
  initializeAuth,
  getAuth,
  browserLocalPersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
export const firebaseConfig = {
  apiKey: 'AIzaSyC45Bb7GZlS8Ybb5OiFR7wtDoYU7U746b4',
  authDomain: 'lookout-3ddf7.firebaseapp.com',
  projectId: 'lookout-3ddf7',
  storageBucket: 'lookout-3ddf7.appspot.com',
  messagingSenderId: '609472168794',
  appId: '1:609472168794:web:8b24c068138aea3ef72963',
  measurementId: 'G-9CHJYX9GNW',
};

// Init Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Auth: support both native (Expo) and web
let auth;

if (typeof window === 'undefined') {
  // Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  // Web
  auth = getAuth(app);
}

export { auth };
