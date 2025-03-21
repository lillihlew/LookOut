import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage = {selectedImage} />
      </View>

      <Text style={styles.textWhite}>Welcome to LookOut!</Text>
      <Text style={styles.textBlue}>Look out into your everyday surroundings!!</Text>
      <Text style={styles.textBlue}>Explore Your sorroundings today!</Text>
   
    <View style={styles.footerContainer}>
      <Button 
        onPress={pickImageAsync}
        theme="primary" 
        label="Choose a photo" />
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
