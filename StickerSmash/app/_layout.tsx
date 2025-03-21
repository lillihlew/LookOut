import { Stack } from 'expo-router';
import { LogBox } from "react-native";
import {StatusBar} from "expo-status-bar"

LogBox.ignoreAllLogs(false); //COME BACK AND SWITCH TO TRUE BEFORE RELEASING

export default function RootLayout() {
  return (
    <>
    <StatusBar style = "light" /> 
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false, 
          }} 
        />
        <Stack.Screen 
          name="+not-found"
          />
      </Stack>
    </>
  );
}
