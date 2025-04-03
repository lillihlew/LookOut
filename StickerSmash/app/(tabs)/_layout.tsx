import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5, AntDesign, Zocial } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#25292e',
            },
        }}
    >

      <Tabs.Screen 
        name="Home" 
        options={{ 
          headerTitle: 'Discovery',
          tabBarIcon: ({focused, color}) => (
            <Zocial 
                name ={focused ? "eventasaurus" : "eventasaurus"} 
                color={color}
                size = {30} 
            />
          ),
        }} />
      <Tabs.Screen 
        name="CurrentEvents" 
        options={{ 
          headerTitle: 'Current',
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
                name={focused ? 'timer' : 'timer-outline'} 
                color={color} 
                size={24}
            />
          ),
        }} />
      <Tabs.Screen 
        name="AddEvent" 
        options={{ 
          headerTitle: 'Add New Event',
          tabBarIcon: ({focused, color}) => (
            <AntDesign 
                name={focused ? 'pluscircle' : 'pluscircleo'} 
                color={color} 
                size={24}
            />
          ),
        }} />
      <Tabs.Screen 
        name="Profile" 
        options={{ 
          headerTitle: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <FontAwesome5 
                name={focused ? 'user-alt' : 'user'} 
                color={color} 
                size={24}
            />
          ),
        }} />
      <Tabs.Screen 
        name="+not-found"
        />
    </Tabs>
  );
}
