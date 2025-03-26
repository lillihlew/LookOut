import {StyleSheet, Platform, Button, View, Text} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import {useState} from "react";

const MobileDateTimePicker = () => {
    const today=new Date();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (e: any, selectedDate: any) => {
        setDate(selectedDate);
        setShow(false);
    };

    return(
        <View style = {styles.container}>
            <DateTimePicker
                value = {date}
                mode = {"date"}
                is24Hour = {true}
                onChange = {onChange}
                minimumDate={today}
            />
            <DateTimePicker
                value = {date}
                mode = {"time"}
                is24Hour = {true}
                onChange = {onChange}
            />
            <Text>{date.toLocaleString()}</Text> 
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