import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '../components/Button'; // Adjust path as needed
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

type ChangeUsernameProps = {
    usingChangeUsername: boolean;
    setUsingChangeUsername: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
export default function ChangeUsername({ usingChangeUsername, setUsingChangeUsername }: ChangeUsernameProps) {
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = async () => {
    if (!newUsername) {
      Alert.alert("Error", "Please enter a new username.");
      return;
    }

    setLoading(true);
    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, "UserCol", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          username: newUsername,
        });
        Alert.alert("Success", "Username updated successfully!");
        setUsingChangeUsername(false);
      } else {
        Alert.alert("Error", "No user is currently signed in.");
      }
    } catch (error: any) {
      console.error("Error updating username:", error);
      Alert.alert("Error", "Failed to update username: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Username:</Text>
      <TextInput
        style={styles.input}
        value={newUsername}
        onChangeText={setNewUsername}
        placeholder="Enter your new username"
      />
      <Button
        label={loading ? "Updating..." : "Update Username"}
        onPress={handleChangeUsername}
        theme='edit'
        disabled={loading}
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
