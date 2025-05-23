import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '../components/Button';
import { useState } from 'react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type ChangePasswordProps = {
    usingChangePassword: boolean;
    setUsingChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
export default function ChangeUsername({ usingChangePassword, setUsingChangePassword }: ChangePasswordProps) {  

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Error", "Please enter your current and new passwords.");
      return;
    }

    setLoading(true);
    try {
      if (auth.currentUser) {
        // Check if the user has an email address
        if (auth.currentUser.email) {
          // 1. Re-authenticate the user
          const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
          await reauthenticateWithCredential(auth.currentUser, credential);

          // 2. Update the password
          await updatePassword(auth.currentUser, newPassword);

          Alert.alert("Success", "Password updated successfully!");
          // Clear the input fields
          setCurrentPassword('');
          setNewPassword('');
          setUsingChangePassword(false);
        } else {
          Alert.alert("Error", "This user does not have an email address associated with their account. Password change is not possible.");
        }
      } else {
        Alert.alert("Error", "No user is currently signed in.");
      }
    } catch (error: any) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Password:</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={true}
        placeholder="Enter your current password"
      />

      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        placeholder="Enter your new password"
      />

      <Button
        label={loading ? "Updating..." : "Update Password"}
        onPress={handleChangePassword}
        disabled={loading}
        theme = 'settings'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
