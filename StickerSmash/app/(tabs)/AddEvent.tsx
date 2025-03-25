import { Text, View, StyleSheet, Platform, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
// import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker";
import { type ImageSource } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import React, { useState, useRef, useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import domtoimage from "dom-to-image";
import OurTextInput from '@/components/OurTextInput';
import OurDateTimePicker from '@/components/OurDateTimePicker';

export default function Index() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [usingImage, setUsingImage] = useState<boolean>(false);
  const [usingNothing, setUsingNothing] = useState<boolean>(true);
  const [usingDate, setUsingDate] = useState<boolean>(false);
  
    
  const toggleUsingImage = () => {
      setUsingImage(!usingImage);
      toggleUsingNothing;
  }

  const toggleUsingDate = () => {
    setUsingDate(!usingDate);
    toggleUsingNothing;
}

  const toggleUsingNothing = () => {
    setUsingNothing(!usingNothing);
  }
  
  return (
    <View style={styles.container}> 
      <View>

        {/*Using no extra screens*/}
        {usingNothing && (<View style={styles.optionsContainer}>
          <Button
            label ="Add a photo"
            theme = "primary"
            onPress={() => {
              toggleUsingImage
              toggleUsingNothing}}/>
         <OurTextInput></OurTextInput>
         <Button
            label ="Add a date"
            theme = "primary"
            onPress={() => {
              toggleUsingDate
              toggleUsingNothing}}/>
        </View>)}

        {/*Using an image*/}
        {usingImage && (<View style = {styles.optionsContainer}>
          <OurTextInput></OurTextInput>
        </View>)}
        
        {/*Using a date*/}
        {usingDate && (<View style = {styles.optionsContainer}>
          <OurDateTimePicker></OurDateTimePicker>
        </View>)}

      </View>
    
      {/* <Button label="Use this photo" onPress={() => setShowAppOptions(true)} /> */}
      {/* <Button 
        onPress = {toggleUsingImage}
        theme = "primary"
        label= "Hide image" />
      <Button label = "show image" onPress={() => toggleUsingImage}/> */}
        
   
    
  </View>
  )
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  dateButton: {
    height: 50,
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff"
  }
});
