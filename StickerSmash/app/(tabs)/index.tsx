import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
       <View style={styles.imageContainer}>
       <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <Text style={styles.textWhite}>Welcome to LookOut!</Text>
      <Text style={styles.textBlue}>Look out into your everyday surroundings!!</Text>
      <Text style={styles.textBlue}>Explore Your sorroundings today!</Text>
    <View style={styles.footerContainer}>
    <Button theme="primary" label="Choose a photo" />
      <Button label="Use this photo" />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  textWhite: {
    color: '#fff',
  },
  textBlue: {
    color: '#9ff'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
