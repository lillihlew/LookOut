import { Text, View, StyleSheet, TextInput } from 'react-native';
import Button from '@/components/Button';
import { useState } from 'react';
import { useRouter} from 'expo-router';
import SharedStyles from './styles';
import {createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import {addDoc, collection, doc, setDoc } from 'firebase/firestore';
import {auth, db} from "../firebaseConfig"

async function addUser(username: string, email: string) {
  try {
    // Check if auth.currentUser exists
    if (!auth.currentUser) {
      console.warn("No user currently signed in.");
      return null; // Or handle this case as needed
    }

    // Use the user's UID as the document ID
    const userDocRef = doc(db, "UserCol", auth.currentUser.uid);
    await setDoc(userDocRef, { // Use setDoc to create/overwrite document
      username: username,
      email: email,
      createdAt: new Date().toISOString(),
    });
    return userDocRef; // Return the document reference
  } catch (e: any) {
    console.error(e);
    return null; // Or handle this case as needed
  }
}


export default function Index() {
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
            .then(async () => { 
              setPrintCheckEmail(true);
              addUser(username, email);
                try {
                await user.reload(); 
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
      <View style = {styles.container}>
        <Text style = {styles.textWhite}>Username:</Text>
        <TextInput 
            value={username}
            onChangeText = {(newValue: any) => {
                setUsername(newValue);
            }}
            style = {styles.inputText}
            placeholder = {"Enter your username"}
            placeholderTextColor = "#589100"
        />
        <Text style = {styles.textWhite}>Email:</Text>
        <TextInput 
            value={email}
            onChangeText = {(newValue: any) => {
                setEmail(newValue);
                
            }}
            style = {styles.inputText}
            placeholder = {"Enter your email address"}
            placeholderTextColor = "#589100"
        />
        <Text style = {styles.textWhite}>Password:</Text>
        <TextInput 
            value={password}
            onChangeText = {(newValue: any) => {
                setPassword(newValue);
            }}
            style = {styles.inputText}
            placeholder = {"Enter your password"}
            placeholderTextColor = "#589100"
        />
      </View>
    <View style={SharedStyles.footerContainer}>
      <Button 
        onPress={signIn}
        theme="signin" 
        label="Sign in" />
         <Button 
        onPress={createAccount}
        theme="add" 
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
    alignItems: 'flex-start', 
  },
  textWhite: {
    color: '#589100',
    marginLeft: 20,
    fontWeight: 'bold',
  },inputText:{
  borderWidth: 1,
  borderColor: "#589100",
  color: "#589100",
  borderRadius: 18,
  width: 316,
  height: 68,
  padding: 7,
  fontFamily: 'Arial',
  marginHorizontal: 20,
  alignItems: 'center',
},
});
