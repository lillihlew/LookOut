import SharedStyles from "@/app/styles"
import ImageViewer from "./ImageViewer"
import { Text, ScrollView } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayEvent = ({selectedImage, selectedDate, selectedTitle, selectedDescription, selectedPrivacyOn}:any) =>{
    const [date, time] = selectedDate.toLocaleString().split(',');
    return(
        <SafeAreaProvider>
            <ScrollView>
                <SafeAreaView style = {SharedStyles.container}>
                    <ImageViewer imgSource={selectedImage}/>
                    <Text style = {SharedStyles.infoText}>{selectedTitle}</Text>
                    <Text style = {SharedStyles.textWhite}>{date}</Text>
                    <Text style = {SharedStyles.textWhite}>{time}</Text>
                    {selectedPrivacyOn ? 
                        <Text style = {SharedStyles.textWhite}>Private Event</Text> 
                        : 
                        <Text style = {SharedStyles.textWhite}>Public Event</Text>
                    }
                    <Text style = {SharedStyles.textWhite}>{selectedDescription}</Text>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaProvider>
    )
    
}

export default DisplayEvent;