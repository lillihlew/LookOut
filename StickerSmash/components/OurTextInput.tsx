import React, {useState} from "react";
import {StyleSheet, View, Button, TextInput, Text} from "react-native";

const OurTextInput = () => {
    const[text, setText] = useState();
    const[typedText, setTypedText] = useState();
    const handlePress = () => {
        setTypedText(text);
    }
        

    return <View> 
        <TextInput 
            value = {text}
            onChangeText={(newValue)=> setText(newValue)}
            style = {styles.inputText} 
            placeholder = {"Enter your event title"}
            placeholderTextColor={"green"}
        />
        <Button title = "Please input a title" onPress = {handlePress} color = "green" />
        <Text> You typed:{text}</Text>
    </View>;
};


export default OurTextInput;

const styles = StyleSheet.create({
    inputText:{
        borderWidth: 1,
        width: 200,
        margin: 10,
        height: 40,
        padding: 5,
    },
    button:{
        width: 350,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    }
})