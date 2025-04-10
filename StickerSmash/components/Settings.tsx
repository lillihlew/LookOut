import { View, Text, StyleSheet } from 'react-native';
import SharedStyles from "@/app/styles";
import { useRouter } from 'expo-router';
import { signOut, getAuth } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Button from '../components/Button'
import { useEffect, useState } from 'react';
import ChangePassword from './UpdatePassword';
import ChangeUsername from './ChangeUsername';
import Groups from './Groups';

export default function Settings (){
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
        if (auth.currentUser) {
            setEmail(auth.currentUser.email); // Get email from auth

            // Fetch username from Firestore
            const userDocRef = doc(db, "UserCol", auth.currentUser.uid); // Assuming your document ID is the user's UID
            try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                setUsername(docSnap.data().username);
            } else {
                console.log("No such document!");
                setUsername("Username not found");
            }
            } catch (error) {
            console.error("Error fetching username:", error);
            setUsername("Error loading username");
            }
        }
        };
        fetchUserData();
    }, []);

      
      const handleSignOut = async () => {
        try {
          await signOut(auth); // Use the imported auth object
          // Sign-out successful.
          console.log("User signed out successfully.");
          // Optionally, redirect the user to the sign-in screen or perform other actions.
          router.replace('/'); // Use router to navigate to sign-in
        } catch (error: any) {
          // An error happened.
          console.error("Sign-out error:", error.message);
          // Handle the error (e.g., display an error message to the user).
        }
      };
    const [usingChangePassword, setUsingChangePassword] = useState<boolean>(false);
    const [usingChangeUsername, setUsingChangeUsername] = useState<boolean>(false);
  return (
    <View>
        <Text style = {styles.inputText}>Username: {username}</Text>
        <Text style = {styles.inputText}>Email: {email}</Text>
      <Button
             onPress={handleSignOut}
             theme="signout" 
             label="Sign out" />
        <Button
            label={"Change Username"}
            onPress={() =>{
                setUsingChangeUsername(true);
                }}
            theme = 'settings'
            />
        <Button
            label={"Change Password"}
            onPress={() =>{
                setUsingChangePassword(true);
                }}
            theme = 'settings'
            />
        {usingChangeUsername ? (<ChangeUsername usingChangeUsername={usingChangeUsername} setUsingChangeUsername={setUsingChangeUsername}/>) : <View/>}
        {usingChangePassword ? (<ChangePassword setUsingChangePassword={setUsingChangePassword} usingChangePassword={usingChangePassword}/>) : <View/>}
    </View>
  );
}

const styles = StyleSheet.create({
    inputText:{
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