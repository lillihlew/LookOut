import DateTimePicker from "@react-native-community/datetimepicker"
import {useState} from "react";
import {StyleSheet, Button, TextInput, View, Text} from "react-native";

const WebDateTimePicker = () => {
    const today=new Date();
    const [dateInput, setDateInput] = useState('');
    const [timeInput, setTimeInput] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    /*eventually will need this to ensure valid input: date.toLocaleDateString should say 
    "Invalid date" on invalid input and you can check it on line 56 or in saveDateTimeInfo
    but we shouldn't allow the done button to appear if input is invalid. the done button
    comes from addEvent though, so that has to be done there i think!*/
    const [validInput, setValidInput] = useState<boolean>(false); 

    const saveDateTimeInfo = () => {
        // Parsing the date and time
        const [month, day, year] = dateInput.split('-').map((num) => parseInt(num, 10));
        const [hour, minute] = timeInput.split(':').map((num) => parseInt(num, 10));

        // Creating a new Date object based on parsed values (Adjust months because Date object months are 0-based)
        const eventDate = new Date(year, month - 1, day, hour, minute);

        // Set the event date and time
        setDate(eventDate);
        setTime(eventDate);
    }


    
    return(
        <View style = {styles.container}>
            <Text>Enter your date:</Text>
            <TextInput 
                value={dateInput}
                onChangeText = {(newValue) => setDateInput(newValue)}
                style = {styles.inputText}
                placeholder = {"mm-dd-yyyy"}
                placeholderTextColor = "green"
            />
            <Text>Enter your time:</Text>
            <TextInput 
                value={timeInput}
                onChangeText = {(newValue) => setTimeInput(newValue)}
                style = {styles.inputText}
                placeholder = {"hh:mm"}
                placeholderTextColor = "green"
            />
            <Button 
                title = "Save date & time information" 
                onPress={saveDateTimeInfo} 
                color = "green"
            />
            <Text> Event date: {date.toLocaleDateString()} </Text>
            <Text> Event time: {time.toLocaleTimeString()}</Text>
            <Text>{date.toLocaleString()}</Text> 
        </View>
    )
}

export default WebDateTimePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
      },
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