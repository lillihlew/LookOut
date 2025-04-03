import SharedStyles from "@/app/styles"
import ImageViewer from "./ImageViewer"
import { useState } from "react"
import { View, Text } from "react-native";


const DisplayEvent = ({selectedImage, selectedDate, selectedTitle, selectedDescription, selectedPrivacyOn}:any) =>{
    return(
        <View style = {SharedStyles.container}>
            <ImageViewer imgSource={selectedImage}/>
            <Text style = {SharedStyles.infoText}>{selectedTitle}</Text>
            <Text style = {SharedStyles.textWhite}>{selectedDescription}</Text>
            <Text style = {SharedStyles.textWhite}>{selectedDate.toLocaleString()}</Text>
            {selectedPrivacyOn ? 
                <Text style = {SharedStyles.textWhite}>Private Event</Text> 
                : 
                <Text style = {SharedStyles.textWhite}>Public Event</Text>
            }
        </View>
    )
    
}

export default DisplayEvent;