import { Text, View, StyleSheet, TextInput } from 'react-native';
import Button from '@/components/Button';
import { useState } from 'react';
import { useRouter} from 'expo-router';
import SharedStyles from './styles';
import {createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import {addDoc, collection } from 'firebase/firestore';
import {auth, db} from "../firebaseConfig"

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
      // sendEmailVerification(user)
      //   .then(() => {
      //     // Email verification sent!
      //     // ...
      //     setPrintCheckEmail(true);
      //   });
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
            style = {SharedStyles.inputText}
            placeholder = {"Enter your username"}
            placeholderTextColor = "#fff"
        />
        <Text style = {styles.textWhite}>Email:</Text>
        <TextInput 
            value={email}
            onChangeText = {(newValue: any) => {
                setEmail(newValue);
                
            }}
            style = {SharedStyles.inputText}
            placeholder = {"Enter your email address"}
            placeholderTextColor = "#fff"
        />
        <Text style = {styles.textWhite}>Password:</Text>
        <TextInput 
            value={password}
            onChangeText = {(newValue: any) => {
                setPassword(newValue);
            }}
            style = {SharedStyles.inputText}
            placeholder = {"Enter your password"}
            placeholderTextColor = "#fff"
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
    color: '#fff',
    marginLeft: 20,
},
});
