import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SharedStyles from '@/app/styles';

const OurImageViewer = ({selectedImage, setSelectedImage, setPhotoButtonLabel}:any) => {
    const PlaceholderImage = require('@/assets/images/background-image.png');
    const imageRef = useRef(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    
    useEffect(() =>{
        if(permissionResponse?.granted){
            requestPermission();
        }
    }, [])

    const togglePhotoButtonLabel = () => {
        setPhotoButtonLabel("Change Photo");
    }


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          setPhotoButtonLabel("Change Photo");
        } else {
          alert('You did not select any image.');
        }
      };

    return (
        <View style = {SharedStyles.container}>
            <View ref= {imageRef} style={SharedStyles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage = {selectedImage}/>
            </View>
            <View style={SharedStyles.footerContainer}>
                <View style = {[styles.footerTopButton, {backgroundColor : SharedStyles.container.backgroundColor}]}>
                    <Text style={SharedStyles.textWhite}>Upload your image!</Text> 
                    <Button 
                        onPress={pickImageAsync}
                        theme="photo" 
                        label="Choose Photo" />
                </View>
                <View style = {[styles.footerBottomButton, {backgroundColor : SharedStyles.container.backgroundColor}]}>
                </View>
            </View>
        </View>
    )
}


export default OurImageViewer;

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
      flex: 8,
      alignItems: 'center', 
      justifyContent: 'center',
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
    footerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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

