import React, {useState} from "react";
import {StyleSheet, Button, TextInput, View, Text} from "react-native";
//https://www.youtube.com/watch?v=8PaVhXt_DiA
const OurTextInput = () => {
    const [titleText, setTitleText] = useState();
    const [typedTitleText, setTypedTitleText] = useState();
    const [descriptionText, setDescriptionText] = useState();
    const [typedDescriptionText, setTypedDescriptionText] = useState();
    
    const saveEventInfo = () =>{
        setTypedTitleText(titleText);
        setTypedDescriptionText(descriptionText);
    }

    return (
        <View> 
            <TextInput 
                value={titleText}
                onChangeText = {(newValue) => setTitleText(newValue)}
                style = {styles.inputText}
                placeholder = {"Enter your event title"}
                placeholderTextColor = "green"
            />
            <TextInput 
                value={descriptionText}
                onChangeText = {(newValue) => setDescriptionText(newValue)}
                style = {styles.inputText}
                placeholder = {"Enter your event description"}
                placeholderTextColor = "green"
            />
            <Button 
                title = "Save event information" 
                onPress={saveEventInfo} 
                color = "green"
            />
            <Text> Event title: {typedTitleText} </Text>
            <Text> Event description: {typedDescriptionText}</Text>
        </View>
    );
}

export default OurTextInput;

// import React, {useState} from "react";
// import {StyleSheet, View, Button, TextInput, Text} from "react-native";

// const OurTextInput = () => {
//     const[text, setText] = useState();
//     const[typedText, setTypedText] = useState();
//     const handlePress = () => {
//         setTypedText(text);
//     }
        

//     return (
//     <View> 
//         <TextInput 
//             value = {text}
//             onChangeText={(newValue)=> setText(newValue)}
//             style = {styles.inputText} 
//             placeholder = {"Enter your event title"}
//             placeholderTextColor={"green"}
//         />
//         <View style = {styles.button}>
//             <Button title = "Please input a title" onPress = {handlePress} color = "green" />
//         </View>
//         <Text> You typed:{text}</Text>
//     </View>
//     );}


// export default OurTextInput;

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