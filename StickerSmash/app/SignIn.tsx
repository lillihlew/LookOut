import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import { useRouter, Stack, Link} from 'expo-router';
import SharedStyles from './styles';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, EmailAuthCredential, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, } from 'firebase/firestore';
import {firebaseConfig, app, auth, db} from "../firebaseConfig"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

async function addUser(
  username: string,
  email: string,
) {
  try {
    const userCollection = collection(db, "UserCol");
    const docRef = await addDoc(userCollection, {
      username: username,
      email: email,
      createdAt: new Date().toISOString(),
    });
    return docRef;
  } catch (e : any){
    console.error(e)
  }
}



export default function SignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [printCheckEmail, setPrintCheckEmail] = useState<boolean>(false);
  const [printUserExists, setPrintUserExists] = useState<boolean>(false);
  const [printError, setPrintError] = useState('');
  const router = useRouter();
  
  const goToHome = async () => {
    router.push('/(tabs)/Home');
  };


  const createAccount = async () => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods && methods.length > 0) {
        setPrintUserExists(true);
        return;
      }
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
  
          sendEmailVerification(user)
            .then(async () => { // Make this an async function
              setPrintCheckEmail(true);
              addUser(username, email);
  
              // Force refresh AFTER sending verification email
              try {
                await user.reload(); // Wait for the reload to complete
                // After reload, the onAuthStateChanged listener will be triggered
                // and should detect that the user's email is verified.
              } catch (reloadError: any) {
                console.error("Error reloading user:", reloadError);
              }
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setPrintError(errorMessage)
        });
    } catch (error) {
      console.error("Error checking existing user:", error);
    }
  };

  const signIn = async () => {
    signInWithEmailAndPassword(auth, email, password) // Use imported auth
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sendEmailVerification(user)
        .then(() => {
          // Email verification sent!
          // ...
          setPrintCheckEmail(true);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setPrintError(errorMessage);
      // ..
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const isVerified = user.emailVerified;
      if (isVerified) {
        setLoggedIn(true);
        goToHome();
      } else {
        setPrintCheckEmail(true);
      }
    } else {
      setLoggedIn(false);
    }
  });

  
  return (
    <View style={SharedStyles.container}>
        <Text style = {SharedStyles.textWhite}> Username:</Text>
        <TextInput 
            value={username}
            onChangeText = {(newValue: any) => {
                setUsername(newValue);
            }}
            style = {SharedStyles.inputText}
            placeholder = {"Enter your username"}
            placeholderTextColor = "#fff"
        />
        <Text style = {SharedStyles.textWhite}> Email:</Text>
        <TextInput 
            value={email}
            onChangeText = {(newValue: any) => {
                setEmail(newValue);
                
            }}
            style = {SharedStyles.inputText}
            placeholder = {"Enter your email address"}
            placeholderTextColor = "#fff"
        />
        <Text style = {SharedStyles.textWhite}>Password:</Text>
        <TextInput 
            value={password}
            onChangeText = {(newValue: any) => {
                setPassword(newValue);
            }}
            style = {SharedStyles.inputText}
            placeholder = {"Enter your password"}
            placeholderTextColor = "#fff"
        />
    
    <View style={styles.footerContainer}>
      <Button 
        onPress={signIn}
        theme="primary" 
        label="Sign in" />
         <Button 
        onPress={createAccount}
        theme="primary" 
        label="Create Account" />
     
    </View>
    {printCheckEmail ? <Text>Check your email for a confirmation link!</Text> : <Text></Text>}
    {printUserExists ? <Text>User already exists! Click sign in instead.</Text> : <Text></Text>}
    {printError ? <Text>{printError}</Text>: <Text></Text>}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  textWhite: {
    color: '#fff',
  },
  textBlue: {
    color: '#9ff'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
