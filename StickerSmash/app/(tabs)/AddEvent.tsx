import { View, StyleSheet, Platform } from 'react-native';
import Button from '@/components/Button';
import React, { useState } from 'react';
import OurTextInput from '@/components/OurTextInput';
import MobileDateTimePicker from '@/components/MobileDateTimePicker';
import OurImageViewer from '@/components/OurImageViewer';
import PublicOrPrivate from '@/components/PublicOrPrivate';
import WebDateTimePicker from '@/components/WebDateTimePicker';
import {db} from "../../firebaseConfig"
import {addDoc, collection } from 'firebase/firestore';
import SharedStyles from '../styles';
import { router } from 'expo-router';
import DisplayEvent from '@/components/DisplayEvent';


async function addEvent(
  selectedTitle: string,
  selectedDescription: string,
  selectedImage: string,
  selectedDate: Date,
  selectedPrivacyOn: boolean
) {
  try {
    const eventsCollection = collection(db, "EventsCol");
    //const id = "" // TODO: generate unique ID
    const docRef = await addDoc(eventsCollection, {
      //id: id,
      title: selectedTitle,
      description: selectedDescription,
      image: selectedImage,
      date: selectedDate.toISOString(),
      privacy: selectedPrivacyOn ? 'private' : 'public',
      likeCount: 0,
      createdAt: new Date().toISOString(),
    });
    return docRef;
  } catch (e : any){
    console.error(e)
  }
}



export default function Index() {
  //titles & descriptions
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [titleColor, setTitleColor] = useState<boolean>(false);
  const [descColor, setDescColor] = useState<boolean>(false);

  //images
  const [usingImage, setUsingImage] = useState<boolean>(false);
  const [photoButtonLabel, setPhotoButtonLabel] = useState<string>("Choose Photo");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [imageColor, setImageColor] = useState<boolean>(false);

  //control booleans
  const [usingNothing, setUsingNothing] = useState<boolean>(true);
  const [usingDateMobile, setUsingDateMobile] = useState<boolean>(false);
  const [usingDateWeb, setUsingDateWeb] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(true);

  //dates
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateButtonLabel, setDateButtonLabel] = useState<string>("  Choose Date & Time");
  const [dateColor, setDateColor] = useState<boolean>(false);

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
    setPhotoButtonLabel(" Change Photo");
    setImageColor(true);
  }

  const toggleDateButtonLabel = () => {
    setDateButtonLabel("Change Date and Time");
    setDateColor(true);
  }

  const toggleWorking = () =>{
    setWorking(!working);
  }

  const placeholderImage = require('@/assets/images/background-image.png');
  let db: any = null;

  const wipe = () =>{
    //titles & descriptions
    setSelectedDescription('');
    setSelectedTitle('');
    setTitleColor(false);
    setDescColor(false);
    //images
    setSelectedImage(placeholderImage);
    setPhotoButtonLabel("Choose Photo");
    setImageColor(false);
    //control booleans
    setUsingNothing(true);
    setWorking(true);
    //dates
    setSelectedDate(new Date());
    setDateColor(false);
    //privacy
    setSelectedPrivacyOn(false);
  }

  
  return (
    <View style = {SharedStyles.container}>
      {/*Working still, not done*/}
      {working ? ( <View style = {SharedStyles.container}>
          {/*Using no extra screens*/}
          {usingNothing ? (
            <View style={SharedStyles.container}>
              <Button
                label = {photoButtonLabel}
                theme = "photo"
                onPress={() => {
                  toggleUsingImage();
                  toggleUsingNothing();}}/>
              <Button
                label ={dateButtonLabel}
                theme = "date"
                onPress={() => {
                  if(Platform.OS === "web"){
                    toggleUsingDateWeb();
                  }else{
                    toggleUsingDateMobile();
                  }
                  toggleUsingNothing();
                }}
                />
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
                theme = "info"
                onPress={() =>{
                  toggleWorking();
                }}
            />
            <Button 
                label = "Reset event information" 
                theme = "reset"
                onPress={() =>{
                  wipe();
                }}
            />
          </View>

          ):(
          
          <View>
            {/*Using an image*/}
            {usingImage ? (
              <View style = {SharedStyles.container}>
                <View style = {SharedStyles.imageContainer}>
                  <OurImageViewer
                    selectedImage = {selectedImage}
                    setSelectedImage={setSelectedImage}
                    setPhotoButtonLabel={setPhotoButtonLabel}
                    photoButtonLabel={photoButtonLabel}
                    />
                </View>
                <View style = {SharedStyles.footerContainer}> 
                  <View style = {SharedStyles.footerTopButton}/>
                  <View style = {SharedStyles.footerBottomButton}>
                    <Button 
                      onPress={() =>{
                        toggleUsingImage();
                        toggleUsingNothing();
                        togglePhotoButtonLabel();
                      }}
                      theme = "done"
                      label="Done" />
                    </View>
                </View>
              </View>
              ):(
              <View>
                {/*Using a date, specifically ios/android*/}
                {usingDateMobile ? (
                  <View style = {SharedStyles.container}>
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
                      theme = "done"
                      label="Done" />
                  </View>
                ):(
                  <View style = {SharedStyles.container}>
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
                      theme = "done"
                      label="Done" />
                  </View>
                )}
              </View>
              )}
          </View>
          )}
    
    </View>) : ( <View style = {SharedStyles.container}>
        {/*Done with details*/}
        {/* Display the selected details*/}

        <DisplayEvent 
        selectedImage = {selectedImage ? selectedImage : "No image"} 
        selectedDate = {selectedDate ? selectedDate : new Date().toLocaleString()} 
        selectedTitle = {selectedTitle ? selectedTitle : "No title"} 
        selectedDescription = {selectedDescription ? selectedDescription : "No description"} 
        selectedPrivacyOn = {selectedPrivacyOn}></DisplayEvent>
        
        <Button 
                label = "Alter event information" 
                theme = "back"
                onPress={() =>{
                  toggleWorking();
                }}
            />
      <Button
  label="Post event"
  theme="add"
  onPress={async () => {
    console.log("Trying to post event!");
    if (selectedTitle && selectedDescription && selectedImage && selectedDate) {
      console.log("Posting event...");
      try {
        const docRef = await addEvent(
          selectedTitle,
          selectedDescription,
          selectedImage,
          selectedDate,
          selectedPrivacyOn
        );

        if (docRef && docRef.id) {
          console.log("Event posted with ID:", docRef.id);
          alert('Event posted!');

          const goToHome = async () => {
            router.push('/(tabs)/Home');
          };
          goToHome();
        } else {
          console.warn("Event posted, but ID is undefined!");
          alert('Event posted successfully, but there was an issue retrieving the ID.');
        }
      } catch (error) {
        console.error('Error posting event:', error);
        alert('Failed to post event');
      }
    } else {
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

