import React, {useState} from "react";
import {StyleSheet, Button, TextInput, View, Text} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
const PublicOrPrivate = () => {
    const [privacySettingOn, setPrivacySetting] = useState<boolean>(false);
    const [privacyLabel, setPrivacyLabel] = useState<string>("Make Private");
    const [text, setText] = useState<string>("Public");

    const togglePrivacySettings = () => {
        setPrivacySetting(!privacySettingOn);
        toggleText();
        if(privacySettingOn){
            setPrivacyLabel("Make Private");
        }else{
            setPrivacyLabel("Make Public");
        }
        
    }

    const toggleText = () => {
        if(privacySettingOn){
            setText("Public");
        }else{
           setText("Private");
        }
    }

    return (
        <View style = {styles.button}>
            <Button
                title = {privacyLabel}
                onPress = {togglePrivacySettings}
                >
            </Button>
            <Text>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        width: 350,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default PublicOrPrivate;