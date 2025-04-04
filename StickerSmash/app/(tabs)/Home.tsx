import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {firebaseConfig} from "../../firebaseConfig"
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const { width, height } = Dimensions.get('window');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getEvents(
  selectedTitle: string,
  selectedDescription: string,
  selectedImage: string,
  selectedDate: Date,
  selectedPrivacyOn: boolean
) {
  const eventsCollection = collection(db, "EventsCol");
  const eventsSnapshot = await getDocs(eventsCollection)
  return eventsSnapshot.docs.map(event => event.data())
}



const HomeScreen = () => {
  const [events, setEvents] = useState<any[]>([]);

  

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
    const eventList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEvents(eventList);
  });

  return () => unsubscribe(); // clean up the listener when component unmounts
}, []);

  

  const renderCard = (event: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{new Date(event.date).toLocaleString()}</Text>
      {event.image && (
        <Image source={{ uri: event.image }} style={styles.image} />
      )}
      <Text style={styles.description}>{event.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {events.length > 0 ? (
        <Swiper
          cards={events}
          renderCard={renderCard}
          onSwiped={(cardIndex) => console.log(`Swiped card at index: ${cardIndex}`)}
          onSwipedRight={(cardIndex) => console.log(`Liked event: ${events[cardIndex].title}`)}
          onSwipedLeft={(cardIndex) => console.log(`Skipped event: ${events[cardIndex].title}`)}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          disableTopSwipe
          disableBottomSwipe
        />
      ) : (
        <Text style={styles.loadingText}>No events found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    height: height * 0.7,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginVertical: 10,
  },
  loadingText: {
    marginTop: 100,
    fontSize: 18,
    color: '#999',
  },
});

export default HomeScreen;
