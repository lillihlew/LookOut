import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
//import { getEventsFromSQLite } from '@/utils/database'; 

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [events, setEvents] = useState<any[]>([]);

  // Fetch events when the screen loads
  // useEffect(() => {
  //   getEventsFromSQLite((fetchedEvents) => {
  //     setEvents(fetchedEvents);
  //   });
  // }, []);

  const renderCard = (event: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date}</Text>
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
    height: height * 0.6,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 100,
    fontSize: 18,
    color: '#999',
  },
});

export default HomeScreen;
