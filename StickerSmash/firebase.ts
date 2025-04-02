import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth, getReactNativePersistence } from "firebase/auth"; // Import getReactNativePersistence
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import Platform from "react-native";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1wZaTO3IXSZS_iBJJq8HKTUCqKvUDOmI",
  authDomain: "lookout-5fee5.firebaseapp.com",
  projectId: "lookout-5fee5",
  storageBucket: "lookout-5fee5.firebasestorage.app",
  messagingSenderId: "191644762711",
  appId: "1:191644762711:web:6559aa6606d8e5bcb75912",
  measurementId: "G-SK87BDC73C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics; // Declare analytics outside the if statement
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication
const firebaseAuth: Auth = getAuth(app);


export { firebaseAuth };

const firestore = initializeFirestore(app, {
  // Your Firestore settings
});

//THESE ARE THE LINES THAT WILL MESS US UP LONG TERM BECAUSE THIS IS THE LINE THAT SAYS IT ONLY WORKS IN DEVELOPMENT NOT IN REAL LIFE
//TO MAKE IT WORK IN REAL LIFE WE HAVE TO REJECT EXPO GO AND RECONFIGURE A BUNCH OF STUFF (AND I DON'T KNOW HOW YET)
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(firebaseAuth, "http://localhost:9099");
  }
  if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  }
}


export { firestore };
