import { Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTime from '@/components/DateTime';

const OurDateTimePicker = () => {

  const today=new Date();
    const [date, setDate] = useState(new Date());
    const [eventDate, setEventDate] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
      }
    
    const onChange = ({type}: any, selectedDate: any) => {
      if (type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);
        
        if(Platform.OS === "android") {
          toggleDatePicker();
          setEventDate(currentDate.toDateString());
        }
      } else {
        toggleDatePicker();
      }
    }

    const confirmIOSDate = () => {
      setEventDate(date.toDateString());
      toggleDatePicker();
    }
    
  return(
      <View>
        <Button 
          title = "Pick date" 
          onPress={toggleDatePicker} 
          color = "green"
          />
          
        
        {showPicker && (<DateTimePicker //doing showPicker && so that it'll only show when we want it to
                    mode = "date"
                    display = "spinner"
                    value = {date}
                    onChange={onChange}
                    style = {styles.datePicker}
                    minimumDate={today}
                    //maybe make a function to make max date be a year from today or something
                  />
                  )}

        {showPicker && Platform.OS === "ios" && (
          <View
            style = {{flexDirection: "row",
            justifyContent: "space-around"}}
          >
            <TouchableOpacity
              style = {[
                styles.dateButton,
                styles.pickerButton,
                {backgroundColor: "#11182711"},
              ]}
              onPress = {toggleDatePicker}
            >
              <Text
                style = {[styles.buttonText, {color: "#075985"}]}
              >Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style = {[
                styles.dateButton,
                styles.pickerButton,
            ]}
              onPress = {confirmIOSDate}
            >
              <Text
                style = {[styles.buttonText]}
              >Confirm</Text>
          </TouchableOpacity>
          </View>
        )}
                  
                  
        {/*  works for android */}
        {!showPicker && (<Pressable
          onPress = {toggleDatePicker}
          >
          <TextInput
            style={styles.textWhite}
            placeholder="Jan 1 2025"
            value = {eventDate}
            onChangeText={setEventDate}
            placeholderTextColor = "#11182744"
            editable = {false}
            onPressIn = {toggleDatePicker}
          ></TextInput>
        </Pressable>)}
      </View>
    )
}

const styles = StyleSheet.create({
    textWhite: {
        color: '#fff',
      },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    dateButton: {
        height: 50,
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#075985",
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    }
});

export default OurDateTimePicker;