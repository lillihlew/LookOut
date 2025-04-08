import React, {useState} from "react";
import {StyleSheet, TextInput, View, Text, Keyboard} from "react-native";
import SharedStyles from "@/app/styles";


const OurTextInput = ({selectedTitle, setSelectedTitle, selectedDescription, setSelectedDescription}: any) => {
    const dismissKeyboard = () => {
        Keyboard.dismiss();  // This dismisses the keyboard when called
    };

    const [noTitle, setNoTitle] = useState<boolean>(true);
    const [noDesc, setNoDesc] = useState<boolean>(true);

    return (
        <View style = {styles.container}> 
            <TextInput 
                value={selectedTitle}
                onChangeText = {(newValue: any) => {
                    setSelectedTitle(newValue);
                    setNoTitle(false);
                }}
                style = {SharedStyles.inputText}
                placeholder = {"Enter your event title"}
                placeholderTextColor = "#25292e"
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                maxLength={50}
            />
            <Text>
                
            </Text>
            <TextInput 
                value={selectedDescription}
                onChangeText = {(newValue: any) => {
                    setSelectedDescription(newValue);
                    setNoTitle(false);
                }}
                style = {SharedStyles.inputText}
                placeholder = {"Enter your event description"}
                placeholderTextColor = "#25292e"
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                maxLength={500}
            />
            <Text>

            </Text>
            </View>
    );
}

export default OurTextInput;

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
    },
})