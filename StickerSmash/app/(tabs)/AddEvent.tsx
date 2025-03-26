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
import MobileDateTimePicker from '@/components/MobileDateTimePicker';
import OurImageViewer from '@/components/OurImageViewer';
import PublicOrPrivate from '@/components/PublicOrPrivate';
import WebDateTimePicker from '@/components/WebDateTimePicker';


export default function Index() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [usingImage, setUsingImage] = useState<boolean>(false);
  const [usingNothing, setUsingNothing] = useState<boolean>(true);
  const [usingDateMobile, setUsingDateMobile] = useState<boolean>(false);
  const [usingDateWeb, setUsingDateWeb] = useState<boolean>(false);
  const [photoButtonLabel, setPhotoButtonLabel] = useState<string>("Choose Photo");
  
    
  const toggleUsingImage = () => {
    setUsingImage(!usingImage);
  }

  const toggleUsingDateMobile = () => {
    setUsingDateMobile(!usingDateMobile);
  }

  const toggleUsingDateWeb = () => {
    setUsingDateWeb(!usingDateWeb);
  }

  const toggleUsingNothing = () => {
    setUsingNothing(!usingNothing);
  }

  const togglePhotoButtonLabel = () => {
    setPhotoButtonLabel("Change Photo");
  }
  
  return (
    <View style = {styles.container}>
        {/*Using no extra screens*/}
        {usingNothing ? (
          <View style={styles.container}>
            <Button
              label = {photoButtonLabel}
              theme = "primary"
              onPress={() => {
                toggleUsingImage();
                toggleUsingNothing();
                console.log("image button pressed");}}/>
          <Button
              label ="Choose date & time"
              theme = "primary"
              onPress={() => {
                if(Platform.OS === "web"){
                  toggleUsingDateWeb();
                }else{
                  toggleUsingDateMobile();
                }
                toggleUsingNothing();
              }}/>
          <PublicOrPrivate/>
          <OurTextInput/>
        </View>

        ):(
        
        <View>
          {/*Using an image*/}
          {usingImage ? (
            <View style = {styles.container}>
              <View style = {styles.imageContainer}>
                <OurImageViewer/>
              </View>
              <View style = {styles.footerContainer}> 
                <View style = {styles.footerTopButton}/>
                <View style = {styles.footerBottomButton}>
                  <Button 
                    onPress={() =>{
                      toggleUsingImage();
                      toggleUsingNothing();
                      togglePhotoButtonLabel();
                    }}
                    theme = "primary"
                    label="Done" />
                  </View>
              </View>
            </View>
            ):(
            <View>
              {/*Using a date, specifically ios/android*/}
              {usingDateMobile ? (
                <View style = {styles.container}>
                  <MobileDateTimePicker/>
                  <Button
                    onPress={() =>{
                      if(Platform.OS === "web"){
                        toggleUsingDateWeb();
                      }else{
                        toggleUsingDateMobile();
                      }
                      toggleUsingNothing();}}
                    theme = "primary"
                    label="Done" />
                </View>
              ):(
                <View style = {styles.container}>
                  {/*Using a date, specifically web (idk if windows will work with this but if we want to include we can)*/}
                  <WebDateTimePicker/>
                  <Button
                    onPress={() =>{
                      if(Platform.OS === "web"){
                        toggleUsingDateWeb();
                      }else{
                        toggleUsingDateMobile();
                      }
                      toggleUsingNothing();}}
                    theme = "primary"
                    label="Done" />
                </View>
              )}
            </View>
            )}
        </View>
        )}
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
    flex: 7,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1/2,
    alignItems: 'center',
  },
  footerTopButton: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBottomButton: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // optionsContainer: {
  //   position: 'absolute',
  //   bottom: 80,
  // },
  // optionsRow: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
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
