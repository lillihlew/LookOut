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
//import * as SQLite from 'expo-sqlite';


//const db = SQLite.openDatabase('events.db')


export default function Index() {
  //titles & descriptions
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

  //images
  const [usingImage, setUsingImage] = useState<boolean>(false);
  const [photoButtonLabel, setPhotoButtonLabel] = useState<string>("Choose Photo");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  //control booleans
  const [usingNothing, setUsingNothing] = useState<boolean>(true);
  const [usingDateMobile, setUsingDateMobile] = useState<boolean>(false);
  const [usingDateWeb, setUsingDateWeb] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(true);

  //dates
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateButtonLabel, setDateButtonLabel] = useState<string>("Choose Date & Time");
 
  //privacy
  const [selectedPrivacyOn, setSelectedPrivacyOn] = useState<boolean>(false);
    
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

  const toggleDateButtonLabel = () => {
    setDateButtonLabel("Change Date and Time");
  }

  const toggleWorking = () =>{
    setWorking(!working);

    
  }
  let db: any = null;


// if (Platform.OS !== 'web') {
//   db = SQLite.openDatabaseSync('events.db');
// }
  
  return (
    <View style = {styles.container}>
      {/*Working still, not done*/}
      {working ? ( <View style = {styles.container}>
          {/*Using no extra screens*/}
          {usingNothing ? (
            <View style={styles.container}>
              <Button
                label = {photoButtonLabel}
                theme = "primary"
                onPress={() => {
                  toggleUsingImage();
                  toggleUsingNothing();}}/>
              <Button
                label ={dateButtonLabel}
                theme = "primary"
                onPress={() => {
                  if(Platform.OS === "web"){
                    toggleUsingDateWeb();
                  }else{
                    toggleUsingDateMobile();
                  }
                  toggleUsingNothing();
                }}/>
            <PublicOrPrivate
              selectedPrivacyOn = {selectedPrivacyOn}
              setSelectedPrivacyOn ={setSelectedPrivacyOn}
              />
            <OurTextInput
              selectedTitle = {selectedTitle}
              setSelectedTitle = {setSelectedTitle}
              selectedDescription = {selectedDescription}
              setSelectedDescription = {setSelectedDescription}/>
            <Button 
                label = "Review event information" 
                theme = "primary"
                onPress={() =>{
                  console.log("selected privacy on save: ", selectedPrivacyOn);
                  toggleWorking();
                }}
            />
          </View>

          ):(
          
          <View>
            {/*Using an image*/}
            {usingImage ? (
              <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                  <OurImageViewer
                    selectedImage = {selectedImage}
                    setSelectedImage={setSelectedImage}
                    setPhotoButtonLabel={setPhotoButtonLabel}
                    />
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
                    <MobileDateTimePicker
                      selectedDate = {selectedDate}
                      setSelectedDate ={setSelectedDate}
                      setDateButtonLabel={setDateButtonLabel}/>
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
                    <WebDateTimePicker
                      selectedDate = {selectedDate}
                      setSelectedDate ={setSelectedDate}
                      setDateButtonLabel={setDateButtonLabel}/>
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
    
    </View>) : ( <View style = {styles.container}>
        {/*Done with details*/}
        {/* Display the selected details*/}
        {selectedTitle && (<Text>Title: {selectedTitle}</Text>)}
        {selectedDescription && (<Text>Description: {selectedDescription}</Text>)}
        {selectedImage && (<Image source={{ uri: selectedImage }} style={styles.selectedImage} />)}
        {selectedDate && (<Text>{selectedDate.toLocaleString()}</Text> )}
        {selectedPrivacyOn ? <Text>Private Event</Text> : <Text>Public Event</Text>}
        <Button 
                label = "Alter event information" 
                theme = "primary"
                onPress={() =>{
                  toggleWorking();
                }}
            />
        <Button
          label = "Post event"
          theme = "primary"
          onPress={() =>{
            if(selectedTitle && selectedDescription && selectedImage && selectedDate){
             //here
          
            }else{
              let missing = "Missing: \n";
              if (!selectedTitle) missing = missing + " Title \n";
              if (!selectedDescription) missing = missing + " Description \n";
              if (!selectedImage) missing = missing + " Image \n";
              if (!selectedDate) missing = missing + " Date/Time \n";
              
              alert(missing);
            }
          }}
        />
        </View>)
        }
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
  selectedImage: {
    width: 320,
    height: 440,
    borderRadius: 18,
    marginTop: 20,
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
