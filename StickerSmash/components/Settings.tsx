import { View, Text, StyleSheet } from 'react-native';
import SharedStyles from "@/app/styles";
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import Button from '../components/Button'

export default function Settings (){
    const router = useRouter();
      
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
    
  return (
    <View>
        <Text style = {styles.inputText}>Username: </Text>
        <Text style = {styles.inputText}>Email: </Text>
      <Button
             onPress={handleSignOut}
             theme="signout" 
             label="Sign out" />
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