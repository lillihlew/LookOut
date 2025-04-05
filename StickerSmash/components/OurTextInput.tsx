import React, {useState} from "react";
import {StyleSheet, TextInput, View, Text} from "react-native";
import SharedStyles from "@/app/styles";


const OurTextInput = ({selectedTitle, setSelectedTitle, selectedDescription, setSelectedDescription}: any) => {
    return (
        <View style = {styles.container}> 
            <Text style = {SharedStyles.textWhite}> Event title:</Text>
            <TextInput 
                value={selectedTitle}
                onChangeText = {(newValue: any) => {
                    setSelectedTitle(newValue);
                }}
                style = {styles.inputText}
                placeholder = {"Enter your event title"}
                placeholderTextColor = "#fff"
            />
            <Text style = {SharedStyles.textWhite}> Event description:</Text>
            <TextInput 
                value={selectedDescription}
                onChangeText = {(newValue: any) => {
                    setSelectedDescription(newValue);
                }}
                style = {styles.inputText}
                placeholder = {"Enter your event description"}
                placeholderTextColor = "#fff"
            />
            {/* <Text> Event title: {selectedTitle} </Text>
            <Text> Event description: {selectedDescription}</Text> */}
        </View>
    );
}

export default OurTextInput;

const styles = StyleSheet.create({
    inputText:{
        borderWidth: 1,
        borderColor: "#fff",
        width: 200,
        margin: 10,
        height: 40,
        padding: 5,
        color: "#fff"
    },
    container: {
        alignItems: 'flex-start',
    },
})