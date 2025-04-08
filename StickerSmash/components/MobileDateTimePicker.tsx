import {StyleSheet, Platform, Button, View, Text} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from "react";
import SharedStyles from "../app/styles";

const MobileDateTimePicker = ({selectedDate, setSelectedDate, setDateButtonLabel}:any) => {
    const today=new Date();
    const [show, setShow] = useState(false);

    const onChange = (e: any, thisClassSelectedDate: any) => {
        setSelectedDate(thisClassSelectedDate);
    };

    return(
        <View style = {SharedStyles.container}>
            <DateTimePicker
                value = {selectedDate}
                mode = {"date"}
                is24Hour = {true}
                onChange = {onChange}
                minimumDate={today}
            />
            <DateTimePicker
                value = {selectedDate}
                mode = {"time"}
                is24Hour = {true}
                onChange = {onChange}
            />
        </View>
    )
}

export default MobileDateTimePicker;