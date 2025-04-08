import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import SharedStyles from '../styles';
import Button from '../../components/Button'
import { signOut,  } from "firebase/auth";
import {auth} from "../../firebaseConfig"
import { useRouter} from 'expo-router';



const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24; // 2 columns with spacing

const ProfileScreen = () => {
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

  const [likedEvents, setLikedEvents] = useState([
    { id: 1, title: 'Indie Night', attendees: 12 },
    { id: 2, title: 'Trivia Night', attendees: 8 },
  ]);

  const [createdEvents, setCreatedEvents] = useState([
    { id: 3, title: 'My Party', attendees: 20 },
    { id: 4, title: 'Study Sesh', attendees: 5 },
  ]);

  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.attendees}>{item.attendees} going</Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: SharedStyles.container.backgroundColor}]}>
      <Text style={styles.sectionTitle}>Events You Liked</Text>
      <FlatList
        data={likedEvents}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <Text style={styles.sectionTitle}>Your Created Events</Text>
      <FlatList
        data={createdEvents}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <Button
       onPress={handleSignOut}
       theme="signout" 
       label="Sign out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  attendees: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen;
