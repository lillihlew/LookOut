import React, {useState} from "react";
import {StyleSheet, Button, TextInput, View, Text} from "react-native";
import SharedStyles from '../app/styles.js';


const OurTextInput = ({selectedTitle, setSelectedTitle, selectedDescription, setSelectedDescription}: any) => {
    const [titleText, setTitleText] = useState();
    const [descriptionText, setDescriptionText] = useState();
 
    return (
        <View> 
            <TextInput 
                value={titleText}
                onChangeText = {(newValue: any) => {
                    setTitleText(newValue); 
                    setSelectedTitle(newValue);
                }}
                style = {SharedStyles.inputText}
                placeholder = {"Enter your event title"}
            />
            <TextInput 
                value={descriptionText}
                onChangeText = {(newValue: any) => {
                    setDescriptionText(newValue);
                    setSelectedDescription(newValue);
                }}
                style = {SharedStyles.inputText}
                placeholder = {"Enter your event description"}
            />

            <Text style = {SharedStyles.infoText}> 
                Event title: {titleText} 
            </Text>

            <Text style = {SharedStyles.infoText}> 
                Event description: {descriptionText}
            </Text>

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