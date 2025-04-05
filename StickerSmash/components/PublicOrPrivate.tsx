import React, {useState} from "react";
import {StyleSheet, TextInput, View, Text} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";

    
const PublicOrPrivate = ({selectedPrivacyOn, setSelectedPrivacyOn}: any) => {
    const [privacySettingOn, setPrivacySetting] = useState<boolean>(false);
    const [privacyLabel, setPrivacyLabel] = useState<string>("Make Private");
    const [text, setText] = useState<string>("Public");

    const togglePrivacySettings = () => {
        const newPrivacySetting = !privacySettingOn;
        setPrivacySetting(newPrivacySetting);
        setSelectedPrivacyOn(newPrivacySetting);
        if(newPrivacySetting){
            setPrivacyLabel("Make Public");
            setText("Private");
        }else{
            setPrivacyLabel("Make Private");
            setText("Public");
        }
        
    }



    return (
        <View style = {styles.button}>
            <Button
                label = {privacyLabel}
                theme = {text}
                onPress={() => {
                    togglePrivacySettings();
                    }}
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