// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);