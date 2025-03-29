
/*eventually will need this to ensure valid input: date.toLocaleDateString should say 
"Invalid date" on invalid input and you can check it (control f date.toLocaleString()) or in saveDateTimeInfo
but we shouldn't allow the done button to appear if input is invalid. the done button
comes from addEvent though, so that has to be done there i think!*/


import React, { useState } from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";

const WebDateTimePicker = ({ selectedDate, setSelectedDate, setDateButtonLabel }: any) => {
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [validInput, setValidInput] = useState<boolean>(false);

  const [eventDateTime, setEventDateTime] = useState<Date | null>(null);

  // Validate date and time inputs
  const validateInput = () => {
    // Simple validation to check if the date and time are in correct formats
    const datePattern = /\d{2}-\d{2}-\d{4}/; // mm-dd-yyyy format
    const timePattern = /\d{2}:\d{2}/; // hh:mm format
    const isValidDate = datePattern.test(dateInput);
    const isValidTime = timePattern.test(timeInput);

    if (!isValidDate || !isValidTime) {
      return false;
    }

    // Split the date and time inputs for further validation
    const [month, day, year] = dateInput.split("-").map((num) => parseInt(num, 10));
    const [hour, minute] = timeInput.split(":").map((num) => parseInt(num, 10));

    // Check if the parsed date is a valid Date object
    const date = new Date(year, month - 1, day); // Date object uses 0-index for months
    const isValidParsedDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    // If the date is invalid (like August 41), return false
    if (!isValidParsedDate) {
      return false;
    }

    // Check if the date is today or later
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to midnight to only compare dates, not time

    // Compare the event date with the current date (ignoring time)
    if (date < currentDate) {
      return false; // The event date is in the past
    }

    return true; // Valid date and time
  };

  const saveDateTimeInfo = () => {
    if (!validateInput()) {
      alert("Invalid date or time. Please enter a valid date (today or later) and time.");
      setValidInput(false);
      return;
    }

    // Parse the date input
    const [month, day, year] = dateInput.split("-").map((num) => parseInt(num, 10));
    const [hour, minute] = timeInput.split(":").map((num) => parseInt(num, 10));

    // Combine the date and time into one Date object
    const combinedDate = new Date(year, month - 1, day, hour, minute);

    // Set the event datetime
    setEventDateTime(combinedDate);
    setSelectedDate(combinedDate);
    setDateButtonLabel("Change Date or Time");
    setValidInput(true);
  };

  return (
    <View style={styles.container}>
      <Text>Enter your date:</Text>
      <TextInput
        value={dateInput}
        onChangeText={(newValue) => setDateInput(newValue)}
        style={styles.inputText}
        placeholder={"mm-dd-yyyy"}
        placeholderTextColor="green"
      />
      <Text>Enter your time:</Text>
      <TextInput
        value={timeInput}
        onChangeText={(newValue) => setTimeInput(newValue)}
        style={styles.inputText}
        placeholder={"hh:mm"}
        placeholderTextColor="green"
      />
      <Button title="Save date & time information" onPress={saveDateTimeInfo} color="green" />
      {eventDateTime && (
        <View>
          <Text>Event date & time: {eventDateTime.toLocaleString()}</Text>
        </View>
      )}
    </View>
  );
};

export default WebDateTimePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    borderWidth: 1,
    width: 200,
    margin: 10,
    height: 40,
    padding: 5,
  },
  button: {
    width: 350,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
