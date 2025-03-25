import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker";
import { type ImageSource } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/background-image.png');

const OurImageViewer = () => {
    
    const imageRef = useRef(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    // const [showAppOptions, setShowAppOptions] = useState<boolean>(false); //here
    const [usingImage, setUsingImage] = useState<boolean>(true);
    
    useEffect(() =>{
        if(permissionResponse?.granted){
            requestPermission();
        }
        }, [])

    const toggleUsingImage = () => {
        setUsingImage(!usingImage);
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          // setShowAppOptions(true); //here
        } else {
          alert('You did not select any image.');
        }
      };

    //not using this now but we're keeping it for later so we can save the image to the event
    const onSaveImageAsync = async () => {
        if(Platform.OS === "web"){
        try {
            //@ts-ignore
            const dataUrl = await domtoimage.toJpeg(imageRef.current, {
            quality: 0.95,
            width: 320,
            height: 440,
            });

            let link = document.createElement('a');
            link.download = 'sticker-smash.jpeg';
            link.href = dataUrl;
            link.click();
        } catch (e) {
            console.log(e);
        }
        } else {
        try {
            const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
            });
    
            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
            alert('Saved!');
            }
        } catch (e) {
            console.log(e);
        }
        }
    };

    return (
        <View>
            <View ref= {imageRef} style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage = {selectedImage} />
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.textWhite}>Upload your image!</Text> 
                <Button 
                    onPress={pickImageAsync}
                    theme="primary" 
                    label="Choose a photo" />
            </View>
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
    },
})