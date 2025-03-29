import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Rabbits', date: 'March 26' },
    { id: 2, title: 'Gardner', date: 'March 28' },
    { id: 3, title: 'Husk study sesh', date: 'March 29' },
  ]);

  const renderCard = (event: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  card: {
    width: width*0.85,
    height: height*0.6,
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
});

export default HomeScreen;
