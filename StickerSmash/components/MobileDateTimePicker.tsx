import {StyleSheet, Platform, Button, View, Text} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import {useState} from "react";


const MobileDateTimePicker = ({selectedDate, setSelectedDate, setDateButtonLabel}:any) => {
    const today=new Date();
    const [show, setShow] = useState(false);

    const onChange = (e: any, thisClassSelectedDate: any) => {
        setSelectedDate(thisClassSelectedDate);
        setShow(false);
    };

    return(
        <View style = {styles.container}>
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
            <Text>{selectedDate.toLocaleString()}</Text> 
        </View>
    )
}

export default MobileDateTimePicker;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    }})